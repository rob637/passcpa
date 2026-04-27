import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { format } from 'date-fns';
import logger from '../../../utils/logger';
import { useAuth } from '../../../hooks/useAuth';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Navigate, Link } from 'react-router-dom';

const DailyCPADashboard = lazy(() => import('./DailyCPADashboard'));
import { collection, query, orderBy, limit, getDocs, doc, writeBatch, updateDoc, where, getCountFromServer, getDoc, Timestamp, serverTimestamp, addDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { ADMIN_EMAILS, isAdminEmail } from '../../../config/adminConfig';
import { FEATURES } from '../../../config/featureFlags';
import { CourseId } from '../../../types/course';
import { COURSES, getActiveCourses } from '../../../courses';
import { EXAM_PRICING, isFounderPricingActive, founderDaysRemaining, FOUNDER_DEADLINE, FOUNDER_SEATS_PER_EXAM } from '../../../services/subscription';
import { functions } from '../../../config/firebase';
import { httpsCallable } from 'firebase/functions';

// Dynamic imports for course-specific question data
// Returns { questions: array, stats: { total, bySection, byDifficulty, topics } }
const loadCourseQuestionData = async (courseId: CourseId): Promise<{
  questions: unknown[];
  stats?: { total: number; bySection?: Record<string, number>; byDifficulty?: { easy: number; medium: number; hard: number }; topics?: number };
} | null> => {
  try {
    switch (courseId) {
      case 'cpa': {
        const m = await import('../../../data/cpa/questions');
        const stats = m.getQuestionStats?.();
        return { questions: m.ALL_QUESTIONS || [], stats };
      }
      case 'ea': {
        const m = await import('../../../data/ea/questions');
        const questions = m.EA_ALL_QUESTIONS || [];
        const bySection: Record<string, number> = {
          'SEE1': m.SEE1_ALL?.length || 0,
          'SEE2': m.SEE2_ALL?.length || 0,
          'SEE3': m.SEE3_ALL?.length || 0,
        };
        return { questions, stats: { total: questions.length, bySection } };
      }
      case 'cma': {
        const m = await import('../../../data/cma/questions');
        const stats = m.getQuestionStats?.();
        // Flatten to bySection for display (Part 1 and Part 2)
        const bySection: Record<string, number> = {
          'Part 1': stats?.part1?.total || 0,
          'Part 2': stats?.part2?.total || 0,
        };
        return { questions: m.CMA_ALL_QUESTIONS || [], stats: { total: stats?.total || 0, bySection, byDifficulty: stats?.byDifficulty } };
      }
      case 'cia': {
        const m = await import('../../../data/cia/questions');
        const cia1 = m.ALL_CIA1_QUESTIONS || [];
        const cia2 = m.ALL_CIA2_QUESTIONS || [];
        const cia3 = m.ALL_CIA3_QUESTIONS || [];
        const questions = [...cia1, ...cia2, ...cia3];
        const bySection: Record<string, number> = {
          'Part 1': cia1.length,
          'Part 2': cia2.length,
          'Part 3': cia3.length,
        };
        return { questions, stats: { total: questions.length, bySection } };
      }
      case 'cisa': {
        const m = await import('../../../data/cisa/questions');
        const questions = m.CISA_QUESTIONS || [];
        // Count by section field in questions
        const bySection: Record<string, number> = {};
        questions.forEach((q: { section?: string }) => {
          const section = q.section || 'Unknown';
          bySection[section] = (bySection[section] || 0) + 1;
        });
        return { questions, stats: { total: questions.length, bySection } };
      }
      case 'cfp': {
        const m = await import('../../../data/cfp/questions');
        const stats = m.CFP_QUESTION_STATS;
        // Convert byDomain to bySection for consistent display
        const bySection: Record<string, number> = {};
        if (stats?.byDomain) {
          Object.entries(stats.byDomain).forEach(([domain, count]) => {
            // Convert CFP-PRO to PRO, etc. for cleaner display
            const shortName = domain.replace('CFP-', '');
            bySection[shortName] = count as number;
          });
        }
        return { questions: m.CFP_QUESTIONS_ALL || [], stats: { total: stats?.total || 0, bySection, byDifficulty: stats?.byDifficulty } };
      }
      default: return null;
    }
  } catch {
    return null;
  }
};

// Dynamic imports for course-specific unique content
// Returns counts for essays, CBQs, case studies, item sets, simulations, etc.
const loadCourseUniqueContent = async (courseId: CourseId): Promise<{
  essays?: number;
  essaysBySection?: Record<string, number>;
  cbqs?: number;
  cbqsBySection?: Record<string, number>;
  simulations?: number;
  simulationsBySection?: Record<string, number>;
  caseStudies?: number;
  itemSets?: number;
} | null> => {
  try {
    switch (courseId) {
      case 'cma': {
        const essaysModule = await import('../../../data/cma/essays/index');
        const cbqModule = await import('../../../data/cma/cbq/index');
        const simModule = await import('../../../data/cma/practice-simulations/index');
        const essays = essaysModule.CMA_ESSAYS || [];
        const cbqs = cbqModule.ALL_CMA_CBQS || [];
        const cma1Sims = simModule.CMA1_PRACTICE_SIMULATIONS || [];
        const cma2Sims = simModule.CMA2_PRACTICE_SIMULATIONS || [];
        return {
          essays: essays.length,
          essaysBySection: {
            'Part 1': essaysModule.CMA1_ALL_ESSAYS?.length || 0,
            'Part 2': essaysModule.CMA2_ALL_ESSAYS?.length || 0,
          },
          cbqs: cbqs.length,
          cbqsBySection: {
            'Part 1': cbqs.filter((c: { section: string }) => c.section === 'CMA1').length,
            'Part 2': cbqs.filter((c: { section: string }) => c.section === 'CMA2').length,
          },
          simulations: cma1Sims.length + cma2Sims.length,
          simulationsBySection: {
            'Part 1': cma1Sims.length,
            'Part 2': cma2Sims.length,
          },
        };
      }
      case 'cfp': {
        const caseModule = await import('../../../data/cfp/case-studies/index');
        const itemSetModule = await import('../../../data/cfp/item-sets/index');
        return {
          caseStudies: caseModule.CFP_CASE_STUDIES?.length || 0,
          itemSets: itemSetModule.CFP_ITEM_SETS?.length || 0,
        };
      }
      default:
        return null;
    }
  } catch {
    return null;
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
      case 'ea': {
        const m = await import('../../../data/ea/index');
        return m.getEALessonCount?.()?.total || m.allEALessons?.length || 0;
      }
      case 'cma': {
        const m = await import('../../../data/cma/lessons');
        return m.getCMALessonCount?.()?.total || m.cmaLessons?.length || 0;
      }
      case 'cia': {
        const m = await import('../../../data/cia/lessons');
        return m.getCIALessonCount?.()?.total || m.ALL_CIA_LESSONS?.length || 0;
      }
      case 'cisa': {
        const m = await import('../../../data/cisa/lessons');
        return m.allCisaLessons?.length || 0;
      }
      case 'cfp': {
        const m = await import('../../../data/cfp/lessons');
        return m.ALL_CFP_LESSONS?.length || 0;
      }
      default: return 0;
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

type TabType = 'overview' | 'users' | 'revenue' | 'analytics' | 'content' | 'growth' | 'sms' | 'operations' | 'settings';
type LogType = 'info' | 'success' | 'error' | 'warning';

interface UserDocument {
  id: string; // Document ID (uid)
  email?: string;
  displayName?: string;
  isAdmin?: boolean;
  createdAt?: { seconds: number; nanoseconds: number };
  deletedAt?: { seconds: number; nanoseconds: number }; // Soft-deleted users
  examSection?: string;
  examDate?: string | { seconds: number } | null; // Legacy single exam date
  examDates?: Record<string, string | { seconds: number } | null>; // Per-section exam dates
  activeCourse?: string; // Which course they are studying (cpa, ea, cma, cia, cisa, cfp)
  courseId?: string; // Legacy alias for activeCourse
  lastLogin?: { seconds: number; nanoseconds: number } | string; // Firestore Timestamp
  onboardingComplete?: boolean;
  onboardingCompleted?: Record<string, boolean>; // Per-course onboarding status
  subscription?: {
    tier?: string;
    status?: string;
    currentPeriodEnd?: { seconds: number };
    trialEnd?: { seconds: number };
    isFounderPricing?: boolean; // Locked in founder rate (2-year lock)
  };
  // Per-exam trials map (loaded from subscriptions collection)
  _trials?: Record<string, { startDate?: { seconds: number }; endDate?: { seconds: number } }>;
  // Per-exam paid subscriptions (loaded from subscriptions collection)
  _paidExams?: Record<string, { tier?: string; status?: string; currentPeriodEnd?: { seconds: number } }>;
  // Signup source tracking (UTM, timezone, etc.)
  signupSource?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    gclid?: string;
    referrer?: string;
    timezone?: string;
    language?: string;
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
    courseId?: string; // Parsed from doc ID prefix (e.g., 'ea_2026-02-15' → 'ea')
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
  diagnosticResults: Array<{
    id: string;
    courseId: string;
    section: string;
    percentage: number;
    passed: boolean;
    completedAt: { seconds: number };
    areaPerformance?: Array<{ areaId: string; percentage: number }>;
  }>;
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
  // User activation funnel
  funnel: {
    signedUp: number;           // Total users
    returnedAfterSignup: number; // Logged in after initial signup (lastLogin > createdAt)
    choseSection: number;       // Set examSection
    hasExamDate: number;        // Set an exam date
    completedDiagnostic: number; // Has diagnosticResults
    answeredQuestion: number;   // Has questionHistory
    activeLast7Days: number;    // Logged in within last 7 days
    recentSignups: Array<{      // Last 20 signups with status
      email: string;
      uid: string;
      signedUpAt: Date | null;
      courseId: string;
      hasSection: boolean;
      hasExamDate: boolean;
      hasDiagnostic: boolean;
      questionsAnswered: number;
      daysSinceSignup: number;
      lastActiveAt: Date | null; // Last login timestamp
      timezone?: string;        // Timezone hint for country
      utmSource?: string;       // Traffic source
      // Feature engagement breakdown (from daily_log)
      mcqsAnswered: number;
      lessonsCompleted: number;
      flashcardsUsed: number;
      simulationsCompleted: number;
      studyMinutes: number;
    }>;
  };
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

interface EmailHistoryItem {
  id: string;
  subject: string;
  body: string;
  recipientCount: number;
  sentCount: number;
  failedCount: number;
  sentBy: string;
  sentAt: { seconds: number; nanoseconds: number } | null;
  recipients?: Array<{ email: string; name: string; uid?: string | null }>;
}

interface CommunicationTemplate {
  id: string;
  name: string;
  type: 'email' | 'push';
  category: 'user-facing' | 'engagement' | 'admin';
  subject?: string;
  body?: string;
  description: string;
  variables: string[];
  functionName?: string;
  enabled: boolean;
  isCustomized?: boolean;
  isCustom?: boolean;
  lastUpdated?: { seconds: number; nanoseconds: number };
  updatedAt?: { seconds: number; nanoseconds: number };
}

// ============================================================================
// Constants
// ============================================================================

// Admin emails imported from shared config
// See src/config/adminConfig.ts to add new admin emails

// Helper: derive courseId from examSection name
// This avoids relying on stale courseId field in user docs
const getCourseFromSection = (section?: string | null): CourseId => {
  if (!section) return 'cpa';
  const upper = section.toUpperCase();
  // CPA sections
  if (['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP', 'BEC'].includes(upper)) return 'cpa';
  // EA sections
  if (upper.startsWith('SEE')) return 'ea';
  // CMA sections
  if (upper.startsWith('CMA')) return 'cma';
  // CIA sections
  if (upper.startsWith('CIA')) return 'cia';
  // CISA sections
  if (upper.startsWith('CISA')) return 'cisa';
  // CFP sections
  if (upper.startsWith('CFP') || ['GEN', 'TAX', 'INS', 'INV', 'RET', 'EST'].includes(upper)) return 'cfp';
  // Fallback: check COURSES registry
  for (const [id, course] of Object.entries(COURSES)) {
    if (course.sections?.some(s => s.id === upper || s.shortName === upper)) {
      return id as CourseId;
    }
  }
  return 'cpa';
};

/**
 * Resolve a user's active course from all available signals:
 * 1. activeCourse field (canonical, set on newer accounts)
 * 2. courseId field (legacy alias)
 * 3. Derived from examSection (e.g., SEE3 → 'ea', CISA1 → 'cisa')
 * 4. Default to 'cpa'
 */
const getUserCourse = (u: { activeCourse?: string; courseId?: string; examSection?: string }): CourseId => {
  if (u.activeCourse) return u.activeCourse as CourseId;
  if (u.courseId) return u.courseId as CourseId;
  if (u.examSection) return getCourseFromSection(u.examSection);
  return 'cpa';
};

// ============================================================================
// Stripe Status Section
// ============================================================================

const StripeStatusSection: React.FC = () => {
  const [stripeStatus, setStripeStatus] = useState<'idle' | 'checking' | 'ok' | 'error'>('idle');
  const [stripeError, setStripeError] = useState<string>('');
  const [stripeLatency, setStripeLatency] = useState<number | null>(null);
  const [subStats, setSubStats] = useState<{
    total: number;
    active: number;
    trialing: number;
    expired: number;
    paid: number;
  } | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const founderActive = isFounderPricingActive();
  const daysLeft = founderDaysRemaining();

  // Load subscription stats from Firestore
  const loadSubStats = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'subscriptions'));
      let total = 0, active = 0, trialing = 0, expired = 0, paid = 0;
      snapshot.forEach((doc) => {
        total++;
        const data = doc.data();
        if (data.status === 'active') active++;
        if (data.status === 'trialing') trialing++;
        if (data.status === 'expired') expired++;
        if (data.stripeSubscriptionId || (data.paidExams && Object.keys(data.paidExams).length > 0)) paid++;
      });
      setSubStats({ total, active, trialing, expired, paid });
    } catch (err) {
      logger.error('Failed to load subscription stats:', err);
    }
  }, []);

  // Check Stripe Cloud Function connectivity
  const checkStripe = useCallback(async () => {
    setStripeStatus('checking');
    setStripeError('');
    const start = performance.now();

    try {
      // Call createCheckoutSession with intentionally invalid data
      // to verify the function is reachable and Stripe is configured.
      // It should return a specific error (not a generic connectivity error).
      const createCheckout = httpsCallable(functions, 'createCheckoutSession');
      await createCheckout({ courseId: '__health_check__', interval: 'annual', origin: window.location.origin });
      // If it somehow succeeds, Stripe is working
      setStripeStatus('ok');
    } catch (err: unknown) {
      const elapsed = Math.round(performance.now() - start);
      setStripeLatency(elapsed);

      const error = err as { code?: string; message?: string; details?: string };
      // Expected errors mean the function IS reachable:
      // - 'invalid-argument': Function received our bad data and rejected it → Stripe is connected
      // - 'failed-precondition': Stripe not configured (STRIPE_SECRET_KEY missing)
      // - 'unauthenticated': Auth required but missing (function reachable)
      // - 'internal': Function crashed or Stripe API error
      // Note: Firebase v2 error codes may be prefixed with 'functions/' (e.g. 'functions/invalid-argument')
      const code = error.code?.replace('functions/', '') || '';
      if (code === 'invalid-argument') {
        setStripeStatus('ok');
      } else if (code === 'failed-precondition') {
        setStripeStatus('error');
        setStripeError('Stripe secret key not configured on server');
      } else if (code === 'unauthenticated') {
        // Function is reachable but requires auth — that's fine, it's working
        setStripeStatus('ok');
      } else {
        setStripeStatus('error');
        setStripeError(error.message || 'Could not reach Stripe Cloud Function');
      }
    }
    setLastChecked(new Date());
  }, []);

  // Auto-check on mount
  useEffect(() => {
    checkStripe();
    loadSubStats();
  }, [checkStripe, loadSubStats]);

  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'passcpa-dev';
  const webhookUrl = `https://us-central1-${projectId}.cloudfunctions.net/stripeWebhook`;

  return (
    <div className="p-4 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-purple-900 dark:text-purple-100">💳 Stripe Payment Status</h4>
        <button
          onClick={() => { checkStripe(); loadSubStats(); }}
          disabled={stripeStatus === 'checking'}
          className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 underline hover:no-underline disabled:opacity-50"
        >
          {stripeStatus === 'checking' ? 'Checking...' : 'Refresh'}
        </button>
      </div>

      <div className="space-y-2">
        {/* Cloud Function status */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-purple-700 dark:text-purple-300">Checkout Function:</span>
          {stripeStatus === 'idle' || stripeStatus === 'checking' ? (
            <span className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">Checking...</span>
          ) : stripeStatus === 'ok' ? (
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              ✓ Reachable {stripeLatency !== null && `(${stripeLatency}ms)`}
            </span>
          ) : (
            <span className="text-sm font-medium text-red-600 dark:text-red-400">✗ {stripeError}</span>
          )}
        </div>

        {/* Webhook URL */}
        <div className="flex items-start gap-2">
          <span className="text-sm text-purple-700 dark:text-purple-300 whitespace-nowrap">Webhook URL:</span>
          <span className="text-xs text-purple-600 dark:text-purple-400 font-mono break-all">{webhookUrl}</span>
        </div>

        {/* Founder pricing status */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-purple-700 dark:text-purple-300">Founder Pricing:</span>
          {founderActive ? (
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              ✓ Active — {daysLeft} days remaining (ends {FOUNDER_DEADLINE.toLocaleDateString()})
            </span>
          ) : (
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Expired</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-purple-700 dark:text-purple-300">Founder Seats/Exam:</span>
          <span className="text-sm text-purple-600 dark:text-purple-400">{FOUNDER_SEATS_PER_EXAM}</span>
        </div>

        {/* Subscription stats */}
        {subStats && (
          <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-700">
            <p className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">Subscription Overview</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{subStats.total}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{subStats.paid}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Paid</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{subStats.trialing}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Trialing</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-amber-600 dark:text-amber-400">{subStats.active}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Active</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-gray-500 dark:text-gray-400">{subStats.expired}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Expired</div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing table */}
        <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-700">
          <p className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">Active Pricing ({founderActive ? 'Founder' : 'Regular'})</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-purple-600 dark:text-purple-400">
                  <th className="text-left py-1 pr-3">Exam</th>
                  <th className="text-right py-1 pr-3">Monthly</th>
                  <th className="text-right py-1">Annual</th>
                </tr>
              </thead>
              <tbody>
                {(Object.entries(EXAM_PRICING) as [string, typeof EXAM_PRICING.cpa][]).map(([exam, pricing]) => (
                  <tr key={exam} className="text-purple-700 dark:text-purple-300 border-t border-purple-100 dark:border-purple-800">
                    <td className="py-1 pr-3 font-medium uppercase">{exam}</td>
                    <td className="text-right py-1 pr-3">
                      ${founderActive ? pricing.founderMonthly : pricing.monthly}/mo
                    </td>
                    <td className="text-right py-1">
                      ${founderActive ? pricing.founderAnnual : pricing.annual}/yr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {lastChecked && (
          <p className="text-xs text-purple-500 dark:text-purple-400 mt-2">
            Last checked: {lastChecked.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Component
// ============================================================================

const AdminCMS: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // Course selection state (TODO: add course filter dropdown later)
  // const [selectedCourse, setSelectedCourse] = useState<CourseId | 'all'>('all');
  const [allCourseStats, setAllCourseStats] = useState<CourseContentStats[]>([]);
  const [isLoadingCourseStats, setIsLoadingCourseStats] = useState(false);
  
  // Course-specific TBS stats (only CPA has TBS currently)
  const [tbsStats, setTbsStats] = useState<{ total: number; bySection: Record<string, number>; byType?: Record<string, number> } | null>(null);

  // Course-specific unique content stats
  const [cmaUniqueContent, setCmaUniqueContent] = useState<{
    essays: number;
    essaysBySection: Record<string, number>;
    cbqs: number;
    cbqsBySection: Record<string, number>;
    simulations: number;
    simulationsBySection: Record<string, number>;
  } | null>(null);
  const [cfpUniqueContent, setCfpUniqueContent] = useState<{
    caseStudies: number;
    itemSets: number;
  } | null>(null);

  // New State for Users and Errors
  const [usersList, setUsersList] = useState<UserDocument[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserDocument[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [userFilter, setUserFilter] = useState<'all' | 'admin' | 'premium' | 'free' | 'trial'>('all');
  const [editingTrialUserId, setEditingTrialUserId] = useState<string | null>(null);
  const [userCourseFilter, setUserCourseFilter] = useState<CourseId | 'all'>('all');
  const [userSortColumn, setUserSortColumn] = useState<'email' | 'course' | 'section' | 'subscription' | 'trials' | 'role' | 'joined'>('joined');
  const [userSortDirection, setUserSortDirection] = useState<'asc' | 'desc'>('desc');
  const [usersPage, setUsersPage] = useState(1);
  const usersPerPage = 50;
  
  // Delete user state
  const [deleteConfirmUserId, setDeleteConfirmUserId] = useState<string | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Email to users state
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSyncingEmails, setIsSyncingEmails] = useState(false);
  const [emailSyncResult, setEmailSyncResult] = useState<{ updated: number; total: number } | null>(null);
  
  // Orphaned users state
  const [orphanedUsersResult, setOrphanedUsersResult] = useState<{
    total: number;
    orphaned: number;
    fixed: number;
    firestoreTotal?: number;
    softDeleted?: number;
    activeUsers?: number;
    users: Array<{ uid: string; email: string; displayName: string; hasGhostDoc: boolean }>;
  } | null>(null);
  const [isScanningOrphaned, setIsScanningOrphaned] = useState(false);
  const [isFixingOrphaned, setIsFixingOrphaned] = useState(false);
  
  // Email history state
  const [emailHistory, setEmailHistory] = useState<EmailHistoryItem[]>([]);
  const [isLoadingEmailHistory, setIsLoadingEmailHistory] = useState(false);
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null);
  
  const [systemErrors, setSystemErrors] = useState<SystemError[]>([]);
  const [errorStats, setErrorStats] = useState<{
    total: number;
    last24h: number;
    last7d: number;
    byCategory: Record<string, number>;
    bySeverity: Record<string, number>;
    topErrors: Array<{ message: string; count: number; lastSeen: Date }>;
  } | null>(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingErrors, setIsLoadingErrors] = useState(false);
  
  // Reset exam selector state
  const [resetExamSelection, setResetExamSelection] = useState<string>('cpa');
  
  // Question Reports state
  const [questionReports, setQuestionReports] = useState<QuestionReport[]>([]);
  const [_isLoadingReports, setIsLoadingReports] = useState(false);
  const [_expandedReportId, setExpandedReportId] = useState<string | null>(null);
  const [reportResponses, setReportResponses] = useState<Record<string, string>>({});
  const [_generatingResponse, setGeneratingResponse] = useState<string | null>(null);
  const [_sendingResponse, setSendingResponse] = useState<string | null>(null);

  // User Engagement state
  const [engagementStats, setEngagementStats] = useState<{
    mostActive: Array<{ email: string; questionsAnswered: number; lastActive: string }>;
    inactive: Array<{ email: string; daysSinceActive: number; joinedAt: string }>;
    averageQuestionsPerUser: number;
    usersWithActivity: number;
  } | null>(null);
  const [_isLoadingEngagement, setIsLoadingEngagement] = useState(false);

  // Question Quality state
  const [qualityMetrics, setQualityMetrics] = useState<{
    mostReported: Array<{ questionId: string; reportCount: number; types: string[] }>;
    reportsByType: Record<string, number>;
    pendingCount: number;
  } | null>(null);

  // Content Quality Audit state
  const [contentAudit, setContentAudit] = useState<{
    questionsWithoutExplanation: Array<{ id: string; section: string; topic?: string }>;
    questionsWithoutBlueprint: Array<{ id: string; section: string }>;
    duplicateIds: Array<{ id: string; course: string; count: number }>;
    shortExplanations: Array<{ id: string; section: string; length: number }>;
    wrongOptionCount: Array<{ id: string; section: string; count: number }>;
    missingDifficulty: Array<{ id: string; section: string }>;
    missingSection: Array<{ id: string; course: string }>;
    difficultyDistribution: Record<string, { easy: number; medium: number; hard: number; other: number }>;
    totalScanned: number;
  } | null>(null);
  const [isLoadingAudit, setIsLoadingAudit] = useState(false);

  // Growth metrics state
  const [growthMetrics, setGrowthMetrics] = useState<{
    totalUsers: number;
    thisMonthSignups: number;
    lastMonthSignups: number;
    totalReferrals: number;
    pendingReferralRewards: number;
    totalLeads: number;
    leadsThisWeek: number;
    totalTestimonials: number;
    pendingTestimonials: number;
    conversionRate: number;
  } | null>(null);
  const [isLoadingGrowth, setIsLoadingGrowth] = useState(false);


  // Revenue Dashboard state
  const [revenueMetrics, setRevenueMetrics] = useState<{
    monthlyMRR: number;
    annualMRR: number;
    totalMRR: number;
    arrProjection: number; // Annual run rate
    arpu: number; // Average Revenue Per User
    subscriberCount: number;
    byPlan: { monthly: number; annual: number };
    byCourse: Record<string, { count: number; revenue: number }>;
    founderCount: number;
    churnRisk: number; // trials ending soon
  } | null>(null);

  // Announcement History state
  const [announcementHistory, setAnnouncementHistory] = useState<Array<{
    id: string;
    title: string;
    body: string;
    audience: string;
    createdAt: { seconds: number };
    createdBy: string;
    active: boolean;
  }>>([]);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementBody, setAnnouncementBody] = useState('');
  const [announcementAudience, setAnnouncementAudience] = useState('all');
  const [isSendingAnnouncement, setIsSendingAnnouncement] = useState(false);

  // Analytics state
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  const [_analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [usersError, setUsersError] = useState<string | null>(null);

  // Feature flags state (local copy for UI)
  const [_featureFlags] = useState<FeatureFlagState>({
    aiTutor: FEATURES.aiTutor,
    examSimulator: FEATURES.examSimulator,
    flashcards: FEATURES.flashcards,
    tbs: FEATURES.tbs,
    writtenCommunication: FEATURES.writtenCommunication,
    offlineMode: FEATURES.offlineMode,
    fastTrackOnboarding: FEATURES.fastTrackOnboarding,
    gamification: FEATURES.gamification,
    blueprint2026Preview: FEATURES.blueprint2026Preview,
  });
  const [_maintenanceMode, _setMaintenanceMode] = useState(false);

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
  const [_isLoadingStale, setIsLoadingStale] = useState(false);
  const [_isDeletingStale, setIsDeletingStale] = useState(false);
  const [_staleStatus, setStaleStatus] = useState<{ message: string; type: 'info' | 'success' | 'error' | 'warning' } | null>(null);

  // LinkedIn status state (for Operations tab)
  const [linkedInStatus, setLinkedInStatus] = useState<{
    status: 'loading' | 'active' | 'expired' | 'not-configured';
    expiresAt?: Date;
    orgId?: string;
  }>({ status: 'loading' });

  // Function status state (for Operations tab - dynamic badges)
  const [functionStatuses, setFunctionStatuses] = useState<Record<string, {
    status: 'success' | 'error' | 'skipped' | 'unknown';
    lastRun?: Date;
    details?: Record<string, unknown>;
  }>>({});

  // Discord status state
  const [discordStatus, setDiscordStatus] = useState<{
    status: 'loading' | 'active' | 'not-configured';
  }>({ status: 'loading' });

  // Communication templates state
  const [communicationTemplates, setCommunicationTemplates] = useState<CommunicationTemplate[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<CommunicationTemplate | null>(null);
  const [previewingTemplate, setPreviewingTemplate] = useState<CommunicationTemplate | null>(null);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [isSeedingTemplates, setIsSeedingTemplates] = useState(false);

  // Beta user transition state
  const [_betaTransitionStatus, setBetaTransitionStatus] = useState<'idle' | 'preview' | 'executing' | 'done'>('idle');
  const [betaTransitionResults, setBetaTransitionResults] = useState<{
    toUpdate: { id: string; email?: string; currentTrialEnd?: string }[];
    skipped: { id: string; email?: string; reason: string }[];
    updated: number;
    errors: number;
  } | null>(null);

  // Check admin access
  const isAdmin = user && (userProfile?.isAdmin || isAdminEmail(user?.email));

  // Helper to log messages (used in reset functionality)
  const addLog = (msg: string, type: LogType = 'info'): void => {
    const prefix = type === 'success' ? '✓' : type === 'error' ? '✗' : type === 'warning' ? '⚠' : 'ℹ';
    logger.info(`[AdminCMS] ${prefix} ${msg}`);
  };

  // Load Users
  const loadUsers = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoadingUsers(true);
    setUsersError(null);
    try {
      // Load all users (no limit - we need to search through all of them)
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const users: UserDocument[] = [];
      
      // Load subscription docs in parallel for per-exam trial data
      const userIds = querySnapshot.docs.map(d => d.id);
      const subPromises = userIds.map(uid => 
        getDoc(doc(db, 'subscriptions', uid)).catch(() => null)
      );
      const subDocs = await Promise.all(subPromises);
      const subMap: Record<string, Record<string, unknown>> = {};
      subDocs.forEach((subDoc, i) => {
        if (subDoc && subDoc.exists()) {
          subMap[userIds[i]] = subDoc.data();
        }
      });
      
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        
        // Skip soft-deleted users
        if (data.deletedAt) {
          return;
        }
        
        const subData = subMap[docSnap.id];
        
        // Merge subscription data from subscriptions/{uid} collection
        // The Stripe webhook writes to subscriptions/{uid}, NOT to users/{uid}.subscription
        // So we need to build the subscription object from the sub doc if the user doc doesn't have one.
        let subscription = data.subscription;
        if (subData && (!subscription?.tier || subscription?.tier === 'free')) {
          const subTier = subData.tier as string;
          const subStatus = subData.status as string;
          // Only override if the sub doc has real subscription data
          if (subTier && subTier !== 'free') {
            subscription = {
              tier: subTier,
              status: subStatus || 'active',
              currentPeriodEnd: subData.currentPeriodEnd as { seconds: number } | undefined,
              trialEnd: subData.trialEnd as { seconds: number } | undefined,
              isFounderPricing: (subData.isFounder as boolean) || false,
            };
          } else if (subStatus === 'trialing' || subStatus === 'active') {
            subscription = {
              tier: subTier || data.subscription?.tier || 'free',
              status: subStatus,
              currentPeriodEnd: subData.currentPeriodEnd as { seconds: number } | undefined,
              trialEnd: (subData.trialEnd || subData.currentPeriodEnd) as { seconds: number } | undefined,
              isFounderPricing: (subData.isFounder as boolean) || false,
            };
          }
        }
        
        users.push({ 
          id: docSnap.id, 
          ...data,
          subscription,
          // Attach per-exam trials from subscription doc
          _trials: (subData?.trials as Record<string, { startDate?: { seconds: number }; endDate?: { seconds: number } }>) || undefined,
          // Attach per-exam paid subscriptions
          _paidExams: (subData?.paidExams as Record<string, { tier?: string; status?: string; currentPeriodEnd?: { seconds: number } }>) || undefined,
        } as UserDocument);
      });
      setUsersList(users);
      setFilteredUsers(users);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      logger.error('Error loading users', error);
      addLog('Error loading users: ' + msg, 'error');
      setUsersError(msg.includes('permission') || msg.includes('PERMISSION_DENIED')
        ? 'Permission denied — your Firestore user document may not have isAdmin: true. Try logging out and back in to auto-sync.'
        : 'Failed to load users: ' + msg);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [isAdmin]);

  // Load Email History
  const loadEmailHistory = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoadingEmailHistory(true);
    try {
      const q = query(
        collection(db, 'emailHistory'),
        orderBy('sentAt', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      const history: EmailHistoryItem[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        history.push({
          id: docSnap.id,
          subject: data.subject || '',
          body: data.body || '',
          recipientCount: data.recipientCount || 0,
          sentCount: data.sentCount || 0,
          failedCount: data.failedCount || 0,
          sentBy: data.sentBy || 'unknown',
          sentAt: data.sentAt || null,
          recipients: data.recipients || [],
        });
      });
      setEmailHistory(history);
    } catch (error) {
      logger.error('Error loading email history', error);
      addLog('Error loading email history: ' + (error instanceof Error ? error.message : String(error)), 'error');
    } finally {
      setIsLoadingEmailHistory(false);
    }
  }, [isAdmin]);

  // Find stale accounts (incomplete onboarding, 7+ days old)
  const _findStaleAccounts = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoadingStale(true);
    setStaleStatus(null);
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const cutoffTimestamp = Timestamp.fromDate(sevenDaysAgo);
      
      // Query users created before cutoff date (single inequality avoids composite index)
      const q = query(
        collection(db, 'users'),
        where('createdAt', '<=', cutoffTimestamp),
        orderBy('createdAt', 'desc'),
        limit(500)
      );
      const querySnapshot = await getDocs(q);
      const stale: UserDocument[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        // Check both legacy and new onboarding fields
        const legacyOnboarded = data.onboardingComplete === true;
        const perCourseOnboarded = data.onboardingCompleted && 
          Object.values(data.onboardingCompleted).some((v: unknown) => v === true);
        const isOnboarded = legacyOnboarded || perCourseOnboarded;
        
        // Only include accounts that never completed onboarding
        if (!isOnboarded) {
          stale.push({ id: docSnap.id, ...data } as UserDocument);
        }
      });
      setStaleAccounts(stale);
      const msg = stale.length > 0
        ? `Found ${stale.length} stale accounts (incomplete onboarding, 7+ days old)`
        : 'No stale accounts found — all users have completed onboarding.';
      setStaleStatus({ message: msg, type: stale.length > 0 ? 'warning' : 'success' });
      addLog(msg, stale.length > 0 ? 'warning' : 'info');
    } catch (error) {
      const errMsg = 'Error finding stale accounts: ' + (error instanceof Error ? error.message : String(error));
      logger.error('Error finding stale accounts', error);
      setStaleStatus({ message: errMsg, type: 'error' });
      addLog(errMsg, 'error');
    } finally {
      setIsLoadingStale(false);
    }
  }, [isAdmin]);

  // Delete stale accounts (Firestore only - doesn't delete from Auth)
  const _deleteStaleAccounts = useCallback(async () => {
    if (!isAdmin || staleAccounts.length === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete ${staleAccounts.length} stale accounts?\n\n` +
      `This will remove their Firestore data. They can re-register if needed.\n\n` +
      `This action cannot be undone.`
    );
    
    if (!confirmed) return;
    
    setIsDeletingStale(true);
    setStaleStatus(null);
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
      const msg = `Successfully deleted ${count} stale accounts from Firestore`;
      setStaleStatus({ message: msg, type: 'success' });
      addLog(msg, 'success');
      setStaleAccounts([]);
      
      // Refresh users list
      await loadUsers();
    } catch (error) {
      const errMsg = 'Error deleting stale accounts: ' + (error instanceof Error ? error.message : String(error));
      logger.error('Error deleting stale accounts', error);
      setStaleStatus({ message: errMsg, type: 'error' });
      addLog(errMsg, 'error');
    } finally {
      setIsDeletingStale(false);
    }
  }, [isAdmin, staleAccounts, loadUsers]);

  // Beta user transition - set trial end to March 1, 2026
  const BETA_TRIAL_END = new Date('2026-03-01T23:59:59Z');
  const BETA_TRIAL_START = new Date('2026-02-15T00:00:00Z');

  const _previewBetaTransition = useCallback(async () => {
    setBetaTransitionStatus('preview');
    setBetaTransitionResults(null);
    
    try {
      const subscriptionsRef = collection(db, 'subscriptions');
      const snapshot = await getDocs(subscriptionsRef);
      
      const toUpdate: { id: string; email?: string; currentTrialEnd?: string }[] = [];
      const skipped: { id: string; email?: string; reason: string }[] = [];
      
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const isPaidActive = 
          data.tier !== 'free' && 
          (data.status === 'active' || data.stripeSubscriptionId);
        
        if (isPaidActive) {
          skipped.push({
            id: docSnap.id,
            email: data.email,
            reason: `Paid subscriber (tier: ${data.tier}, status: ${data.status})`
          });
        } else {
          toUpdate.push({
            id: docSnap.id,
            email: data.email,
            currentTrialEnd: data.trialEnd?.toDate?.()?.toISOString() || 'none'
          });
        }
      });
      
      setBetaTransitionResults({ toUpdate, skipped, updated: 0, errors: 0 });
      addLog(`Preview complete: ${toUpdate.length} to update, ${skipped.length} skipped`, 'info');
    } catch (error) {
      logger.error('Error previewing beta transition:', error);
      addLog('Error previewing: ' + (error instanceof Error ? error.message : String(error)), 'error');
      setBetaTransitionStatus('idle');
    }
  }, []);

  const _executeBetaTransition = useCallback(async () => {
    if (!betaTransitionResults || betaTransitionResults.toUpdate.length === 0) return;
    
    const confirmed = window.confirm(
      `⚠️ PRODUCTION DATA MODIFICATION\n\n` +
      `This will update ${betaTransitionResults.toUpdate.length} subscriptions:\n` +
      `• Set trialEnd to March 1, 2026\n` +
      `• Mark as isBetaUser: true\n` +
      `• Mark as isFounder: true (founder rate eligible)\n\n` +
      `${betaTransitionResults.skipped.length} paid subscribers will be skipped.\n\n` +
      `This cannot be easily undone. Continue?`
    );
    
    if (!confirmed) return;
    
    setBetaTransitionStatus('executing');
    let updated = 0;
    let errors = 0;
    
    try {
      const { Timestamp } = await import('firebase/firestore');
      
      for (const sub of betaTransitionResults.toUpdate) {
        try {
          const subRef = doc(db, 'subscriptions', sub.id);
          await updateDoc(subRef, {
            tier: 'free',
            status: 'trialing',
            trialEnd: Timestamp.fromDate(BETA_TRIAL_END),
            trialStartDate: Timestamp.fromDate(BETA_TRIAL_START),
            isBetaUser: true,
            isFounder: true,
            updatedAt: Timestamp.now(),
          });
          updated++;
        } catch (err) {
          logger.error(`Error updating ${sub.id}:`, err);
          errors++;
        }
      }
      
      setBetaTransitionResults(prev => prev ? { ...prev, updated, errors } : null);
      setBetaTransitionStatus('done');
      addLog(`Beta transition complete: ${updated} updated, ${errors} errors`, updated > 0 ? 'success' : 'warning');
    } catch (error) {
      logger.error('Error executing beta transition:', error);
      addLog('Error executing: ' + (error instanceof Error ? error.message : String(error)), 'error');
      setBetaTransitionStatus('idle');
    }
  }, [betaTransitionResults]);

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
        const userCourse = getUserCourse(u);
        return userCourse === userCourseFilter;
      });
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';
      
      switch (userSortColumn) {
        case 'email':
          aVal = (a.email || '').toLowerCase();
          bVal = (b.email || '').toLowerCase();
          break;
        case 'course':
          aVal = getUserCourse(a);
          bVal = getUserCourse(b);
          break;
        case 'section':
          aVal = (a.examSection || '').toLowerCase();
          bVal = (b.examSection || '').toLowerCase();
          break;
        case 'subscription':
          const tiers = ['free', 'trial', 'monthly', 'quarterly', 'annual', 'lifetime'];
          aVal = tiers.indexOf(a.subscription?.tier || 'free');
          bVal = tiers.indexOf(b.subscription?.tier || 'free');
          break;
        case 'trials':
          // Count active trials
          const countTrials = (u: UserDocument) => {
            const now = Date.now();
            let count = 0;
            if (u._trials) {
              for (const trial of Object.values(u._trials)) {
                if (trial?.endDate?.seconds && trial.endDate.seconds * 1000 > now) count++;
              }
            }
            return count;
          };
          aVal = countTrials(a);
          bVal = countTrials(b);
          break;
        case 'role':
          aVal = a.isAdmin ? 1 : 0;
          bVal = b.isAdmin ? 1 : 0;
          break;
        case 'joined':
          aVal = a.createdAt && typeof a.createdAt === 'object' && 'seconds' in a.createdAt
            ? (a.createdAt as { seconds: number }).seconds
            : 0;
          bVal = b.createdAt && typeof b.createdAt === 'object' && 'seconds' in b.createdAt
            ? (b.createdAt as { seconds: number }).seconds
            : 0;
          break;
      }
      
      if (aVal < bVal) return userSortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return userSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredUsers(result);
    setUsersPage(1); // Reset to first page when filters change
  }, [usersList, userSearch, userFilter, userCourseFilter, userSortColumn, userSortDirection]);

  // Load Analytics
  const loadAnalytics = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoadingAnalytics(true);
    setAnalyticsError(null);
    try {
      // Get all users for detailed stats (limited for performance)
      // We filter out deleted users in-memory to match the Users tab
      const q = query(collection(db, 'users'), limit(1000));
      const querySnapshot = await getDocs(q);
      const users: UserDocument[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as UserDocument;
        // Skip soft-deleted users (same as Users tab)
        if (data.deletedAt) return;
        users.push({ ...data, id: docSnap.id });
      });
      
      // Total users excluding deleted
      const totalUsers = users.length;

      // Calculate date ranges
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(todayStart.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Active users based on lastLogin timestamp
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
        
        // Count by course (activeCourse → courseId → derived from examSection → 'cpa')
        const courseId = getUserCourse(u);
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
        if (tier in bySubscription) {
          bySubscription[tier]++;
        } else {
          bySubscription.free++;
        }
        
        // New users (based on signup date)
        if (createdAt && createdAt >= weekAgo) {
          newUsersThisWeek++;
        }
        
        // Active users based on lastLogin timestamp
        const lastLoginTs = u.lastLogin && typeof u.lastLogin === 'object' && 'seconds' in u.lastLogin
          ? new Date(u.lastLogin.seconds * 1000)
          : null;
        if (lastLoginTs) {
          if (lastLoginTs >= monthAgo) {
            activeThisMonth++;
            if (lastLoginTs >= weekAgo) {
              activeThisWeek++;
              if (lastLoginTs >= todayStart) {
                activeToday++;
              }
            }
          }
        }
      });

      // Calculate funnel metrics
      let returnedAfterSignup = 0;
      let choseSection = 0;
      let hasExamDate = 0;
      const recentSignups: AnalyticsData['funnel']['recentSignups'] = [];

      // Sort users by createdAt descending and take last 20 for detailed analysis
      const sortedByRecent = [...users].sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });

      users.forEach(u => {
        // Check if user returned after signing up (lastLogin is a different timestamp than createdAt)
        const lastLoginTs = u.lastLogin && typeof u.lastLogin === 'object' && 'seconds' in u.lastLogin
          ? u.lastLogin.seconds : 0;
        const createdTs = u.createdAt?.seconds || 0;
        // Consider "returned" if lastLogin is at least 60 seconds after createdAt (not just the initial session)
        if (lastLoginTs > createdTs + 60) returnedAfterSignup++;

        // Check if they chose a section
        if (u.examSection) choseSection++;
        
        // Check if they have an exam date set
        const hasDate = !!(u.examDate || (u.examDates && Object.values(u.examDates).some(v => v)));
        if (hasDate) hasExamDate++;
      });

      // Build recent signups list (last 20) with enriched activity data
      // Check diagnosticResults and questionHistory subcollections for these users
      for (const u of sortedByRecent.slice(0, 20)) {
        const signedUpAt = u.createdAt ? new Date(u.createdAt.seconds * 1000) : null;
        const daysSinceSignup = signedUpAt 
          ? Math.floor((now.getTime() - signedUpAt.getTime()) / (1000 * 60 * 60 * 24))
          : 0;
        const hasDate = !!(u.examDate || (u.examDates && Object.values(u.examDates).some(v => v)));
        const lastLoginTs = u.lastLogin && typeof u.lastLogin === 'object' && 'seconds' in u.lastLogin
          ? new Date(u.lastLogin.seconds * 1000) : null;
        
        // Check for diagnostic results and question history
        let hasDiagnostic = false;
        let questionsAnswered = 0;
        // Activity breakdown from daily_log
        let mcqsAnswered = 0, lessonsCompleted = 0, flashcardsUsed = 0, simulationsCompleted = 0, studyMinutes = 0;
        try {
          const diagSnap = await getDocs(collection(db, 'users', u.id, 'diagnosticResults'));
          hasDiagnostic = diagSnap.size > 0;
          
          const qHistorySnap = await getDocs(query(collection(db, 'users', u.id, 'questionHistory'), limit(1)));
          questionsAnswered = qHistorySnap.size > 0 ? 1 : 0;

          // Query daily_log for feature engagement breakdown
          const dailyLogSnap = await getDocs(collection(db, 'users', u.id, 'daily_log'));
          dailyLogSnap.forEach(logDoc => {
            const data = logDoc.data();
            mcqsAnswered += data.questionsAttempted || 0;
            lessonsCompleted += data.lessonsCompleted || 0;
            simulationsCompleted += data.simulationsCompleted || 0;
            studyMinutes += data.studyTimeMinutes || 0;
            if (data.activities && Array.isArray(data.activities)) {
              flashcardsUsed += data.activities.filter((a: { type: string }) => a.type === 'flashcard').length;
            }
          });
        } catch {
          // Permission or missing collection - ignore
        }
        
        recentSignups.push({
          email: u.email || u.id.slice(0, 12),
          uid: u.id,
          signedUpAt,
          courseId: getUserCourse(u),
          hasSection: !!u.examSection,
          hasExamDate: hasDate,
          hasDiagnostic,
          questionsAnswered,
          daysSinceSignup,
          lastActiveAt: lastLoginTs,
          timezone: u.signupSource?.timezone,
          utmSource: u.signupSource?.utm_source,
          mcqsAnswered,
          lessonsCompleted,
          flashcardsUsed,
          simulationsCompleted,
          studyMinutes,
        });
      }
      
      // Calculate diagnostic and question counts from recentSignups (sampled)
      const completedDiagnostic = recentSignups.filter(u => u.hasDiagnostic).length;
      const answeredQuestion = recentSignups.filter(u => u.questionsAnswered > 0).length;

      setAnalytics({
        totalUsers,
        activeToday,
        activeThisWeek,
        activeThisMonth,
        newUsersThisWeek,
        byCourse,
        bySection,
        bySubscription,
        funnel: {
          signedUp: totalUsers,
          returnedAfterSignup,
          choseSection,
          hasExamDate,
          completedDiagnostic,
          answeredQuestion,
          activeLast7Days: activeThisWeek,
          recentSignups,
        },
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      logger.error('Error loading analytics', error);
      addLog('Error loading analytics: ' + msg, 'error');
      setAnalyticsError(msg.includes('permission') || msg.includes('PERMISSION_DENIED')
        ? 'Permission denied — your Firestore user document may not have isAdmin: true. Try logging out and back in to auto-sync.'
        : 'Failed to load analytics: ' + msg);
    } finally {
      setIsLoadingAnalytics(false);
    }
  }, [isAdmin]);

  // Load Growth Metrics
  const loadGrowthMetrics = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoadingGrowth(true);
    try {
      const now = new Date();
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // Get users for signup date analysis (limited, excluding deleted)
      const usersRef = collection(db, 'users');
      const usersQuery = query(usersRef, orderBy('createdAt', 'desc'), limit(500));
      const usersSnap = await getDocs(usersQuery);
      
      let totalUsers = 0;
      let thisMonthSignups = 0;
      let lastMonthSignups = 0;
      let paidUsers = 0;
      
      usersSnap.forEach((doc) => {
        const data = doc.data();
        // Skip soft-deleted users
        if (data.deletedAt) return;
        totalUsers++;
        const createdAt = data.createdAt?.seconds ? new Date(data.createdAt.seconds * 1000) : null;
        if (createdAt) {
          if (createdAt >= thisMonthStart) thisMonthSignups++;
          else if (createdAt >= lastMonthStart && createdAt <= lastMonthEnd) lastMonthSignups++;
        }
        if (data.subscription?.tier && data.subscription.tier !== 'free') {
          paidUsers++;
        }
      });

      // Get referral counts
      let totalReferrals = 0;
      let pendingReferralRewards = 0;
      try {
        const referralsRef = collection(db, 'referrals');
        const referralsSnap = await getCountFromServer(referralsRef);
        totalReferrals = referralsSnap.data().count;
        
        // Pending rewards (converted but not rewarded)
        const pendingQuery = query(referralsRef, where('converted', '==', true), where('rewarded', '==', false));
        const pendingSnap = await getDocs(pendingQuery);
        pendingReferralRewards = pendingSnap.size;
      } catch {
        // Collection may not exist yet
      }

      // Get diagnostic lead counts
      let totalLeads = 0;
      let leadsThisWeek = 0;
      try {
        const leadsRef = collection(db, 'diagnosticLeads');
        const leadsSnap = await getCountFromServer(leadsRef);
        totalLeads = leadsSnap.data().count;
        
        // Leads this week
        const recentLeadsQuery = query(leadsRef, orderBy('createdAt', 'desc'), limit(50));
        const recentLeadsSnap = await getDocs(recentLeadsQuery);
        recentLeadsSnap.forEach((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.seconds ? new Date(data.createdAt.seconds * 1000) : null;
          if (createdAt && createdAt >= weekAgo) leadsThisWeek++;
        });
      } catch {
        // Collection may not exist yet
      }

      // Get testimonial counts
      let totalTestimonials = 0;
      let pendingTestimonials = 0;
      try {
        const testimonialsRef = collection(db, 'testimonials');
        const testimonialsSnap = await getCountFromServer(testimonialsRef);
        totalTestimonials = testimonialsSnap.data().count;
        
        // Pending approval
        const pendingTestQuery = query(testimonialsRef, where('status', '==', 'pending'));
        const pendingTestSnap = await getDocs(pendingTestQuery);
        pendingTestimonials = pendingTestSnap.size;
      } catch {
        // Collection may not exist yet
      }

      // Calculate conversion rate (paid / total)
      const conversionRate = totalUsers > 0 ? (paidUsers / totalUsers) * 100 : 0;

      setGrowthMetrics({
        totalUsers,
        thisMonthSignups,
        lastMonthSignups,
        totalReferrals,
        pendingReferralRewards,
        totalLeads,
        leadsThisWeek,
        totalTestimonials,
        pendingTestimonials,
        conversionRate
      });
    } catch (error) {
      logger.error('Error loading growth metrics', error);
    } finally {
      setIsLoadingGrowth(false);
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
      // Doc IDs are either 'YYYY-MM-DD' (legacy) or '{courseId}_YYYY-MM-DD' (current)
      const dailyLogRef = collection(db, 'users', userId, 'daily_log');
      const dailyLogSnap = await getDocs(dailyLogRef);
      logger.log('Got daily_log:', dailyLogSnap.docs.length, 'docs');
      const validCourseIds = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
      const dailyLogs = dailyLogSnap.docs.map(doc => {
        const rawId = doc.id;
        let courseId = '';
        let dateStr = rawId;
        // Parse courseId prefix from doc ID (e.g., 'ea_2026-02-15' → courseId='ea', date='2026-02-15')
        const underscoreIdx = rawId.indexOf('_');
        if (underscoreIdx > 0) {
          const prefix = rawId.substring(0, underscoreIdx).toLowerCase();
          if (validCourseIds.includes(prefix)) {
            courseId = prefix;
            dateStr = rawId.substring(underscoreIdx + 1);
          }
        }
        return {
          date: dateStr,
          courseId,
          ...doc.data()
        };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any[];
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
      
      // Load diagnostic results
      const diagnosticRef = collection(db, 'users', userId, 'diagnosticResults');
      const diagnosticSnap = await getDocs(diagnosticRef);
      logger.log('Got diagnosticResults:', diagnosticSnap.docs.length, 'docs');
      const diagnosticResults = diagnosticSnap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          courseId: data.courseId || '',
          section: data.section || '',
          percentage: data.percentage || 0,
          passed: data.passed || false,
          completedAt: data.completedAt,
          areaPerformance: data.areaPerformance || [],
        };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any[];
      diagnosticResults.sort((a, b) => (b.completedAt?.seconds || 0) - (a.completedAt?.seconds || 0));
      
      // Calculate stats - use lastCorrect or timesCorrect field
      const totalQuestions = questionHistory.length;
      const totalCorrect = questionHistory.filter(q => q.lastCorrect === true || q.timesCorrect > 0).length;
      const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
      const totalStudyMinutes = dailyLogs.reduce((sum, log) => sum + (log.studyTimeMinutes || log.studyMinutes || 0), 0);
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
        diagnosticResults,
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
      logger.error('Error toggling admin status:', error);
      addLog('Failed to toggle admin: ' + (error instanceof Error ? error.message : String(error)), 'error');
    }
  };

  // Grant/revoke premium access
  const setSubscriptionTier = async (userId: string, tier: 'free' | 'lifetime') => {
    if (!isAdmin) return;
    const confirmMsg = tier === 'lifetime'
      ? 'Grant LIFETIME premium access to this user (ALL exams)?'
      : 'Remove premium access from this user?';
    if (!window.confirm(confirmMsg)) return;
    
    try {
      const { Timestamp, setDoc: firestoreSetDoc } = await import('firebase/firestore');
      const now = Timestamp.now();
      const allExams = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
      
      // Update users collection (legacy/display)
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { 
        'subscription.tier': tier,
        'subscription.status': tier === 'lifetime' ? 'active' : 'inactive',
        'subscription.grantedBy': user?.email,
        'subscription.grantedAt': new Date().toISOString(),
      });
      
      // Update subscriptions collection (where the app actually checks access)
      const subRef = doc(db, 'subscriptions', userId);
      if (tier === 'lifetime') {
        // Grant lifetime access to ALL exams
        const paidExams: Record<string, { tier: string; status: string; grantedBy: string; grantedAt: typeof now }> = {};
        for (const examId of allExams) {
          paidExams[examId] = {
            tier: 'lifetime',
            status: 'active',
            grantedBy: user?.email || 'admin',
            grantedAt: now,
          };
        }
        await firestoreSetDoc(subRef, {
          tier: 'lifetime',
          status: 'active',
          paidExams,
          updatedAt: now,
          modifiedBy: user?.email,
        }, { merge: true });
      } else {
        // Revoke: set all exams to inactive
        const paidExams: Record<string, { tier: string; status: string }> = {};
        for (const examId of allExams) {
          paidExams[examId] = {
            tier: 'free',
            status: 'inactive',
          };
        }
        await firestoreSetDoc(subRef, {
          tier: 'free',
          status: 'inactive',
          paidExams,
          updatedAt: now,
          modifiedBy: user?.email,
        }, { merge: true });
      }
      
      addLog(`${tier === 'lifetime' ? 'Granted' : 'Revoked'} premium for user ${userId}`, 'success');
      loadUsers();
    } catch (error) {
      logger.error('Error updating subscription', error);
      addLog('Failed to update subscription: ' + (error instanceof Error ? error.message : String(error)), 'error');
    }
  };

  // Set a user's trial end date for a specific exam (admin only)
  const setTrialEndDate = async (userId: string, newDate: Date, examId?: string) => {
    if (!isAdmin) return;

    try {
      const subRef = doc(db, 'subscriptions', userId);
      const { Timestamp, setDoc: firestoreSetDoc } = await import('firebase/firestore');

      if (examId) {
        // Per-exam trial: update specific exam in trials map
        // IMPORTANT: Use updateDoc (not setDoc+merge) so dot-notation keys
        // are written as nested paths (trials.ea.endDate -> trials -> ea -> endDate)
        // setDoc+merge treats them as literal flat field names which breaks reads.
        try {
          await updateDoc(subRef, {
            [`trials.${examId}.endDate`]: Timestamp.fromDate(newDate),
            [`trials.${examId}.startDate`]: Timestamp.now(),
            updatedAt: Timestamp.now(),
            modifiedBy: user?.email,
          });
        } catch (docErr: unknown) {
          // If subscription doc doesn't exist yet, create it with proper nesting
          if (docErr instanceof Error && docErr.message?.includes('No document to update')) {
            await firestoreSetDoc(subRef, {
              trials: {
                [examId]: {
                  endDate: Timestamp.fromDate(newDate),
                  startDate: Timestamp.now(),
                },
              },
              updatedAt: Timestamp.now(),
              modifiedBy: user?.email,
            });
          } else {
            throw docErr;
          }
        }
        addLog(`Set ${examId.toUpperCase()} trial end to ${newDate.toLocaleDateString()} for user ${userId}`, 'success');
      } else {
        // Legacy: update root-level trialEnd (top-level fields, safe with setDoc+merge)
        await firestoreSetDoc(subRef, {
          trialEnd: Timestamp.fromDate(newDate),
          status: 'trialing',
          updatedAt: Timestamp.now(),
          modifiedBy: user?.email,
        }, { merge: true });
        addLog(`Set trial end date to ${newDate.toLocaleDateString()} for user ${userId}`, 'success');
      }

      // Also update the user document's subscription snapshot
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        'subscription.trialEnd': { seconds: Math.floor(newDate.getTime() / 1000), nanoseconds: 0 },
        'subscription.status': 'trialing',
      });

      setEditingTrialUserId(null);
      loadUsers();
    } catch (error) {
      logger.error('Error setting trial date', error);
      addLog('Failed to set trial date: ' + (error instanceof Error ? error.message : String(error)), 'error');
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
        limit(200) // Increased limit for better stats
      );
      const querySnapshot = await getDocs(q);
      const errors: SystemError[] = [];
      querySnapshot.forEach((doc) => {
        errors.push({ id: doc.id, ...doc.data() } as SystemError);
      });
      setSystemErrors(errors);
      
      // Compute error statistics
      const now = Date.now();
      const day = 24 * 60 * 60 * 1000;
      const byCategory: Record<string, number> = {};
      const bySeverity: Record<string, number> = {};
      const messageGroups: Record<string, { count: number; lastSeen: Date }> = {};
      let last24h = 0;
      let last7d = 0;
      
      errors.forEach(err => {
        // Get timestamp
        const ts = err.timestamp && typeof err.timestamp === 'object' && 'seconds' in err.timestamp
          ? (err.timestamp as { seconds: number }).seconds * 1000
          : typeof err.timestamp === 'string' ? new Date(err.timestamp).getTime() : 0;
        
        // Time-based counts
        if (now - ts < day) last24h++;
        if (now - ts < 7 * day) last7d++;
        
        // Category counts (from context if available)
        const category = (err as unknown as { category?: string }).category || 'unknown';
        byCategory[category] = (byCategory[category] || 0) + 1;
        
        // Severity counts
        const severity = (err as unknown as { severity?: string }).severity || 'medium';
        bySeverity[severity] = (bySeverity[severity] || 0) + 1;
        
        // Group by message (first 100 chars)
        const msgKey = (err.message || 'Unknown error').substring(0, 100);
        if (!messageGroups[msgKey]) {
          messageGroups[msgKey] = { count: 0, lastSeen: new Date(ts) };
        }
        messageGroups[msgKey].count++;
        if (ts > messageGroups[msgKey].lastSeen.getTime()) {
          messageGroups[msgKey].lastSeen = new Date(ts);
        }
      });
      
      // Get top errors by count
      const topErrors = Object.entries(messageGroups)
        .map(([message, data]) => ({ message, ...data }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
      
      setErrorStats({
        total: errors.length,
        last24h,
        last7d,
        byCategory,
        bySeverity,
        topErrors,
      });
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

  // Load LinkedIn status from Firestore
  const loadLinkedInStatus = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const linkedInDoc = await getDoc(doc(db, 'system_config', 'linkedin'));
      if (!linkedInDoc.exists()) {
        setLinkedInStatus({ status: 'not-configured' });
        return;
      }
      const data = linkedInDoc.data();
      const accessToken = data.accessToken;
      const expiresAt = data.expiresAt?.toDate?.() || (data.expiresAt ? new Date(data.expiresAt) : null);
      
      if (!accessToken) {
        setLinkedInStatus({ status: 'not-configured' });
        return;
      }
      
      if (expiresAt && expiresAt < new Date()) {
        setLinkedInStatus({ status: 'expired', expiresAt, orgId: data.orgId });
        return;
      }
      
      setLinkedInStatus({ 
        status: 'active', 
        expiresAt: expiresAt || undefined, 
        orgId: data.orgId 
      });
    } catch (error) {
      logger.error('Error loading LinkedIn status', error);
      setLinkedInStatus({ status: 'not-configured' });
    }
  }, [isAdmin]);

  // Load Discord status from Firestore
  const loadDiscordStatus = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const discordDoc = await getDoc(doc(db, 'system_config', 'discord'));
      if (!discordDoc.exists()) {
        setDiscordStatus({ status: 'not-configured' });
        return;
      }
      const data = discordDoc.data();
      if (data.enabled && data.webhookUrl) {
        setDiscordStatus({ status: 'active' });
      } else {
        setDiscordStatus({ status: 'not-configured' });
      }
    } catch (error) {
      logger.error('Error loading Discord status', error);
      setDiscordStatus({ status: 'not-configured' });
    }
  }, [isAdmin]);

  // Load function statuses from system_status collection
  const loadFunctionStatuses = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const statusSnapshot = await getDocs(collection(db, 'system_status'));
      const statuses: Record<string, { status: 'success' | 'error' | 'skipped' | 'unknown'; lastRun?: Date; details?: Record<string, unknown> }> = {};
      statusSnapshot.forEach((doc) => {
        const data = doc.data();
        statuses[doc.id] = {
          status: data.status || 'unknown',
          lastRun: data.lastRun?.toDate?.() || (data.lastRun ? new Date(data.lastRun) : undefined),
          details: data.details,
        };
      });
      setFunctionStatuses(statuses);
    } catch (error) {
      logger.error('Error loading function statuses', error);
    }
  }, [isAdmin]);

  // Load communication templates via Cloud Function
  const loadCommunicationTemplates = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoadingTemplates(true);
    try {
      const getTemplates = httpsCallable(functions, 'getCommunicationTemplates');
      const result = await getTemplates({});
      const data = result.data as { templates: CommunicationTemplate[] };
      setCommunicationTemplates(data.templates || []);
    } catch (error) {
      logger.error('Error loading communication templates', error);
      // Fallback to empty - Cloud Function will return defaults
      setCommunicationTemplates([]);
    } finally {
      setIsLoadingTemplates(false);
    }
  }, [isAdmin]);

  // Save template changes via Cloud Function
  const saveTemplate = useCallback(async (template: CommunicationTemplate) => {
    if (!isAdmin || !template) return;
    setIsSavingTemplate(true);
    try {
      const updateTemplate = httpsCallable(functions, 'updateCommunicationTemplate');
      await updateTemplate({
        templateId: template.id,
        updates: {
          subject: template.subject,
          body: template.body,
          enabled: template.enabled,
          name: template.name,
          description: template.description,
        },
      });
      // Reload templates after save
      await loadCommunicationTemplates();
      setEditingTemplate(null);
      logger.info(`Template ${template.id} updated successfully`);
    } catch (error) {
      logger.error('Error saving template', error);
      alert('Failed to save template. Please try again.');
    } finally {
      setIsSavingTemplate(false);
    }
  }, [isAdmin, loadCommunicationTemplates]);

  // Seed default templates to Firestore
  const seedTemplates = useCallback(async () => {
    if (!isAdmin) return;
    setIsSeedingTemplates(true);
    try {
      const seed = httpsCallable(functions, 'seedCommunicationTemplates');
      const result = await seed({});
      const data = result.data as { created: number; skipped: number };
      logger.info(`Seeded templates: ${data.created} created, ${data.skipped} skipped`);
      // Reload templates after seeding
      await loadCommunicationTemplates();
    } catch (error) {
      logger.error('Error seeding templates', error);
      alert('Failed to seed templates. Please try again.');
    } finally {
      setIsSeedingTemplates(false);
    }
  }, [isAdmin, loadCommunicationTemplates]);

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
  const _updateReportStatus = useCallback(async (reportId: string, newStatus: 'reviewed' | 'resolved' | 'dismissed') => {
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

  // Generate AI response for a question report
  const _generateReportResponse = useCallback(async (report: QuestionReport) => {
    setGeneratingResponse(report.id);
    try {
      // Fetch the actual question data to craft a good response
      const courseId = (report.courseId || 'cpa') as CourseId;
      const questionData = await loadCourseQuestionData(courseId);
      const questions = questionData?.questions as Array<{
        id: string;
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
      }>;
      const question = questions?.find(q => q.id === report.questionId);
      
      let response = '';
      
      if (report.type === 'incorrect_answer' || report.type === 'wrong_answer' || report.type === 'wrong-answer') {
        if (question) {
          const correctLetter = ['A', 'B', 'C', 'D'][question.correctAnswer];
          const correctOption = question.options[question.correctAnswer];
          response = `Hi,

Thank you for your feedback on this question!

I've reviewed this question and can confirm that the correct answer is **${correctLetter}: "${correctOption}"**

${question.explanation}

If you believe there's still an issue, please let me know what answer you expected and why—I'm happy to take another look.

Best,
VoraPrep Team`;
        } else {
          response = `Hi,

Thank you for reporting this issue! I've reviewed the question and verified the correct answer.

The marked answer is correct based on current AICPA exam guidance. If you believe there's an error, could you share which answer you expected and any reference materials you're using? I'm happy to investigate further.

Best,
VoraPrep Team`;
        }
      } else if (report.type === 'unclear_question') {
        response = `Hi,

Thank you for flagging this question as unclear! I've reviewed it and will make the wording more precise in our next content update.

In the meantime, here's what the question is asking: [Add clarification]

Best,
VoraPrep Team`;
      } else if (report.type === 'typo') {
        response = `Hi,

Thanks for catching that typo! I've corrected it in our system. Your attention to detail helps us maintain high quality content for all users.

Best,
VoraPrep Team`;
      } else {
        response = `Hi,

Thank you for your feedback on this question! I've reviewed your report and [take appropriate action].

If you have any other questions or concerns, please don't hesitate to reach out.

Best,
VoraPrep Team`;
      }
      
      setReportResponses(prev => ({ ...prev, [report.id]: response }));
    } catch (error) {
      logger.error('Error generating response:', error);
      setReportResponses(prev => ({ 
        ...prev, 
        [report.id]: 'Error generating response. Please try again.' 
      }));
    } finally {
      setGeneratingResponse(null);
    }
  }, []);

  // Copy response to clipboard
  const _copyResponseToClipboard = useCallback((reportId: string) => {
    const response = reportResponses[reportId];
    if (response) {
      navigator.clipboard.writeText(response);
      addLog('Response copied to clipboard', 'success');
    }
  }, [reportResponses]);

  // Send response email directly
  const _sendReportResponseEmail = useCallback(async (report: QuestionReport) => {
    const response = reportResponses[report.id];
    const recipientEmail = report.reportedByEmail || report.reportedBy;
    
    if (!response) {
      addLog('No response to send. Generate one first.', 'warning');
      return;
    }
    if (!recipientEmail || !recipientEmail.includes('@')) {
      addLog('Invalid recipient email address', 'error');
      return;
    }
    
    setSendingResponse(report.id);
    try {
      const sendEmail = httpsCallable(functions, 'sendAdminEmail');
      await sendEmail({
        to: recipientEmail,
        subject: `Re: Question Report - ${report.questionId}`,
        body: response,
        reportId: report.id,
      });
      
      addLog(`Email sent to ${recipientEmail}`, 'success');
      
      // Update local state to show report as resolved
      setQuestionReports(prev => prev.map(r => 
        r.id === report.id ? { ...r, status: 'resolved' } : r
      ));
      
      // Collapse the report 
      setExpandedReportId(null);
    } catch (error) {
      logger.error('Error sending email:', error);
      addLog(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setSendingResponse(null);
    }
  }, [reportResponses]);

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

  // Load Content Quality Audit - find questions missing explanations/blueprints
  const loadContentAudit = useCallback(async () => {
    setIsLoadingAudit(true);
    try {
      const withoutExplanation: Array<{ id: string; section: string; topic?: string }> = [];
      const withoutBlueprint: Array<{ id: string; section: string }> = [];
      const shortExplanations: Array<{ id: string; section: string; length: number }> = [];
      const wrongOptionCount: Array<{ id: string; section: string; count: number }> = [];
      const missingDifficulty: Array<{ id: string; section: string }> = [];
      const missingSection: Array<{ id: string; course: string }> = [];
      const idCounts = new Map<string, { course: string; count: number }>();
      const difficultyDistribution: Record<string, { easy: number; medium: number; hard: number; other: number }> = {};
      let totalScanned = 0;

      // Scan all courses' questions
      for (const courseId of getActiveCourses().map(c => c.id)) {
        const data = await loadCourseQuestionData(courseId);
        if (!data?.questions) continue;

        const courseLabel = courseId.toUpperCase();
        if (!difficultyDistribution[courseLabel]) {
          difficultyDistribution[courseLabel] = { easy: 0, medium: 0, hard: 0, other: 0 };
        }

        for (const q of data.questions as Array<{
          id?: string; question_id?: string;
          explanation?: string; detailed_explanation?: string;
          blueprintArea?: string; section?: string; topic?: string;
          options?: string[]; choices?: string[];
          difficulty?: string;
        }>) {
          totalScanned++;
          const qId = q.id || q.question_id || 'unknown';
          const section = q.section || courseLabel;
          
          // Check for missing explanation
          if (!q.explanation && !q.detailed_explanation) {
            if (withoutExplanation.length < 50) {
              withoutExplanation.push({ id: qId, section, topic: q.topic });
            }
          }
          
          // Check for short/placeholder explanations (< 20 chars)
          const explText = q.explanation || q.detailed_explanation || '';
          if (explText && explText.length > 0 && explText.length < 20) {
            if (shortExplanations.length < 50) {
              shortExplanations.push({ id: qId, section, length: explText.length });
            }
          }
          
          // Check for missing blueprint (CPA specific)
          if (courseId === 'cpa' && !q.blueprintArea) {
            if (withoutBlueprint.length < 50) {
              withoutBlueprint.push({ id: qId, section });
            }
          }

          // Check for wrong option count (should be exactly 4)
          const opts = q.options || q.choices || [];
          if (opts.length !== 4) {
            if (wrongOptionCount.length < 50) {
              wrongOptionCount.push({ id: qId, section, count: opts.length });
            }
          }

          // Check for missing difficulty
          if (!q.difficulty) {
            if (missingDifficulty.length < 50) {
              missingDifficulty.push({ id: qId, section });
            }
          }

          // Check for missing section
          if (!q.section) {
            if (missingSection.length < 50) {
              missingSection.push({ id: qId, course: courseLabel });
            }
          }

          // Track duplicate IDs
          const fullId = `${courseId}:${qId}`;
          const existing = idCounts.get(fullId);
          if (existing) {
            existing.count++;
          } else {
            idCounts.set(fullId, { course: courseLabel, count: 1 });
          }

          // Track difficulty distribution
          const diff = (q.difficulty || '').toLowerCase();
          if (diff === 'easy' || diff === 'beginner' || diff === 'foundational') {
            difficultyDistribution[courseLabel].easy++;
          } else if (diff === 'medium' || diff === 'moderate' || diff === 'intermediate') {
            difficultyDistribution[courseLabel].medium++;
          } else if (diff === 'hard' || diff === 'tough' || diff === 'advanced') {
            difficultyDistribution[courseLabel].hard++;
          } else {
            difficultyDistribution[courseLabel].other++;
          }
        }
      }

      // Extract duplicates
      const duplicateIds: Array<{ id: string; course: string; count: number }> = [];
      idCounts.forEach((val, key) => {
        if (val.count > 1) {
          const qId = key.split(':').slice(1).join(':');
          duplicateIds.push({ id: qId, course: val.course, count: val.count });
        }
      });
      duplicateIds.sort((a, b) => b.count - a.count);

      setContentAudit({
        questionsWithoutExplanation: withoutExplanation,
        questionsWithoutBlueprint: withoutBlueprint,
        duplicateIds: duplicateIds.slice(0, 50),
        shortExplanations,
        wrongOptionCount,
        missingDifficulty,
        missingSection,
        difficultyDistribution,
        totalScanned
      });
      
      const issues = withoutExplanation.length + withoutBlueprint.length + duplicateIds.length + 
        shortExplanations.length + wrongOptionCount.length + missingDifficulty.length + missingSection.length;
      addLog(`Audit complete: scanned ${totalScanned} questions, ${issues} issues found`, issues > 0 ? 'warning' : 'success');
    } catch (error) {
      logger.error('Error loading content audit', error);
      addLog('Error loading content audit', 'error');
    } finally {
      setIsLoadingAudit(false);
    }
  }, []);

  // Compute Revenue Metrics from user subscription data using actual per-course pricing
  const computeRevenueMetrics = useCallback(() => {
    if (usersList.length === 0) return;

    // Per-course pricing from subscription.ts:
    // CPA: $199/yr or $29/mo (founder: $99/yr, $14/mo)
    // CFP: $149/yr or $19/mo (founder: $74/yr, $10/mo)
    // CMA: $99/yr or $14/mo (founder: $49/yr, $7/mo)
    // CIA: $99/yr or $14/mo (founder: $49/yr, $7/mo)
    // CISA: $79/yr or $12/mo (founder: $39/yr, $6/mo)
    // EA: $59/yr or $9/mo (founder: $29/yr, $5/mo)
    // Note: NO lifetime plans offered

    let monthlyMRR = 0;
    let annualMRR = 0;
    let monthly = 0;
    let annual = 0;
    let founderCount = 0;
    let churnRisk = 0;
    const now = Date.now() / 1000;
    const byCourse: Record<string, { count: number; revenue: number }> = {};

    usersList.forEach(u => {
      const tier = u.subscription?.tier;
      const status = u.subscription?.status;
      const courseId = getUserCourse(u) as keyof typeof EXAM_PRICING;
      const isFounder = u.subscription?.isFounderPricing;
      
      if (status === 'active' || status === 'trialing') {
        const pricing = EXAM_PRICING[courseId] || EXAM_PRICING.cpa;
        
        // Track by course
        if (!byCourse[courseId]) byCourse[courseId] = { count: 0, revenue: 0 };
        byCourse[courseId].count++;
        
        if (tier === 'monthly') {
          monthly++;
          const price = isFounder ? pricing.founderMonthly : pricing.monthly;
          monthlyMRR += price;
          byCourse[courseId].revenue += price;
        } else if (tier === 'annual') {
          annual++;
          const annualPrice = isFounder ? pricing.founderAnnual : pricing.annual;
          annualMRR += annualPrice / 12; // Amortized monthly
          byCourse[courseId].revenue += annualPrice / 12;
        }
        
        if (isFounder) founderCount++;
        
        // Check for trial ending in 3 days
        const trialEnd = u.subscription?.trialEnd?.seconds;
        if (status === 'trialing' && trialEnd && trialEnd - now < 3 * 24 * 60 * 60) {
          churnRisk++;
        }
      }
    });

    const totalMRR = monthlyMRR + annualMRR;
    const subscriberCount = monthly + annual;
    const arpu = subscriberCount > 0 ? totalMRR / subscriberCount : 0;

    setRevenueMetrics({
      monthlyMRR,
      annualMRR,
      totalMRR,
      arrProjection: totalMRR * 12,
      arpu,
      subscriberCount,
      byPlan: { monthly, annual },
      byCourse,
      founderCount,
      churnRisk
    });
  }, [usersList]);

  // Load Announcement History
  const loadAnnouncementHistory = useCallback(async () => {
    setIsLoadingAnnouncements(true);
    try {
      const q = query(
        collection(db, 'announcements'),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      const snapshot = await getDocs(q);
      const announcements: typeof announcementHistory = [];
      snapshot.forEach(doc => {
        announcements.push({ id: doc.id, ...doc.data() } as typeof announcementHistory[0]);
      });
      setAnnouncementHistory(announcements);
    } catch (error) {
      logger.error('Error loading announcements', error);
    } finally {
      setIsLoadingAnnouncements(false);
    }
  }, []);

  // Send Announcement
  const sendAnnouncement = useCallback(async () => {
    if (!announcementTitle || !announcementBody) return;
    
    setIsSendingAnnouncement(true);
    try {
      const announcementData = {
        title: announcementTitle,
        body: announcementBody,
        audience: announcementAudience,
        createdAt: new Date(),
        createdBy: user?.email || 'admin',
        active: true,
      };
      
      await addDoc(collection(db, 'announcements'), announcementData);
      
      addLog(`Announcement "${announcementTitle}" sent to ${announcementAudience} users`, 'success');
      
      // Clear form
      setAnnouncementTitle('');
      setAnnouncementBody('');
      setAnnouncementAudience('all');
      
      // Reload history
      loadAnnouncementHistory();
    } catch (error) {
      logger.error('Error sending announcement', error);
      addLog(`Failed to send announcement: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setIsSendingAnnouncement(false);
    }
  }, [announcementTitle, announcementBody, announcementAudience, user, loadAnnouncementHistory]);

  // Effect to load tab data
  // Note: We intentionally exclude loading functions from deps to prevent re-triggering
  // when isAdmin changes (which would cause infinite loading loops). The functions
  // capture isAdmin via closure, and we only want to re-load when activeTab changes.
  useEffect(() => {
    if (!isAdmin) return; // Don't load anything until admin access is confirmed
    
    if (activeTab === 'overview') {
      loadAnalytics();
      loadUsers();
    } else if (activeTab === 'users') {
      loadUsers();
      loadEmailHistory();
    } else if (activeTab === 'revenue') {
      loadUsers(); // For subscription data
    } else if (activeTab === 'analytics') {
      loadAnalytics();
      loadEngagementStats();
      loadQuestionReports();
    } else if (activeTab === 'growth') {
      loadGrowthMetrics();
    } else if (activeTab === 'operations') {
      loadSystemErrors();
      loadAnnouncementHistory();
      loadLinkedInStatus();
      loadDiscordStatus();
      loadFunctionStatuses();
      loadCommunicationTemplates();
    } else if (activeTab === 'settings') {
      // Settings loads on demand
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isAdmin]);

  // Compute revenue metrics when users list changes
  useEffect(() => {
    if (usersList.length > 0) {
      computeRevenueMetrics();
    }
  }, [usersList, computeRevenueMetrics]);

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
          const questionData = await loadCourseQuestionData(course.id);
          const flashcardCount = await loadCourseFlashcardData(course.id);
          const lessonCount = await loadCourseLessonData(course.id);
          
          stats.push({
            courseId: course.id,
            courseName: course.name,
            questions: questionData?.stats?.total || questionData?.questions?.length || 0,
            lessons: lessonCount,
            simulations: 0,
            flashcards: flashcardCount,
            bySection: questionData?.stats?.bySection || {},
          });
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
      
      // Load TBS stats for CPA (only course with TBS currently)
      try {
        const tbsModule = await import('../../../data/cpa/tbs');
        const tbsData = tbsModule.getTBSStats();
        setTbsStats({ total: tbsData.total, bySection: tbsData.bySection, byType: tbsData.byType });
      } catch (error) {
        logger.error('Error loading TBS stats:', error);
      }

      // Load unique content stats for CMA
      try {
        const cmaContent = await loadCourseUniqueContent('cma');
        if (cmaContent) {
          setCmaUniqueContent({
            essays: cmaContent.essays || 0,
            essaysBySection: cmaContent.essaysBySection || {},
            cbqs: cmaContent.cbqs || 0,
            cbqsBySection: cmaContent.cbqsBySection || {},
            simulations: cmaContent.simulations || 0,
            simulationsBySection: cmaContent.simulationsBySection || {},
          });
        }
      } catch (error) {
        logger.error('Error loading CMA unique content:', error);
      }

      // Load unique content stats for CFP
      try {
        const cfpContent = await loadCourseUniqueContent('cfp');
        if (cfpContent) {
          setCfpUniqueContent({
            caseStudies: cfpContent.caseStudies || 0,
            itemSets: cfpContent.itemSets || 0,
          });
        }
      } catch (error) {
        logger.error('Error loading CFP unique content:', error);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400">You don&apos;t have permission to access the admin area.</p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Console</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">VoraPrep Business Dashboard</p>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Logged in as: {user.email}</div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-1 sm:gap-2 border-b border-gray-200 dark:border-slate-700 overflow-x-auto scrollbar-hide pb-px -mb-px">
          {(['overview', 'users', 'revenue', 'analytics', 'content', 'growth', 'sms', 'operations', 'settings'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium capitalize transition-colors whitespace-nowrap flex-shrink-0 ${
                activeTab === tab
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <span className="hidden sm:inline">
                {tab === 'overview' && '📊 Overview'}
                {tab === 'users' && '👥 Users'}
                {tab === 'revenue' && '💰 Revenue'}
                {tab === 'analytics' && '📈 Analytics'}
                {tab === 'content' && '📦 Content'}
                {tab === 'growth' && '🚀 Marketing'}
                {tab === 'sms' && '📱 Daily SMS'}
                {tab === 'operations' && '🔧 Operations'}
                {tab === 'settings' && '⚙️ Settings'}
              </span>
              <span className="sm:hidden">
                {tab === 'overview' && '📊'}
                {tab === 'users' && '👥'}
                {tab === 'revenue' && '💰'}
                {tab === 'analytics' && '📈'}
                {tab === 'content' && '📦'}
                {tab === 'growth' && '🚀'}
                {tab === 'sms' && '📱'}
                {tab === 'operations' && '🔧'}
                {tab === 'settings' && '⚙️'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Overview Tab - Business KPIs at a glance */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Business Overview</h2>
                  <p className="text-slate-300 text-sm">Key metrics at a glance</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
              </div>
              
              {/* Primary KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold">{analytics?.totalUsers?.toLocaleString() || '—'}</div>
                  <div className="text-slate-300 text-sm">Total Users</div>
                  {analytics?.newUsersThisWeek ? (
                    <div className="text-green-400 text-xs mt-1">+{analytics.newUsersThisWeek} this week</div>
                  ) : null}
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-400">${revenueMetrics?.totalMRR?.toLocaleString() || '0'}</div>
                  <div className="text-slate-300 text-sm">Monthly Revenue</div>
                  <div className="text-slate-400 text-xs mt-1">${revenueMetrics?.arrProjection?.toLocaleString() || '0'} ARR</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-400">{revenueMetrics?.subscriberCount || 0}</div>
                  <div className="text-slate-300 text-sm">Paid Subscribers</div>
                  <div className="text-slate-400 text-xs mt-1">{revenueMetrics?.byPlan?.monthly || 0} monthly, {revenueMetrics?.byPlan?.annual || 0} annual</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold text-amber-400">{analytics?.activeThisWeek || '—'}</div>
                  <div className="text-slate-300 text-sm">Active This Week</div>
                  <div className="text-slate-400 text-xs mt-1">{analytics?.totalUsers ? ((analytics.activeThisWeek / analytics.totalUsers) * 100).toFixed(0) : '0'}% of users</div>
                </div>
              </div>
            </div>

            {/* Secondary Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Content Health */}
              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  📦 Content Health
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Questions</span>
                    <span className="font-medium text-gray-900 dark:text-white">{allCourseStats.reduce((sum, c) => sum + c.questions, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Lessons</span>
                    <span className="font-medium text-gray-900 dark:text-white">{allCourseStats.reduce((sum, c) => sum + c.lessons, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Flashcards</span>
                    <span className="font-medium text-gray-900 dark:text-white">{allCourseStats.reduce((sum, c) => sum + c.flashcards, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Active Courses</span>
                    <span className="font-medium text-gray-900 dark:text-white">{allCourseStats.length}</span>
                  </div>
                </div>
              </Card>

              {/* User Funnel */}
              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  📈 User Funnel
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Signed Up</span>
                    <span className="font-medium text-gray-900 dark:text-white">{analytics?.totalUsers || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Completed Onboarding</span>
                    <span className="font-medium text-gray-900 dark:text-white">{analytics?.funnel?.returnedAfterSignup || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Started Practice</span>
                    <span className="font-medium text-gray-900 dark:text-white">{analytics?.funnel?.hasExamDate || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Converted to Paid</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{revenueMetrics?.subscriberCount || 0}</span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  ⚡ Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('users')}
                    className="w-full text-left px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm"
                  >
                    👥 View All Users
                  </button>
                  <button
                    onClick={() => setActiveTab('revenue')}
                    className="w-full text-left px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm"
                  >
                    💰 Revenue Details
                  </button>
                  <button
                    onClick={() => setActiveTab('growth')}
                    className="w-full text-left px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm"
                  >
                    🚀 Growth Metrics
                  </button>
                  <a
                    href="https://console.firebase.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm"
                  >
                    🔥 Firebase Console ↗
                  </a>
                </div>
              </Card>
            </div>

            {/* Course Distribution */}
            <Card className="p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🎓 Users by Course</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {Object.entries(analytics?.byCourse || {}).map(([course, count]) => (
                  <div key={course} className="text-center p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{count as number}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 uppercase">{course}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Quick Links to Editors */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/questions"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                ❓ Question Editor
              </Link>
              <Link
                to="/admin/lessons"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                📚 Lesson Editor
              </Link>
              <Link
                to="/admin/tbs"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
              >
                📊 TBS Editor
              </Link>
              <a
                href="https://console.firebase.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
              >
                🔥 Firebase Console ↗
              </a>
            </div>

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
                      <div className="h-6 bg-gray-200 dark:bg-slate-600 rounded w-1/2 mb-4"></div>
                      <div className="h-10 bg-gray-200 dark:bg-slate-600 rounded w-1/3 mb-3"></div>
                      <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded w-full"></div>
                    </Card>
                  ))}
                </>
              ) : (
                allCourseStats.map(course => {
                  const colorClass = course.courseId === 'cpa' ? 'text-blue-600 dark:text-blue-400' :
                                     course.courseId === 'ea' ? 'text-green-600 dark:text-green-400' :
                                     course.courseId === 'cma' ? 'text-purple-600 dark:text-purple-400' :
                                     course.courseId === 'cia' ? 'text-orange-600 dark:text-orange-400' :
                                     course.courseId === 'cisa' ? 'text-teal-600 dark:text-teal-400' :
                                     'text-amber-600 dark:text-amber-400';
                  return (
                    <Card key={course.courseId} className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{getCourseIcon(course.courseId)}</span>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {course.courseName}
                        </h3>
                      </div>
                      <div className={`text-3xl font-bold ${colorClass} mb-3`}>
                        {course.questions.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">questions</span>
                      </div>
                      {/* Content metrics row */}
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
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
                            <div key={section} className="flex justify-between p-2 bg-gray-50 dark:bg-slate-900 rounded">
                              <span className="font-medium truncate">{section}</span>
                              <span className="text-gray-600 dark:text-gray-400">{count}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {course.questions === 0 && (
                        <div className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                          ⚠️ No questions loaded
                        </div>
                      )}
                    </Card>
                  );
                })
              )}
            </div>

            {/* CPA Task-Based Simulations (TBS) Stats */}
            {tbsStats && tbsStats.total > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📊 CPA Task-Based Simulations</h3>
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-bold text-orange-600">
                      {tbsStats.total.toLocaleString()}
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">Total TBS</span>
                  </div>
                  {tbsStats.bySection && Object.keys(tbsStats.bySection).length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-sm">
                      {Object.entries(tbsStats.bySection).map(([section, count]) => (
                        <div key={section} className="flex justify-between p-2 bg-gray-50 dark:bg-slate-900 rounded">
                          <span className="font-medium">{section}</span>
                          <span className="text-gray-600 dark:text-gray-400">{count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* CMA Unique Content: Essays, CBQs, Practice Simulations */}
            {cmaUniqueContent && (cmaUniqueContent.essays > 0 || cmaUniqueContent.cbqs > 0 || cmaUniqueContent.simulations > 0) && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">💼 CMA Unique Content</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Essays */}
                  {cmaUniqueContent.essays > 0 && (
                    <Card className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">✍️</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Essay Scenarios</h4>
                      </div>
                      <div className="text-3xl font-bold text-purple-600 mb-3">
                        {cmaUniqueContent.essays}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">essays</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(cmaUniqueContent.essaysBySection).map(([section, count]) => (
                          <div key={section} className="flex justify-between p-2 bg-gray-50 dark:bg-slate-900 rounded">
                            <span className="font-medium">{section}</span>
                            <span className="text-gray-600 dark:text-gray-400">{count}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                  {/* CBQs */}
                  {cmaUniqueContent.cbqs > 0 && (
                    <Card className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">📋</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Case-Based Questions</h4>
                      </div>
                      <div className="text-3xl font-bold text-indigo-600 mb-3">
                        {cmaUniqueContent.cbqs}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">CBQs</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(cmaUniqueContent.cbqsBySection).map(([section, count]) => (
                          <div key={section} className="flex justify-between p-2 bg-gray-50 dark:bg-slate-900 rounded">
                            <span className="font-medium">{section}</span>
                            <span className="text-gray-600 dark:text-gray-400">{count}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                  {/* Practice Simulations */}
                  {cmaUniqueContent.simulations > 0 && (
                    <Card className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">🧮</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Practice Simulations</h4>
                      </div>
                      <div className="text-3xl font-bold text-cyan-600 mb-3">
                        {cmaUniqueContent.simulations}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">simulations</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(cmaUniqueContent.simulationsBySection).map(([section, count]) => (
                          <div key={section} className="flex justify-between p-2 bg-gray-50 dark:bg-slate-900 rounded">
                            <span className="font-medium">{section}</span>
                            <span className="text-gray-600 dark:text-gray-400">{count}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* CFP Unique Content: Case Studies, Item Sets */}
            {cfpUniqueContent && (cfpUniqueContent.caseStudies > 0 || cfpUniqueContent.itemSets > 0) && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">💰 CFP Unique Content</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Case Studies */}
                  {cfpUniqueContent.caseStudies > 0 && (
                    <Card className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">📑</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Case Studies</h4>
                      </div>
                      <div className="text-3xl font-bold text-amber-600">
                        {cfpUniqueContent.caseStudies}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">comprehensive scenarios</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Multi-part scenarios testing integrated planning skills
                      </p>
                    </Card>
                  )}
                  {/* Item Sets */}
                  {cfpUniqueContent.itemSets > 0 && (
                    <Card className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">📊</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Item Sets</h4>
                      </div>
                      <div className="text-3xl font-bold text-emerald-600">
                        {cfpUniqueContent.itemSets}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">item sets</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Related question clusters for deeper topic coverage
                      </p>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Content Quality Audit */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🔍 Content Quality Audit</h3>
                <button
                  onClick={loadContentAudit}
                  disabled={isLoadingAudit}
                  className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isLoadingAudit ? 'Scanning...' : 'Run Audit'}
                </button>
              </div>
              
              {contentAudit && (
                <>
                  {/* Summary bar */}
                  {(() => {
                    const totalIssues = contentAudit.questionsWithoutExplanation.length + 
                      contentAudit.questionsWithoutBlueprint.length + contentAudit.duplicateIds.length + 
                      contentAudit.shortExplanations.length + contentAudit.wrongOptionCount.length + 
                      contentAudit.missingDifficulty.length + contentAudit.missingSection.length;
                    return (
                      <div className={`p-4 rounded-lg mb-6 flex items-center justify-between ${
                        totalIssues === 0 
                          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                          : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{totalIssues === 0 ? '✅' : '⚠️'}</span>
                          <div>
                            <p className={`font-semibold ${totalIssues === 0 ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'}`}>
                              {totalIssues === 0 ? 'All checks passed!' : `${totalIssues} issue${totalIssues !== 1 ? 's' : ''} found`}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Scanned {contentAudit.totalScanned.toLocaleString()} questions across {Object.keys(contentAudit.difficultyDistribution).length} courses
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap justify-end">
                          {[
                            { label: 'Explanations', count: contentAudit.questionsWithoutExplanation.length },
                            { label: 'Blueprints', count: contentAudit.questionsWithoutBlueprint.length },
                            { label: 'Duplicates', count: contentAudit.duplicateIds.length },
                            { label: 'Short Expl.', count: contentAudit.shortExplanations.length },
                            { label: 'Options', count: contentAudit.wrongOptionCount.length },
                            { label: 'Difficulty', count: contentAudit.missingDifficulty.length },
                            { label: 'Section', count: contentAudit.missingSection.length },
                          ].filter(c => c.count > 0).map(c => (
                            <span key={c.label} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded text-xs font-medium">
                              {c.label}: {c.count}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Missing Explanations */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">❌ Missing Explanations</h4>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          contentAudit.questionsWithoutExplanation.length === 0 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                          {contentAudit.questionsWithoutExplanation.length}
                          {contentAudit.questionsWithoutExplanation.length >= 50 && '+'}
                        </span>
                      </div>
                      {contentAudit.questionsWithoutExplanation.length === 0 ? (
                        <p className="text-green-600 dark:text-green-400 text-sm">✅ All questions have explanations!</p>
                      ) : (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {contentAudit.questionsWithoutExplanation.slice(0, 15).map((q, i) => (
                            <div key={i} className="p-2 bg-red-50 dark:bg-red-900/30 rounded text-sm flex justify-between items-center">
                              <span className="font-mono text-xs truncate flex-1">{q.id.slice(0, 24)}...</span>
                              <span className="text-gray-500 dark:text-gray-400 ml-2">{q.section}</span>
                            </div>
                          ))}
                          {contentAudit.questionsWithoutExplanation.length > 15 && (
                            <p className="text-gray-500 dark:text-gray-400 text-xs text-center">
                              + {contentAudit.questionsWithoutExplanation.length - 15} more
                            </p>
                          )}
                        </div>
                      )}
                    </Card>

                    {/* Missing Blueprint Tags */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">🏷️ Missing Blueprint Tags (CPA)</h4>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          contentAudit.questionsWithoutBlueprint.length === 0 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                        }`}>
                          {contentAudit.questionsWithoutBlueprint.length}
                          {contentAudit.questionsWithoutBlueprint.length >= 50 && '+'}
                        </span>
                      </div>
                      {contentAudit.questionsWithoutBlueprint.length === 0 ? (
                        <p className="text-green-600 dark:text-green-400 text-sm">✅ All CPA questions have blueprint tags!</p>
                      ) : (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {contentAudit.questionsWithoutBlueprint.slice(0, 15).map((q, i) => (
                            <div key={i} className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded text-sm flex justify-between items-center">
                              <span className="font-mono text-xs truncate flex-1">{q.id.slice(0, 24)}...</span>
                              <span className="text-gray-500 dark:text-gray-400 ml-2">{q.section}</span>
                            </div>
                          ))}
                          {contentAudit.questionsWithoutBlueprint.length > 15 && (
                            <p className="text-gray-500 dark:text-gray-400 text-xs text-center">
                              + {contentAudit.questionsWithoutBlueprint.length - 15} more
                            </p>
                          )}
                        </div>
                      )}
                    </Card>

                    {/* Duplicate IDs */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">🔁 Duplicate Question IDs</h4>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          contentAudit.duplicateIds.length === 0 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                          {contentAudit.duplicateIds.length}
                        </span>
                      </div>
                      {contentAudit.duplicateIds.length === 0 ? (
                        <p className="text-green-600 dark:text-green-400 text-sm">✅ All question IDs are unique!</p>
                      ) : (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {contentAudit.duplicateIds.slice(0, 15).map((q, i) => (
                            <div key={i} className="p-2 bg-red-50 dark:bg-red-900/30 rounded text-sm flex justify-between items-center">
                              <span className="font-mono text-xs truncate flex-1">{q.id.slice(0, 24)}</span>
                              <span className="text-gray-500 dark:text-gray-400 ml-2">{q.course} ×{q.count}</span>
                            </div>
                          ))}
                          {contentAudit.duplicateIds.length > 15 && (
                            <p className="text-gray-500 dark:text-gray-400 text-xs text-center">
                              + {contentAudit.duplicateIds.length - 15} more
                            </p>
                          )}
                        </div>
                      )}
                    </Card>

                    {/* Short Explanations */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">📝 Short Explanations (&lt;20 chars)</h4>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          contentAudit.shortExplanations.length === 0 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                        }`}>
                          {contentAudit.shortExplanations.length}
                          {contentAudit.shortExplanations.length >= 50 && '+'}
                        </span>
                      </div>
                      {contentAudit.shortExplanations.length === 0 ? (
                        <p className="text-green-600 dark:text-green-400 text-sm">✅ All explanations are substantive!</p>
                      ) : (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {contentAudit.shortExplanations.slice(0, 15).map((q, i) => (
                            <div key={i} className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded text-sm flex justify-between items-center">
                              <span className="font-mono text-xs truncate flex-1">{q.id.slice(0, 24)}</span>
                              <span className="text-gray-500 dark:text-gray-400 ml-2">{q.section} ({q.length} chars)</span>
                            </div>
                          ))}
                          {contentAudit.shortExplanations.length > 15 && (
                            <p className="text-gray-500 dark:text-gray-400 text-xs text-center">
                              + {contentAudit.shortExplanations.length - 15} more
                            </p>
                          )}
                        </div>
                      )}
                    </Card>

                    {/* Wrong Option Count */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">🔢 Wrong Option Count (≠4)</h4>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          contentAudit.wrongOptionCount.length === 0 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                          {contentAudit.wrongOptionCount.length}
                          {contentAudit.wrongOptionCount.length >= 50 && '+'}
                        </span>
                      </div>
                      {contentAudit.wrongOptionCount.length === 0 ? (
                        <p className="text-green-600 dark:text-green-400 text-sm">✅ All questions have exactly 4 options!</p>
                      ) : (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {contentAudit.wrongOptionCount.slice(0, 15).map((q, i) => (
                            <div key={i} className="p-2 bg-red-50 dark:bg-red-900/30 rounded text-sm flex justify-between items-center">
                              <span className="font-mono text-xs truncate flex-1">{q.id.slice(0, 24)}</span>
                              <span className="text-gray-500 dark:text-gray-400 ml-2">{q.section} ({q.count} opts)</span>
                            </div>
                          ))}
                          {contentAudit.wrongOptionCount.length > 15 && (
                            <p className="text-gray-500 dark:text-gray-400 text-xs text-center">
                              + {contentAudit.wrongOptionCount.length - 15} more
                            </p>
                          )}
                        </div>
                      )}
                    </Card>

                    {/* Missing Difficulty + Missing Section (combined card) */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">⚙️ Missing Metadata</h4>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          contentAudit.missingDifficulty.length + contentAudit.missingSection.length === 0 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                        }`}>
                          {contentAudit.missingDifficulty.length + contentAudit.missingSection.length}
                        </span>
                      </div>
                      {contentAudit.missingDifficulty.length + contentAudit.missingSection.length === 0 ? (
                        <p className="text-green-600 dark:text-green-400 text-sm">✅ All questions have difficulty and section!</p>
                      ) : (
                        <div className="space-y-3">
                          {contentAudit.missingDifficulty.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Missing difficulty ({contentAudit.missingDifficulty.length})</p>
                              <div className="space-y-1 max-h-28 overflow-y-auto">
                                {contentAudit.missingDifficulty.slice(0, 8).map((q, i) => (
                                  <div key={i} className="p-1.5 bg-amber-50 dark:bg-amber-900/30 rounded text-xs flex justify-between">
                                    <span className="font-mono truncate flex-1">{q.id.slice(0, 24)}</span>
                                    <span className="text-gray-500 dark:text-gray-400 ml-2">{q.section}</span>
                                  </div>
                                ))}
                                {contentAudit.missingDifficulty.length > 8 && (
                                  <p className="text-gray-400 text-xs text-center">+ {contentAudit.missingDifficulty.length - 8} more</p>
                                )}
                              </div>
                            </div>
                          )}
                          {contentAudit.missingSection.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Missing section ({contentAudit.missingSection.length})</p>
                              <div className="space-y-1 max-h-28 overflow-y-auto">
                                {contentAudit.missingSection.slice(0, 8).map((q, i) => (
                                  <div key={i} className="p-1.5 bg-amber-50 dark:bg-amber-900/30 rounded text-xs flex justify-between">
                                    <span className="font-mono truncate flex-1">{q.id.slice(0, 24)}</span>
                                    <span className="text-gray-500 dark:text-gray-400 ml-2">{q.course}</span>
                                  </div>
                                ))}
                                {contentAudit.missingSection.length > 8 && (
                                  <p className="text-gray-400 text-xs text-center">+ {contentAudit.missingSection.length - 8} more</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  </div>

                  {/* Difficulty Distribution */}
                  {Object.keys(contentAudit.difficultyDistribution).length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">📊 Difficulty Distribution by Course</h4>
                      <Card className="p-6">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-slate-700">
                                <th className="pb-2 pr-4">Course</th>
                                <th className="pb-2 pr-4 text-right">Easy</th>
                                <th className="pb-2 pr-4 text-right">Medium</th>
                                <th className="pb-2 pr-4 text-right">Hard</th>
                                <th className="pb-2 pr-4 text-right">Other</th>
                                <th className="pb-2 text-right">Total</th>
                                <th className="pb-2 pl-4">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(contentAudit.difficultyDistribution).map(([course, dist]) => {
                                const total = dist.easy + dist.medium + dist.hard + dist.other;
                                const easyPct = total > 0 ? Math.round((dist.easy / total) * 100) : 0;
                                const medPct = total > 0 ? Math.round((dist.medium / total) * 100) : 0;
                                const hardPct = total > 0 ? Math.round((dist.hard / total) * 100) : 0;
                                // Ideal: ~25% easy, ~50% medium, ~25% hard
                                const isBalanced = easyPct >= 15 && easyPct <= 40 && medPct >= 30 && medPct <= 60 && hardPct >= 15 && hardPct <= 40;
                                return (
                                  <tr key={course} className="border-b border-gray-100 dark:border-slate-800">
                                    <td className="py-2 pr-4 font-medium">{course}</td>
                                    <td className="py-2 pr-4 text-right text-green-600 dark:text-green-400">{dist.easy} <span className="text-gray-400 text-xs">({easyPct}%)</span></td>
                                    <td className="py-2 pr-4 text-right text-amber-600 dark:text-amber-400">{dist.medium} <span className="text-gray-400 text-xs">({medPct}%)</span></td>
                                    <td className="py-2 pr-4 text-right text-red-600 dark:text-red-400">{dist.hard} <span className="text-gray-400 text-xs">({hardPct}%)</span></td>
                                    <td className="py-2 pr-4 text-right text-gray-400">{dist.other > 0 ? dist.other : '—'}</td>
                                    <td className="py-2 text-right font-medium">{total.toLocaleString()}</td>
                                    <td className="py-2 pl-4">
                                      {/* Mini bar chart */}
                                      <div className="flex h-3 w-24 rounded overflow-hidden bg-gray-100 dark:bg-slate-700">
                                        <div className="bg-green-400" style={{ width: `${easyPct}%` }} />
                                        <div className="bg-amber-400" style={{ width: `${medPct}%` }} />
                                        <div className="bg-red-400" style={{ width: `${hardPct}%` }} />
                                      </div>
                                      {!isBalanced && dist.other === 0 && (
                                        <span className="text-xs text-amber-500 dark:text-amber-400">⚠️ Skewed</span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-xs text-gray-400 mt-3">Ideal distribution: ~25% Easy / ~50% Medium / ~25% Hard. &quot;Skewed&quot; flag triggers when any level is outside 15–40% (easy/hard) or 30–60% (medium).</p>
                      </Card>
                    </div>
                  )}
                </>
              )}

              {!contentAudit && !isLoadingAudit && (
                <Card className="p-6 text-center text-gray-500 dark:text-gray-400">
                  Click &quot;Run Audit&quot; to scan all questions for quality issues
                </Card>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{usersList.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary-600">{usersList.filter(u => u.isAdmin).length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Admins</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {usersList.filter(u => u.subscription?.tier && ['monthly', 'quarterly', 'annual', 'lifetime'].includes(u.subscription.tier)).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Premium</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {usersList.filter(u => u.subscription?.status === 'trialing').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Trial</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  {usersList.filter(u => !u.subscription?.tier || u.subscription.tier === 'free').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Free</div>
              </Card>
            </div>

            {/* Users by Course Breakdown */}
            {usersList.length > 0 && (
              <Card className="p-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Users by Course</h4>
                <div className="flex flex-wrap gap-3">
                  {getActiveCourses().map(course => {
                    const count = usersList.filter(u => getUserCourse(u) === course.id).length;
                    const colorClass = course.id === 'cpa' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                       course.id === 'ea' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                       course.id === 'cma' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                                       course.id === 'cia' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                                       course.id === 'cisa' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' :
                                       'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300';
                    return (
                      <div key={course.id} className={`px-3 py-2 rounded-lg ${colorClass}`}>
                        <span className="font-bold">{count}</span>
                        <span className="text-sm ml-1">{course.shortName || course.id.toUpperCase()}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* User Lookup Tool */}
            <div className="bg-gradient-to-r from-primary-900/20 to-blue-900/20 dark:from-primary-900/30 dark:to-blue-900/30 rounded-xl p-6 shadow-sm border border-primary-600 dark:border-primary-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                🔍 User Lookup
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  placeholder="Enter email or user ID..."
                  className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400 focus:border-transparent"
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
                <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{lookupResult.email || 'No email'}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{lookupResult.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Course: {getUserCourse(lookupResult).toUpperCase()} • 
                        Section: {lookupResult.examSection || 'Not set'} • 
                        Tier: {lookupResult.subscription?.tier || 'free'} • 
                        Status: {lookupResult.subscription?.status || 'N/A'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadUserActivity(lookupResult)}
                        className="px-3 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200"
                      >
                        View Activity
                      </button>
                      <button
                        onClick={() => toggleAdminStatus(lookupResult.id, !!lookupResult.isAdmin)}
                        className={`px-3 py-1 text-xs rounded ${lookupResult.isAdmin ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'} hover:opacity-80`}
                      >
                        {lookupResult.isAdmin ? 'Remove Admin' : 'Make Admin'}
                      </button>
                      <button
                        onClick={() => setSubscriptionTier(lookupResult.id, lookupResult.subscription?.tier === 'lifetime' ? 'free' : 'lifetime')}
                        className={`px-3 py-1 text-xs rounded ${lookupResult.subscription?.tier === 'lifetime' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'} hover:opacity-80`}
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
                <div className="flex flex-wrap gap-3 items-center">
                  {/* Search */}
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users..."
                    className="px-3 py-1.5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {/* Filter */}
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value as typeof userFilter)}
                    className="px-3 py-1.5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
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
                    className="px-3 py-1.5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Courses</option>
                    {getActiveCourses().map(course => (
                      <option key={course.id} value={course.id}>
                        {course.shortName || course.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredUsers.length} of {usersList.length}
                  </span>
                  <button
                    onClick={loadUsers}
                    className="text-sm px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 transition-colors"
                  >
                    Refresh
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm('Sync missing emails from Firebase Auth to Firestore? This will update users who signed up with Google but have blank emails in the database.')) return;
                      setIsSyncingEmails(true);
                      setEmailSyncResult(null);
                      try {
                        const syncEmails = httpsCallable(functions, 'adminSyncUserEmails');
                        const result = await syncEmails({});
                        const data = result.data as { updated: number; total: number; alreadyHasEmail: number };
                        setEmailSyncResult({ updated: data.updated, total: data.total });
                        addLog(`Email sync complete: ${data.updated} updated, ${data.alreadyHasEmail} already had emails`, 'success');
                        loadUsers(); // Refresh the list
                      } catch (err) {
                        addLog(`Email sync failed: ${(err as Error).message}`, 'error');
                      } finally {
                        setIsSyncingEmails(false);
                      }
                    }}
                    disabled={isSyncingEmails}
                    className="text-sm px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded hover:bg-purple-100 transition-colors disabled:opacity-50"
                    title="Sync missing emails from Firebase Auth (for Google sign-in users)"
                  >
                    {isSyncingEmails ? '⏳ Syncing...' : '🔄 Sync Emails'}
                  </button>
                  {emailSyncResult && (
                    <span className="text-sm text-green-600 dark:text-green-400">
                      ✓ {emailSyncResult.updated} emails synced
                    </span>
                  )}
                  <button
                    onClick={async () => {
                      setIsScanningOrphaned(true);
                      setOrphanedUsersResult(null);
                      try {
                        const findOrphaned = httpsCallable(functions, 'findOrphanedUsers');
                        const result = await findOrphaned({ fix: false });
                        setOrphanedUsersResult(result.data as typeof orphanedUsersResult);
                        addLog(`Found ${(result.data as { orphaned: number }).orphaned} orphaned users`, 'info');
                      } catch (err) {
                        addLog(`Scan failed: ${(err as Error).message}`, 'error');
                      } finally {
                        setIsScanningOrphaned(false);
                      }
                    }}
                    disabled={isScanningOrphaned || isFixingOrphaned}
                    className="text-sm px-3 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded hover:bg-orange-100 transition-colors disabled:opacity-50"
                    title="Find users with Auth but no Firestore document"
                  >
                    {isScanningOrphaned ? '⏳ Scanning...' : '🔍 Find Orphaned'}
                  </button>
                  {orphanedUsersResult && orphanedUsersResult.orphaned > 0 && (
                    <button
                      onClick={async () => {
                        if (!confirm(`Fix ${orphanedUsersResult.orphaned} orphaned users by creating their Firestore documents?`)) return;
                        setIsFixingOrphaned(true);
                        try {
                          const findOrphaned = httpsCallable(functions, 'findOrphanedUsers');
                          const result = await findOrphaned({ fix: true });
                          setOrphanedUsersResult(result.data as typeof orphanedUsersResult);
                          addLog(`Fixed ${(result.data as { fixed: number }).fixed} orphaned users`, 'success');
                          loadUsers();
                        } catch (err) {
                          addLog(`Fix failed: ${(err as Error).message}`, 'error');
                        } finally {
                          setIsFixingOrphaned(false);
                        }
                      }}
                      disabled={isFixingOrphaned}
                      className="text-sm px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded hover:bg-green-100 transition-colors disabled:opacity-50"
                    >
                      {isFixingOrphaned ? '⏳ Fixing...' : `🔧 Fix ${orphanedUsersResult.orphaned}`}
                    </button>
                  )}
                  {orphanedUsersResult && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {orphanedUsersResult.orphaned === 0 
                        ? `✅ No orphaned | Auth: ${orphanedUsersResult.total} | Firestore: ${orphanedUsersResult.firestoreTotal || '?'} | Deleted: ${orphanedUsersResult.softDeleted || 0}` 
                        : `⚠️ ${orphanedUsersResult.orphaned} orphaned (${orphanedUsersResult.fixed} fixed) | Deleted: ${orphanedUsersResult.softDeleted || 0}`}
                    </span>
                  )}
                  {selectedUserIds.size > 0 && (
                    <button
                      onClick={() => setShowEmailModal(true)}
                      className="text-sm px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded hover:bg-green-100 transition-colors flex items-center gap-1"
                    >
                      ✉️ Email Selected ({selectedUserIds.size})
                    </button>
                  )}
                </div>
              </div>
            
              {isLoadingUsers ? (
                 <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                        <th className="p-3 w-10">
                          <input
                            type="checkbox"
                            checked={filteredUsers.length > 0 && filteredUsers.slice((usersPage - 1) * usersPerPage, usersPage * usersPerPage).every(u => selectedUserIds.has(u.id))}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUserIds(new Set(filteredUsers.slice((usersPage - 1) * usersPerPage, usersPage * usersPerPage).map(u => u.id)));
                              } else {
                                setSelectedUserIds(new Set());
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            title="Select all on this page"
                          />
                        </th>
                        {[
                          { key: 'email', label: 'Email' },
                          { key: 'course', label: 'Course' },
                          { key: 'section', label: 'Section' },
                          { key: 'subscription', label: 'Subscription' },
                          { key: 'trials', label: 'Trials' },
                          { key: 'role', label: 'Role' },
                          { key: 'joined', label: 'Joined' },
                        ].map(col => (
                          <th
                            key={col.key}
                            className="p-3 font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 select-none"
                            onClick={() => {
                              const colKey = col.key as typeof userSortColumn;
                              if (userSortColumn === colKey) {
                                setUserSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                              } else {
                                setUserSortColumn(colKey);
                                setUserSortDirection('asc');
                              }
                            }}
                          >
                            <span className="flex items-center gap-1">
                              {col.label}
                              {userSortColumn === col.key && (
                                <span className="text-blue-500">
                                  {userSortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                              )}
                            </span>
                          </th>
                        ))}
                        <th className="p-3 font-medium text-gray-600 dark:text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="p-4 text-center text-gray-600 dark:text-gray-400">
                            {usersError ? (
                              <div className="inline-flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                                <span className="text-red-500">⚠</span>
                                <span>{usersError}</span>
                              </div>
                            ) : userSearch || userFilter !== 'all' ? 'No users match your criteria.' : 'No users found.'}
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.slice((usersPage - 1) * usersPerPage, usersPage * usersPerPage).map((u) => (
                          <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-slate-700 dark:bg-slate-900">
                            <td className="p-3">
                              <input
                                type="checkbox"
                                checked={selectedUserIds.has(u.id)}
                                onChange={(e) => {
                                  const newSet = new Set(selectedUserIds);
                                  if (e.target.checked) {
                                    newSet.add(u.id);
                                  } else {
                                    newSet.delete(u.id);
                                  }
                                  setSelectedUserIds(newSet);
                                }}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </td>
                            <td className="p-3">
                              <div className="font-medium text-sm">{u.email || '—'}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400 font-mono">{u.id.slice(0, 12)}...</div>
                            </td>
                            <td className="p-3">
                              {(() => {
                                const derivedCourse = getUserCourse(u);
                                return (
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    derivedCourse === 'cpa' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                    derivedCourse === 'ea' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                    derivedCourse === 'cma' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                                    derivedCourse === 'cia' ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                                    derivedCourse === 'cisa' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' :
                                    'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                  }`}>
                                    {derivedCourse.toUpperCase()}
                                  </span>
                                );
                              })()}
                            </td>
                            <td className="p-3">
                              <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                                {u.examSection || 'N/A'}
                              </span>
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  u.subscription?.tier === 'lifetime' ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800' :
                                  u.subscription?.tier === 'annual' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                  u.subscription?.tier === 'quarterly' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                  u.subscription?.tier === 'monthly' ? 'bg-primary-100 text-primary-700' :
                                  u.subscription?.status === 'trialing' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                                  'bg-gray-100 dark:bg-slate-700 text-gray-600'
                                }`}
                              >
                                {u.subscription?.tier || 'free'}
                                {u.subscription?.status === 'trialing' && ' (trial)'}
                              </span>
                            </td>
                            <td className="p-3">
                              {(() => {
                                const trials = u._trials;
                                const legacyTrialEnd = u.subscription?.trialEnd;
                                const isEditing = editingTrialUserId === u.id;
                                const allExams = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];

                                // Editing mode: show per-exam date inputs
                                if (isEditing) {
                                  return (
                                    <div className="flex flex-col gap-1.5 min-w-[200px]">
                                      {allExams.map(examId => {
                                        const trial = trials?.[examId];
                                        const endSec = trial?.endDate?.seconds;
                                        const currentVal = endSec
                                          ? new Date(endSec * 1000).toISOString().split('T')[0]
                                          : '';
                                        return (
                                          <div key={examId} className="flex items-center gap-1">
                                            <span className="text-[10px] font-bold w-8 text-gray-500 uppercase">{examId}</span>
                                            <input
                                              type="date"
                                              defaultValue={currentVal}
                                              placeholder="No trial"
                                              className="px-1 py-0.5 text-[11px] border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-white w-[120px]"
                                              id={`trial-${u.id}-${examId}`}
                                            />
                                            <button
                                              onClick={() => {
                                                const input = document.getElementById(`trial-${u.id}-${examId}`) as HTMLInputElement;
                                                if (input?.value) {
                                                  const newDate = new Date(input.value + 'T23:59:59');
                                                  if (!isNaN(newDate.getTime())) {
                                                    setTrialEndDate(u.id, newDate, examId);
                                                  }
                                                }
                                              }}
                                              className="px-1.5 py-0.5 text-[9px] bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                              Set
                                            </button>
                                          </div>
                                        );
                                      })}
                                      <button
                                        onClick={() => setEditingTrialUserId(null)}
                                        className="px-2 py-0.5 text-[10px] bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 self-start mt-1"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  );
                                }

                                // Display mode: show active trials as compact badges
                                const now = new Date();
                                const activeTrials: { examId: string; endDate: Date; daysLeft: number }[] = [];
                                const expiredTrials: string[] = [];

                                if (trials) {
                                  for (const [examId, trial] of Object.entries(trials)) {
                                    // Skip exams that have an active paid subscription
                                    const paidExam = u._paidExams?.[examId];
                                    if (paidExam?.status === 'active' || paidExam?.status === 'paid') {
                                      continue;
                                    }
                                    if (trial?.endDate?.seconds) {
                                      const endDate = new Date(trial.endDate.seconds * 1000);
                                      const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                                      if (daysLeft > 0) {
                                        activeTrials.push({ examId, endDate, daysLeft });
                                      } else {
                                        expiredTrials.push(examId);
                                      }
                                    }
                                  }
                                } else if (legacyTrialEnd?.seconds) {
                                  // Legacy: show single trial
                                  const endDate = new Date(legacyTrialEnd.seconds * 1000);
                                  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                                  const examId = getUserCourse(u);
                                  if (daysLeft > 0) {
                                    activeTrials.push({ examId, endDate, daysLeft });
                                  } else {
                                    expiredTrials.push(examId);
                                  }
                                }

                                if (activeTrials.length === 0 && expiredTrials.length === 0) {
                                  return (
                                    <button
                                      onClick={() => setEditingTrialUserId(u.id)}
                                      className="text-xs text-gray-400 hover:text-blue-500 hover:underline cursor-pointer"
                                      title="Click to manage per-exam trials"
                                    >
                                      No trials
                                    </button>
                                  );
                                }

                                return (
                                  <button
                                    onClick={() => setEditingTrialUserId(u.id)}
                                    className="text-left hover:opacity-80 cursor-pointer group"
                                    title="Click to manage per-exam trials"
                                  >
                                    <div className="flex flex-wrap gap-1">
                                      {activeTrials.map(t => (
                                        <span key={t.examId} className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                                          t.daysLeft <= 3
                                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                        }`}>
                                          {t.examId.toUpperCase()} {t.daysLeft}d
                                        </span>
                                      ))}
                                      {expiredTrials.map(examId => (
                                        <span key={examId} className="inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                          {examId.toUpperCase()} exp
                                        </span>
                                      ))}
                                    </div>
                                  </button>
                                );
                              })()}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  u.isAdmin
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600'
                                }`}
                              >
                                {u.isAdmin ? 'Admin' : 'User'}
                              </span>
                            </td>
                             <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                              {u.createdAt && typeof u.createdAt === 'object' && 'seconds' in u.createdAt
                                ? new Date((u.createdAt as { seconds: number }).seconds * 1000).toLocaleDateString()
                                : '—'}
                            </td>
                            <td className="p-3">
                              <div className="flex gap-1 flex-wrap">
                                <button
                                  onClick={() => loadUserActivity(u)}
                                  className="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100"
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
                                  className="px-2 py-1 text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded hover:bg-amber-100"
                                  title={u.subscription?.tier === 'lifetime' ? 'Revoke premium' : 'Grant lifetime'}
                                >
                                  {u.subscription?.tier === 'lifetime' ? '⬇️' : '⬆️'}
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmUserId(u.id)}
                                  className="px-2 py-1 text-xs bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-100"
                                  title="Delete user"
                                >
                                  🗑️
                                </button>

                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  {filteredUsers.length > usersPerPage && (
                    <div className="flex items-center justify-center gap-4 mt-4 py-2">
                      <button
                        onClick={() => setUsersPage(p => Math.max(1, p - 1))}
                        disabled={usersPage === 1}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-slate-700 rounded disabled:opacity-40"
                      >
                        ← Previous
                      </button>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Page {usersPage} of {Math.ceil(filteredUsers.length / usersPerPage)} ({filteredUsers.length} users)
                      </span>
                      <button
                        onClick={() => setUsersPage(p => Math.min(Math.ceil(filteredUsers.length / usersPerPage), p + 1))}
                        disabled={usersPage >= Math.ceil(filteredUsers.length / usersPerPage)}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-slate-700 rounded disabled:opacity-40"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Card>
            
            {/* Delete User Confirmation Modal */}
            {deleteConfirmUserId && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6">
                  <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">⚠️ Delete User</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    This will soft-delete the user <strong>{usersList.find(u => u.id === deleteConfirmUserId)?.email || deleteConfirmUserId}</strong>.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    The user's data will be marked as deleted but retained for audit purposes.
                  </p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type <span className="font-mono bg-red-100 dark:bg-red-900/30 px-1 rounded text-red-600">DELETE</span> to confirm:
                  </p>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="Type DELETE"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg mb-4 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  />
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => {
                        setDeleteConfirmUserId(null);
                        setDeleteConfirmText('');
                      }}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        if (deleteConfirmText !== 'DELETE') return;
                        setIsDeleting(true);
                        try {
                          const userRef = doc(db, 'users', deleteConfirmUserId);
                          await updateDoc(userRef, {
                            deletedAt: serverTimestamp(),
                            deletedBy: user?.uid,
                          });
                          setUsersList(prev => prev.filter(u => u.id !== deleteConfirmUserId));
                          setDeleteConfirmUserId(null);
                          setDeleteConfirmText('');
                          alert('User deleted successfully');
                        } catch (err) {
                          logger.error('Delete error:', err);
                          alert('Failed to delete user');
                        } finally {
                          setIsDeleting(false);
                        }
                      }}
                      disabled={deleteConfirmText !== 'DELETE' || isDeleting}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        deleteConfirmText === 'DELETE' && !isDeleting
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete User'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Email Compose Modal */}
            {showEmailModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">✉️ Send Email to {selectedUserIds.size} Users</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                      <input
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="Email subject..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                      <textarea
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        placeholder="Write your message here...&#10;&#10;Available variables: {{name}}, {{email}}"
                        rows={8}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white resize-none"
                      />
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <strong>Recipients:</strong> {Array.from(selectedUserIds).slice(0, 5).map(id => usersList.find(u => u.id === id)?.email || id).join(', ')}
                      {selectedUserIds.size > 5 && ` and ${selectedUserIds.size - 5} more...`}
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end mt-6">
                    <button
                      onClick={() => {
                        setShowEmailModal(false);
                        setEmailSubject('');
                        setEmailBody('');
                      }}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        if (!emailSubject.trim() || !emailBody.trim()) {
                          alert('Please enter a subject and message');
                          return;
                        }
                        setIsSendingEmail(true);
                        try {
                          const recipients = Array.from(selectedUserIds).map(id => {
                            const u = usersList.find(user => user.id === id);
                            return { uid: id, email: u?.email || '', name: u?.displayName || u?.email?.split('@')[0] || 'User' };
                          }).filter(r => r.email);
                          
                          const sendAdminEmail = httpsCallable(functions, 'adminSendBulkEmail');
                          await sendAdminEmail({
                            subject: emailSubject,
                            body: emailBody,
                            recipients,
                          });
                          
                          alert(`Email sent to ${recipients.length} users!`);
                          setShowEmailModal(false);
                          setEmailSubject('');
                          setEmailBody('');
                          setSelectedUserIds(new Set());
                          loadEmailHistory(); // Refresh email history
                        } catch (err) {
                          logger.error('Email error:', err);
                          alert('Failed to send email: ' + (err instanceof Error ? err.message : 'Unknown error'));
                        } finally {
                          setIsSendingEmail(false);
                        }
                      }}
                      disabled={!emailSubject.trim() || !emailBody.trim() || isSendingEmail}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        emailSubject.trim() && emailBody.trim() && !isSendingEmail
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isSendingEmail ? 'Sending...' : `Send to ${selectedUserIds.size} Users`}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Email History Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📧 Email History</h3>
                <button
                  onClick={loadEmailHistory}
                  disabled={isLoadingEmailHistory}
                  className="text-sm px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 transition-colors disabled:opacity-50"
                >
                  {isLoadingEmailHistory ? 'Loading...' : 'Refresh'}
                </button>
              </div>
              <div className="p-4">
                {isLoadingEmailHistory ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Loading email history...</p>
                  </div>
                ) : emailHistory.length === 0 ? (
                  <p className="text-center py-8 text-gray-500 dark:text-gray-400">No emails sent yet.</p>
                ) : (
                  <div className="space-y-3">
                    {emailHistory.map((email) => {
                      const sentDate = email.sentAt 
                        ? new Date(email.sentAt.seconds * 1000).toLocaleString()
                        : 'Unknown';
                      const isExpanded = expandedEmailId === email.id;
                      
                      return (
                        <div key={email.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setExpandedEmailId(isExpanded ? null : email.id)}
                            className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white truncate">{email.subject}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {sentDate} • {email.sentCount} sent{email.failedCount > 0 && `, ${email.failedCount} failed`}
                                </p>
                              </div>
                              <span className="text-gray-400 ml-2">{isExpanded ? '▼' : '▶'}</span>
                            </div>
                          </button>
                          {isExpanded && (
                            <div className="p-3 pt-0 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-slate-800/50">
                              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">Sent by:</span>
                                  <span className="ml-2 text-gray-900 dark:text-white">{email.sentBy}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">Recipients:</span>
                                  <span className="ml-2 text-gray-900 dark:text-white">{email.recipientCount}</span>
                                </div>
                              </div>
                              <div className="mb-3">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Message Template</p>
                                <div className="bg-white dark:bg-slate-900 p-3 rounded border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap max-h-40 overflow-y-auto">
                                  {email.body}
                                </div>
                              </div>
                              {email.recipients && email.recipients.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Recipients ({email.recipients.length})</p>
                                  <div className="bg-white dark:bg-slate-900 p-2 rounded border border-gray-200 dark:border-gray-600 text-sm max-h-32 overflow-y-auto">
                                    <div className="flex flex-wrap gap-2">
                                      {email.recipients.slice(0, 20).map((r, i) => (
                                        <span key={i} className="inline-flex items-center px-2 py-1 rounded bg-gray-100 dark:bg-slate-700 text-xs text-gray-700 dark:text-gray-300">
                                          {r.email}
                                        </span>
                                      ))}
                                      {email.recipients.length > 20 && (
                                        <span className="inline-flex items-center px-2 py-1 text-xs text-gray-500">
                                          +{email.recipients.length - 20} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab - Deep User Funnel Analysis */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">📈 Analytics & Engagement</h2>
                  <p className="text-purple-100">Deep user funnel analysis, engagement metrics, and quality reports</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/admin/analytics"
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                  >
                    🎯 Session Tracking
                    <span className="px-1.5 py-0.5 text-xs bg-white/20 rounded">LIVE</span>
                  </Link>
                  <button
                    onClick={loadAnalytics}
                    disabled={isLoadingAnalytics}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
                  >
                    {isLoadingAnalytics ? 'Loading...' : '🔄 Refresh'}
                  </button>
                </div>
              </div>
            </div>

            {isLoadingAnalytics ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">Calculating analytics...</p>
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

                {/* User Activation Funnel */}
                <Card className="p-6 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 border-rose-200 dark:border-rose-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    🚦 User Activation Funnel
                    <span className="text-xs bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded">
                      Last {analytics.funnel.recentSignups.length} signups
                    </span>
                  </h4>
                  
                  {(() => {
                    const s = analytics.funnel.recentSignups;
                    const n = s.length || 1;
                    const usedMCQs = s.filter(u => u.mcqsAnswered > 0).length;
                    const usedLessons = s.filter(u => u.lessonsCompleted > 0).length;
                    const usedFlash = s.filter(u => u.flashcardsUsed > 0).length;
                    const usedSims = s.filter(u => u.simulationsCompleted > 0).length;
                    const anyEngagement = s.filter(u => u.mcqsAnswered > 0 || u.lessonsCompleted > 0 || u.flashcardsUsed > 0 || u.simulationsCompleted > 0).length;
                    const cameBack = s.filter(u => u.lastActiveAt && u.signedUpAt && u.lastActiveAt.getTime() > u.signedUpAt.getTime() + 60000).length;

                    const steps = [
                      { label: 'Signed Up', count: n, color: 'bg-blue-500' },
                      { label: 'Any Engagement', count: anyEngagement, color: 'bg-emerald-500' },
                      { label: 'Started Lessons', count: usedLessons, color: 'bg-green-500' },
                      { label: 'Practiced MCQs', count: usedMCQs, color: 'bg-purple-500' },
                      { label: 'Used Flashcards', count: usedFlash, color: 'bg-amber-500' },
                      { label: 'Tried Simulations', count: usedSims, color: 'bg-cyan-500' },
                      { label: 'Came Back', count: cameBack, color: 'bg-indigo-500' },
                    ];

                    return (
                      <div className="space-y-3">
                        {steps.map((step, i) => {
                          const percent = Math.round((step.count / n) * 100);
                          const isLowEngagement = i > 0 && percent < 20;
                          return (
                            <div key={step.label}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700 dark:text-gray-300">{step.label}</span>
                                <span className="text-gray-600 dark:text-gray-400">
                                  {step.count}/{n} ({percent}%)
                                  {isLowEngagement && <span className="ml-2 text-amber-600 font-medium">⚠️ low</span>}
                                </span>
                              </div>
                              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full ${step.color} transition-all duration-500`} style={{ width: `${percent}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </Card>

                {/* Recent Signups Table */}
                <Card className="p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">📋 Recent Signups — Journey Tracker</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 dark:bg-slate-700">
                        <tr>
                          <th className="p-2 text-left">Email</th>
                          <th className="p-2 text-center">Course</th>
                          <th className="p-2 text-center">Days</th>
                          <th className="p-2 text-center">MCQs</th>
                          <th className="p-2 text-center">Lessons</th>
                          <th className="p-2 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.funnel.recentSignups.slice(0, 15).map((user) => {
                          const totalActivity = user.mcqsAnswered + user.lessonsCompleted + user.flashcardsUsed;
                          let status: string;
                          let statusColor: string;
                          // Use lastActiveAt OR signedUpAt to catch users who just signed up but have no lastLogin set yet
                          const lastActivity = user.lastActiveAt || user.signedUpAt;
                          
                          if (totalActivity > 0 && lastActivity && (Date.now() - lastActivity.getTime()) < 7 * 86400000) {
                            status = '✅ Active';
                            statusColor = 'text-green-600';
                          } else if (totalActivity > 0) {
                            status = '😴 Lapsed';
                            statusColor = 'text-amber-600';
                          } else if (user.daysSinceSignup > 1) {
                            status = '❌ Bounced';
                            statusColor = 'text-red-600';
                          } else {
                            status = '🆕 New';
                            statusColor = 'text-blue-500';
                          }
                          return (
                            <tr key={user.uid} className="border-t border-gray-200 dark:border-slate-700">
                              <td className="p-2 font-medium truncate max-w-[180px]">{user.email}</td>
                              <td className="p-2 text-center">
                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-slate-700">{user.courseId.toUpperCase()}</span>
                              </td>
                              <td className="p-2 text-center text-gray-600 dark:text-gray-400 text-xs">
                                {user.daysSinceSignup === 0 ? 'Today' : `${user.daysSinceSignup}d`}
                              </td>
                              <td className="p-2 text-center text-xs">{user.mcqsAnswered > 0 ? <span className="text-green-700 font-medium">{user.mcqsAnswered}</span> : <span className="text-gray-300">0</span>}</td>
                              <td className="p-2 text-center text-xs">{user.lessonsCompleted > 0 ? <span className="text-green-700 font-medium">{user.lessonsCompleted}</span> : <span className="text-gray-300">0</span>}</td>
                              <td className={`p-2 text-center text-xs font-medium ${statusColor}`}>{status}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Engagement Stats */}
                {engagementStats && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">🏆 Most Active Users</h4>
                      <div className="space-y-2">
                        {engagementStats.mostActive.slice(0, 5).map((user, i) => (
                          <div key={i} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-slate-900 rounded text-sm">
                            <span className="font-medium truncate flex-1">{user.email}</span>
                            <span className="text-green-600 dark:text-green-400 font-semibold ml-2">{user.questionsAnswered} Q</span>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">😴 Inactive Users</h4>
                      <div className="space-y-2">
                        {engagementStats.inactive.slice(0, 5).map((user, i) => (
                          <div key={i} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-slate-900 rounded text-sm">
                            <span className="font-medium truncate flex-1">{user.email}</span>
                            <span className="text-amber-600 dark:text-amber-400 font-semibold ml-2">{user.daysSinceActive}d</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                )}

                {/* Quality Metrics */}
                {qualityMetrics && qualityMetrics.mostReported.length > 0 && (
                  <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      ⚠️ Question Quality Issues
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded">
                        {qualityMetrics.pendingCount} pending
                      </span>
                    </h4>
                    <div className="space-y-2">
                      {qualityMetrics.mostReported.slice(0, 5).map((q, i) => (
                        <div key={i} className="p-2 bg-gray-50 dark:bg-slate-900 rounded text-sm">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-xs truncate flex-1">{q.questionId.slice(0, 25)}...</span>
                            <span className="text-red-600 dark:text-red-400 font-semibold ml-2">{q.reportCount}x</span>
                          </div>
                          <div className="flex gap-1 mt-1">
                            {q.types.map(type => (
                              <span key={type} className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">
                                {type.replace(/_/g, ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                Click Refresh to load analytics data
              </div>
            )}
          </div>
        )}

        {/* Marketing Tab - Google-style organized layout */}
        {activeTab === 'growth' && (
          <div className="space-y-8">
            {/* ============================================================
                SECTION 1: Header with Actions
            ============================================================ */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Marketing</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Track acquisition, engagement, and growth
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={loadGrowthMetrics}
                  disabled={isLoadingGrowth}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  {isLoadingGrowth ? 'Loading...' : 'Refresh'}
                </button>
              </div>
            </div>

            {/* ============================================================
                SECTION 2: Key Metrics (Most Important Data First)
            ============================================================ */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Key Metrics
              </h3>
              {isLoadingGrowth ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                </div>
              ) : growthMetrics ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Users</div>
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                      {growthMetrics.totalUsers.toLocaleString()}
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">This Month</div>
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                      {growthMetrics.thisMonthSignups}
                    </div>
                    {growthMetrics.lastMonthSignups > 0 && (
                      <div className={`text-xs mt-1 ${growthMetrics.thisMonthSignups >= growthMetrics.lastMonthSignups ? 'text-green-600' : 'text-red-600'}`}>
                        {growthMetrics.thisMonthSignups >= growthMetrics.lastMonthSignups ? '↑' : '↓'} vs {growthMetrics.lastMonthSignups} last month
                      </div>
                    )}
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</div>
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                      {growthMetrics.conversionRate.toFixed(1)}%
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Leads</div>
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                      {growthMetrics.totalLeads}
                    </div>
                    {growthMetrics.leadsThisWeek > 0 && (
                      <div className="text-xs text-green-600 mt-1">+{growthMetrics.leadsThisWeek} this week</div>
                    )}
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                  Click Refresh to load metrics
                </div>
              )}
            </div>

            {/* ============================================================
                SECTION 3: Acquisition (SEO/SEM Engine)
            ============================================================ */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Acquisition
              </h3>
              <Card className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">SEO/SEM Engine</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        Keyword tracking, content briefs, paid search, and technical SEO
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>4,988 keywords</span>
                        <span>181 content briefs</span>
                        <span>Google Ads campaigns</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/admin/growth"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
                  >
                    Open
                  </Link>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">External:</span>
                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Search Console
                  </a>
                  <span className="text-gray-300 dark:text-gray-600">·</span>
                  <a
                    href="https://ads.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Google Ads
                  </a>
                  <span className="text-gray-300 dark:text-gray-600">·</span>
                  <a
                    href="https://analytics.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    GA4
                  </a>
                </div>
              </Card>
            </div>

            {/* ============================================================
                SECTION 3.5: Social Content
            ============================================================ */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Social Content
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* LinkedIn Posts */}
                <Card className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xl">💼</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">LinkedIn Posts</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                          Story-style posts for engagement (not promotional)
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>Auto-posts Mon/Wed/Fri 9 AM</span>
                          <span>Requires approval</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/admin/linkedin"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
                    >
                      Manage
                    </Link>
                  </div>
                </Card>

                {/* Blog Articles */}
                <Card className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xl">📝</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Blog Articles</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                          SEO content for organic traffic
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>181 articles</span>
                          <span>AI-generated, human-reviewed</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/admin/articles"
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
                    >
                      Review
                    </Link>
                  </div>
                </Card>
              </div>
            </div>

            {/* ============================================================
                SECTION 4: Engagement & Social Proof
            ============================================================ */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Engagement
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Referrals */}
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <span className="text-lg">🎁</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Referrals</div>
                        <div className="text-xl font-semibold text-gray-900 dark:text-white">
                          {growthMetrics?.totalReferrals ?? 0}
                        </div>
                      </div>
                    </div>
                    {growthMetrics?.pendingReferralRewards && growthMetrics.pendingReferralRewards > 0 && (
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded">
                        {growthMetrics.pendingReferralRewards} pending
                      </span>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Rewards: 5 refs = 1 mo · 10 = 3 mo · 25 = lifetime
                    </div>
                  </div>
                </Card>

                {/* Testimonials */}
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <span className="text-lg">⭐</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Testimonials</div>
                        <div className="text-xl font-semibold text-gray-900 dark:text-white">
                          {growthMetrics?.totalTestimonials ?? 0}
                        </div>
                      </div>
                    </div>
                    {growthMetrics?.pendingTestimonials && growthMetrics.pendingTestimonials > 0 && (
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded">
                        {growthMetrics.pendingTestimonials} pending
                      </span>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Auto-prompt after exam pass or 7-day streak
                    </div>
                  </div>
                </Card>

                {/* Lead Magnets */}
                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <span className="text-lg">🧲</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Lead Magnets</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Diagnostic Quizzes</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-700/50 rounded px-2 py-1.5">
                      <code className="text-xs text-gray-700 dark:text-gray-300">/diagnostic/cpa-far</code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(`${window.location.origin}/diagnostic/cpa-far`)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-700/50 rounded px-2 py-1.5">
                      <code className="text-xs text-gray-700 dark:text-gray-300">/diagnostic/ea-see1</code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(`${window.location.origin}/diagnostic/ea-see1`)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* ============================================================
                SECTION 5: Growth Playbook (Resources)
            ============================================================ */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Growth Playbook
              </h3>
              <Card className="p-5">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Diagnostic Quizzes</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Free quizzes capture leads</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Testimonial Harvesting</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Auto-prompt on milestones</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Social Score Sharing</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Share on Twitter/LinkedIn</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Referral Program</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Tiered subscription rewards</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Revenue Tab - Subscriptions & MRR */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            {/* Revenue Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Revenue & Subscriptions</h2>
                  <p className="text-emerald-100 text-sm">Monthly recurring revenue and subscriber metrics</p>
                </div>
                <button
                  onClick={() => { loadUsers(); }}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors"
                >
                  🔄 Refresh
                </button>
              </div>
              
              {/* Revenue KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold">${revenueMetrics?.totalMRR?.toLocaleString() || '0'}</div>
                  <div className="text-emerald-100 text-sm">Monthly Recurring Revenue</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold">${revenueMetrics?.arrProjection?.toLocaleString() || '0'}</div>
                  <div className="text-emerald-100 text-sm">Annual Run Rate</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold">${revenueMetrics?.arpu?.toFixed(0) || '0'}</div>
                  <div className="text-emerald-100 text-sm">Avg. Revenue Per User</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold">{revenueMetrics?.churnRisk || 0}</div>
                  <div className="text-emerald-100 text-sm">At-Risk Subscribers</div>
                </div>
              </div>
            </div>

            {/* Subscription Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📊 Subscription Tiers</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Free Users</span>
                    <span className="font-bold text-gray-900 dark:text-white">{(analytics?.totalUsers || 0) - (revenueMetrics?.subscriberCount || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <span className="text-blue-700 dark:text-blue-300">Monthly ($29/mo)</span>
                    <span className="font-bold text-blue-900 dark:text-blue-100">{revenueMetrics?.byPlan?.monthly || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                    <span className="text-amber-700 dark:text-amber-300">Annual ($199/yr)</span>
                    <span className="font-bold text-amber-900 dark:text-amber-100">{revenueMetrics?.byPlan?.annual || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                    <span className="text-emerald-700 dark:text-emerald-300">Founder Pricing</span>
                    <span className="font-bold text-emerald-900 dark:text-emerald-100">{revenueMetrics?.founderCount || 0}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📈 Conversion & Status</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Paid Conversion Rate</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {analytics?.totalUsers ? ((revenueMetrics?.subscriberCount || 0) / analytics.totalUsers * 100).toFixed(1) : '0'}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all" 
                        style={{ width: `${Math.min(analytics?.totalUsers ? (revenueMetrics?.subscriberCount || 0) / analytics.totalUsers * 100 : 0, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t dark:border-slate-700">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {revenueMetrics?.subscriberCount || 0}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Paid</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{revenueMetrics?.churnRisk || 0}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">At-Risk Trials</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Revenue by Course */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🎓 Revenue by Course</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {Object.entries(revenueMetrics?.byCourse || {}).map(([course, data]) => (
                  <div key={course} className="text-center p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{(data as { count: number; revenue: number }).count}</div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400">${(data as { count: number; revenue: number }).revenue}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 uppercase mt-1">{course}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Stripe Link */}
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">💳 Stripe Dashboard</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">View detailed payment data, disputes, and payouts</p>
                </div>
                <a
                  href="https://dashboard.stripe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Open Stripe ↗
                </a>
              </div>
            </Card>
          </div>
        )}

        {/* Daily SMS Tab — Daily CPA SMS subscribers, sessions, deliveries */}
        {activeTab === 'sms' && (
          <Suspense fallback={<div className="py-12 text-center text-gray-500">Loading Daily SMS dashboard…</div>}>
            <DailyCPADashboard />
          </Suspense>
        )}

        {/* Operations Tab - Announcements & System Logs */}
        {activeTab === 'operations' && (
          <div className="space-y-6">
            {/* Operations Header */}
            <div className="bg-gradient-to-r from-slate-600 to-zinc-600 rounded-2xl p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">🔧 Operations Center</h2>
                  <p className="text-slate-200">System announcements, error monitoring, and maintenance tools</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={loadSystemErrors}
                    disabled={isLoadingErrors}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
                  >
                    {isLoadingErrors ? 'Loading...' : '🔄 Refresh'}
                  </button>
                </div>
              </div>
            </div>

            {/* Automated Processes Dashboard */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                ⚙️ Automated Processes
                <a
                  href="https://console.cloud.google.com/functions/list?project=voraprep-prod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline ml-auto font-normal"
                >
                  View in Cloud Console ↗
                </a>
              </h3>
              
              {/* Process Categories */}
              <div className="space-y-6">
                {/* Content & SEO */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                    📝 Content & SEO
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* Blog Auto-Publish */}
                    <div className={`p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 ${
                      functionStatuses.growthAutoPublish?.status === 'error' ? 'border-red-500' :
                      functionStatuses.growthAutoPublish?.status === 'skipped' ? 'border-amber-500' :
                      'border-green-500'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">growthAutoPublish</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Auto-publishes approved blog articles daily</p>
                        </div>
                        {functionStatuses.growthAutoPublish?.status === 'error' ? (
                          <span className="px-2 py-0.5 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">Error</span>
                        ) : functionStatuses.growthAutoPublish?.status === 'skipped' ? (
                          <span className="px-2 py-0.5 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded">No Queue</span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Active</span>
                        )}
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>⏰ <strong>Schedule:</strong> Daily 10:00 AM ET</div>
                        {functionStatuses.growthAutoPublish?.lastRun && (
                          <div>📅 <strong>Last run:</strong> {format(functionStatuses.growthAutoPublish.lastRun, 'MMM d, h:mm a')}</div>
                        )}
                        {functionStatuses.growthAutoPublish?.details?.published ? (
                          <div>📝 <strong>Last published:</strong> {String(functionStatuses.growthAutoPublish.details.published).substring(0, 40)}...</div>
                        ) : null}
                      </div>
                    </div>

                    {/* RSS Feed */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">dynamicRssFeed</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">RSS 2.0 feed for blog syndication</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">Endpoint</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>🔗 <strong>URL:</strong> <a href="https://voraprep.com/feed.xml" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">/feed.xml</a></div>
                        <div>📦 <strong>Format:</strong> RSS 2.0 + Atom</div>
                      </div>
                    </div>

                    {/* Dynamic Sitemap */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">dynamicSitemap</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">XML sitemap with blog articles</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">Endpoint</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>🔗 <strong>URL:</strong> <a href="https://voraprep.com/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">/sitemap.xml</a></div>
                        <div>🤖 <strong>Submitted to:</strong> Google Search Console</div>
                      </div>
                    </div>

                    {/* LinkedIn Auto-Share */}
                    <div className={`p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 ${
                      linkedInStatus.status === 'active' ? 'border-green-500' :
                      linkedInStatus.status === 'expired' ? 'border-red-500' :
                      linkedInStatus.status === 'loading' ? 'border-gray-400' :
                      'border-amber-500'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">LinkedIn Auto-Share</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Posts to company page when articles publish</p>
                        </div>
                        {linkedInStatus.status === 'loading' && (
                          <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">Loading...</span>
                        )}
                        {linkedInStatus.status === 'active' && (
                          <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Active</span>
                        )}
                        {linkedInStatus.status === 'expired' && (
                          <span className="px-2 py-0.5 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">Expired</span>
                        )}
                        {linkedInStatus.status === 'not-configured' && (
                          <span className="px-2 py-0.5 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded">Setup Required</span>
                        )}
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        {linkedInStatus.status === 'active' && linkedInStatus.expiresAt && (
                          <>
                            <div>✅ <strong>Status:</strong> Connected</div>
                            <div>📅 <strong>Expires:</strong> {format(linkedInStatus.expiresAt, 'MMM d, yyyy')}</div>
                            {linkedInStatus.orgId && <div>🏢 <strong>Org ID:</strong> {linkedInStatus.orgId}</div>}
                          </>
                        )}
                        {linkedInStatus.status === 'expired' && (
                          <>
                            <div>❌ <strong>Status:</strong> Token expired</div>
                            <div>📋 <strong>Action:</strong> Re-authorize via OAuth</div>
                          </>
                        )}
                        {linkedInStatus.status === 'not-configured' && (
                          <>
                            <div>⚠️ <strong>Needs:</strong> OAuth authorization</div>
                            <div>📋 <strong>Setup:</strong> Create LinkedIn App → OAuth token</div>
                          </>
                        )}
                        {linkedInStatus.status === 'loading' && (
                          <div>⏳ Checking LinkedIn status...</div>
                        )}
                      </div>
                    </div>

                    {/* Discord Auto-Post */}
                    <div className={`p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 ${
                      discordStatus.status === 'active' ? 'border-green-500' :
                      discordStatus.status === 'loading' ? 'border-gray-400' :
                      'border-amber-500'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">Discord Auto-Post</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Posts to Discord when articles publish</p>
                        </div>
                        {discordStatus.status === 'loading' && (
                          <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">Loading...</span>
                        )}
                        {discordStatus.status === 'active' && (
                          <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Active</span>
                        )}
                        {discordStatus.status === 'not-configured' && (
                          <span className="px-2 py-0.5 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded">Setup Required</span>
                        )}
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        {discordStatus.status === 'active' && (
                          <>
                            <div>✅ <strong>Status:</strong> Webhook configured</div>
                            <div>📡 <strong>Posts to:</strong> VoraPrep Discord server</div>
                          </>
                        )}
                        {discordStatus.status === 'not-configured' && (
                          <>
                            <div>⚠️ <strong>Needs:</strong> Webhook URL</div>
                            <div>📋 <strong>Setup:</strong> Server Settings → Integrations → Webhooks</div>
                          </>
                        )}
                        {discordStatus.status === 'loading' && (
                          <div>⏳ Checking Discord status...</div>
                        )}
                      </div>
                    </div>

                    {/* Rank Tracking */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">growthRankTracking</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tracks keyword rankings weekly</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Active</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>⏰ <strong>Schedule:</strong> Weekly Sunday 6:00 AM ET</div>
                        <div>📊 <strong>API:</strong> SERP API</div>
                      </div>
                    </div>

                    {/* Daily Pull */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">growthDailyPull</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Generates new content briefs</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Active</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>⏰ <strong>Schedule:</strong> Daily 6:00 AM ET</div>
                        <div>🔑 <strong>Secrets:</strong> GEMINI_API_KEY</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email & Notifications */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                    📧 Email & Notifications
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* Daily Reminders */}
                    <div className={`p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 ${
                      functionStatuses.sendDailyReminders?.status === 'error' ? 'border-red-500' : 'border-green-500'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">sendDailyReminders</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Push notifications at user's local time</p>
                        </div>
                        {functionStatuses.sendDailyReminders?.status === 'error' ? (
                          <span className="px-2 py-0.5 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">Error</span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Active</span>
                        )}
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>⏰ <strong>Schedule:</strong> Every hour</div>
                        {functionStatuses.sendDailyReminders?.lastRun && (
                          <div>📅 <strong>Last run:</strong> {format(functionStatuses.sendDailyReminders.lastRun, 'MMM d, h:mm a')}</div>
                        )}
                        {functionStatuses.sendDailyReminders?.details?.notificationsSent !== undefined && (
                          <div>📱 <strong>Sent:</strong> {String(functionStatuses.sendDailyReminders.details.notificationsSent)} notifications</div>
                        )}
                      </div>
                    </div>

                    {/* Weekly Reports */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">sendWeeklyReports</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Weekly progress email summaries</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Active</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>⏰ <strong>Schedule:</strong> Sundays 9:00 AM ET</div>
                        <div>📧 <strong>Channel:</strong> Resend Email</div>
                      </div>
                    </div>

                    {/* Welcome Drip */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">sendWelcomeDripEmails</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Day 1, 2, 5, 7, 14 drip sequence</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Active</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>⏰ <strong>Schedule:</strong> Daily 8:00 AM ET</div>
                        <div>📧 <strong>Channel:</strong> Resend Email</div>
                      </div>
                    </div>

                    {/* Trial Reminders */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">sendTrialReminderEmails</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">7d, 3d, 1d, expired trial emails</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Active</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>⏰ <strong>Schedule:</strong> Daily 10:00 AM ET</div>
                        <div>📧 <strong>Channel:</strong> Resend Email</div>
                      </div>
                    </div>

                    {/* Onboarding Reminders */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">sendOnboardingReminders</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Nudges users who haven't completed setup</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Active</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>⏰ <strong>Schedule:</strong> Daily 10:00 AM ET</div>
                        <div>📧 <strong>Channel:</strong> Resend Email</div>
                      </div>
                    </div>

                    {/* First Practice Reminders */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">sendFirstPracticeReminders</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Encourages first practice session</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Active</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>⏰ <strong>Schedule:</strong> Daily 2:00 PM ET</div>
                        <div>📧 <strong>Channel:</strong> Resend Email</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing & Subscriptions */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                    💳 Billing & Subscriptions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* Stripe Webhook */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">stripeWebhook</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Handles Stripe payment events</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">Webhook</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>🔐 <strong>Secrets:</strong> STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET</div>
                        <div>📋 <strong>Events:</strong> checkout.session.completed, customer.subscription.*</div>
                      </div>
                    </div>

                    {/* Trial Expiration Check */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">checkTrialExpirations</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Updates trial status when expired</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">Active</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>⏰ <strong>Schedule:</strong> Daily 1:00 AM ET</div>
                        <div>📊 <strong>Action:</strong> Marks expired trials</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Scraping */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                    🌐 Community Monitoring
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* Reddit Scraper */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">redditMonitor</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Monitor r/CPA, r/Accounting for content ideas</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">External</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>🐍 <strong>Runtime:</strong> Python script (manual/cron)</div>
                        <div>📂 <strong>Location:</strong> scripts/reddit_monitor/</div>
                      </div>
                    </div>

                    {/* Discord Scraper */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">discordMonitor</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Monitor CPA study Discord servers</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">External</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>🐍 <strong>Runtime:</strong> Same script as Reddit monitor</div>
                        <div>📂 <strong>Location:</strong> scripts/reddit_monitor/</div>
                        <div>🤖 <strong>Run:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">--platform discord</code></div>
                      </div>
                    </div>

                    {/* Twitter/X Auto-Post */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 border-gray-400">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">twitterAutoPost</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Auto-post articles to X/Twitter</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">Planned</span>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div>📋 <strong>Needs:</strong> Twitter API v2 credentials</div>
                        <div>💰 <strong>Cost:</strong> $100/mo for Pro API access</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Broadcast Announcement Section */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                📢 Send Announcement
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    placeholder="Announcement title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    value={announcementBody}
                    onChange={(e) => setAnnouncementBody(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white h-24"
                    placeholder="Your announcement message..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Audience
                  </label>
                  <select
                    value={announcementAudience}
                    onChange={(e) => setAnnouncementAudience(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Users</option>
                    <option value="cpa">CPA Users Only</option>
                    <option value="ea">EA Users Only</option>
                    <option value="cma">CMA Users Only</option>
                    <option value="cia">CIA Users Only</option>
                    <option value="cisa">CISA Users Only</option>
                    <option value="cfp">CFP Users Only</option>
                    <option value="paid">Paid Subscribers Only</option>
                    <option value="free">Free Users Only</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={sendAnnouncement}
                    disabled={isSendingAnnouncement || !announcementTitle || !announcementBody}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {isSendingAnnouncement ? '⏳ Sending...' : '📤 Send Announcement'}
                  </button>
                </div>
              </div>
            </Card>

            {/* Announcement History */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📋 Announcement History</h3>
              {isLoadingAnnouncements ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
                </div>
              ) : announcementHistory.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No announcements sent yet</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {announcementHistory.map((ann) => (
                    <div key={ann.id} className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{ann.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ann.body}</p>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {new Date(ann.createdAt.seconds * 1000).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                          {ann.audience}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* System Health */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🩺 System Health</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">✓</div>
                  <div className="text-sm text-green-600 dark:text-green-400">Firebase</div>
                </div>
                <div className={`p-4 rounded-lg text-center ${import.meta.env.VITE_GEMINI_API_KEY ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
                  <div className={`text-2xl font-bold ${import.meta.env.VITE_GEMINI_API_KEY ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                    {import.meta.env.VITE_GEMINI_API_KEY ? '✓' : '✗'}
                  </div>
                  <div className={`text-sm ${import.meta.env.VITE_GEMINI_API_KEY ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>Gemini AI</div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">✓</div>
                  <div className="text-sm text-green-600 dark:text-green-400">Auth</div>
                </div>
                <div className={`p-4 rounded-lg text-center ${systemErrors.length === 0 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-amber-50 dark:bg-amber-900/30'}`}>
                  <div className={`text-2xl font-bold ${systemErrors.length === 0 ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'}`}>
                    {systemErrors.length}
                  </div>
                  <div className={`text-sm ${systemErrors.length === 0 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>Errors</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                <div className="grid grid-cols-2 gap-2">
                  <div><strong>Environment:</strong> {import.meta.env.VITE_ENVIRONMENT || 'development'}</div>
                  <div><strong>Project:</strong> {import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Unknown'}</div>
                  <div><strong>Build:</strong> {import.meta.env.VITE_BUILD_TIME || 'Local'}</div>
                  <div><strong>Version:</strong> {import.meta.env.VITE_APP_VERSION || '1.0.0'}</div>
                </div>
              </div>
            </Card>

            {/* Error Monitoring */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                🔍 Error Monitoring
                {errorStats && (
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    errorStats.total > 0 ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  }`}>
                    {errorStats.total} errors
                  </span>
                )}
              </h3>
              
              {isLoadingErrors ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full mx-auto" />
                </div>
              ) : errorStats ? (
                <div className="space-y-4">
                  {/* Error Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{errorStats.total}</div>
                      <div className="text-xs text-gray-500">Total Errors</div>
                    </div>
                    <div className={`p-3 rounded-lg text-center ${errorStats.last24h > 5 ? 'bg-red-100 dark:bg-red-900/40 ring-2 ring-red-500' : 'bg-red-50 dark:bg-red-900/20'}`}>
                      <div className={`text-2xl font-bold ${errorStats.last24h > 5 ? 'text-red-700' : errorStats.last24h > 0 ? 'text-amber-600' : 'text-green-600'}`}>{errorStats.last24h}</div>
                      <div className="text-xs text-red-700 dark:text-red-300">Last 24h</div>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-center">
                      <div className={`text-2xl font-bold ${errorStats.last7d > 20 ? 'text-amber-600' : 'text-blue-600'}`}>{errorStats.last7d}</div>
                      <div className="text-xs text-amber-700 dark:text-amber-300">Last 7 Days</div>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{errorStats.topErrors.length}</div>
                      <div className="text-xs text-purple-700 dark:text-purple-300">Unique Types</div>
                    </div>
                  </div>

                  {/* Error Categories & Severity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">By Category</h5>
                      <div className="space-y-1">
                        {Object.entries(errorStats.byCategory || {}).map(([cat, count]) => (
                          <div key={cat} className="flex justify-between text-sm">
                            <span className="capitalize text-gray-600 dark:text-gray-400">{cat}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                        {Object.keys(errorStats.byCategory || {}).length === 0 && (
                          <span className="text-gray-400 text-sm">No categories</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">By Severity</h5>
                      <div className="space-y-1">
                        {Object.entries(errorStats.bySeverity || {}).map(([sev, count]) => (
                          <div key={sev} className="flex justify-between text-sm">
                            <span className={`capitalize ${sev === 'critical' ? 'text-red-600' : sev === 'high' ? 'text-orange-600' : sev === 'medium' ? 'text-amber-600' : 'text-gray-600'}`}>
                              {sev === 'critical' ? '🔴' : sev === 'high' ? '🟠' : sev === 'medium' ? '🟡' : '🟢'} {sev}
                            </span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top Errors */}
                  {errorStats.topErrors.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Most Frequent Errors</h4>
                      <div className="space-y-2">
                        {errorStats.topErrors.slice(0, 5).map((error, i) => (
                          <div key={i} className="flex items-start gap-3 p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm">
                            <span className="font-bold text-red-600 min-w-[32px]">{error.count}×</span>
                            <span className="font-mono text-red-800 dark:text-red-200 flex-1 text-xs truncate" title={error.message}>{error.message}</span>
                            <span className="text-gray-400 text-xs whitespace-nowrap">{error.lastSeen?.toLocaleDateString?.() || ''}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={clearSystemErrors}
                      className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-200 transition-colors"
                    >
                      Clear All Errors
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">Click Refresh to load error data</p>
              )}
            </Card>

            {/* Detailed Error Logs */}
            {systemErrors.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📋 Error Log Details</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {systemErrors.map((err) => (
                    <div key={err.id} className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/30 p-4 rounded-r-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-red-700 dark:text-red-300 text-sm">
                          {err.timestamp && typeof err.timestamp === 'object' && 'seconds' in err.timestamp
                            ? new Date((err.timestamp as { seconds: number }).seconds * 1000).toLocaleString()
                            : String(err.timestamp || 'Unknown Date')}
                        </span>
                        <span className="text-xs text-red-400 font-mono">{err.id}</span>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white mb-2">{err.message}</p>
                      {err.context && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <strong>Context:</strong> {typeof err.context === 'object' ? JSON.stringify(err.context) : err.context} | <strong>User:</strong> {err.userId || 'Anonymous'}
                        </div>
                      )}
                      {err.stack && (
                        <details className="mt-2">
                          <summary className="text-xs text-red-600 dark:text-red-400 cursor-pointer hover:underline">View Stack Trace</summary>
                          <pre className="mt-2 p-2 bg-gray-900 text-red-200 text-xs rounded overflow-x-auto whitespace-pre-wrap">
                            {err.stack}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Communication Templates */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                ✉️ Communication Templates
                <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                  {communicationTemplates.filter(t => t.type === 'email').length} emails · {communicationTemplates.filter(t => t.type === 'push').length} push
                </span>
                <div className="ml-auto flex gap-2">
                  <button
                    onClick={seedTemplates}
                    disabled={isSeedingTemplates}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
                  >
                    {isSeedingTemplates ? 'Seeding...' : '🌱 Seed Defaults'}
                  </button>
                  <button
                    onClick={loadCommunicationTemplates}
                    disabled={isLoadingTemplates}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
                  >
                    {isLoadingTemplates ? 'Loading...' : '🔄 Refresh'}
                  </button>
                </div>
              </h3>
              
              {isLoadingTemplates ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Email Templates */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                      📧 Email Templates
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {communicationTemplates.filter(t => t.type === 'email').map((template) => (
                        <div key={template.id} className={`p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 ${template.enabled ? 'border-green-500' : 'border-gray-400'} hover:shadow-md transition-shadow`}>
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-gray-900 dark:text-white">{template.name}</h5>
                            <div className="flex items-center gap-2">
                              {template.isCustomized && (
                                <span className="px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                                  Edited
                                </span>
                              )}
                              <span className={`px-2 py-0.5 text-xs rounded ${template.enabled ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                {template.enabled ? 'Active' : 'Off'}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{template.description}</p>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            <strong>Subject:</strong> <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">{template.subject?.substring(0, 35)}{(template.subject?.length || 0) > 35 ? '...' : ''}</span>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 dark:border-slate-700">
                            <div className="flex flex-wrap gap-1">
                              {template.variables.slice(0, 2).map(v => (
                                <span key={v} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">
                                  {'{{'}{v}{'}}'}
                                </span>
                              ))}
                              {template.variables.length > 2 && (
                                <span className="text-xs text-gray-500">+{template.variables.length - 2}</span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setPreviewingTemplate(template)}
                                className="text-xs text-gray-600 dark:text-gray-400 hover:underline font-medium"
                              >
                                View
                              </button>
                              <button
                                onClick={() => setEditingTemplate(template)}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                              >
                                Edit →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Push Notification Templates */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                      📱 Push Notifications
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {communicationTemplates.filter(t => t.type === 'push').map((template) => (
                        <div key={template.id} className={`p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border-l-4 ${template.enabled ? 'border-green-500' : 'border-gray-400'} hover:shadow-md transition-shadow`}>
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-gray-900 dark:text-white">{template.name}</h5>
                            <div className="flex items-center gap-2">
                              {template.isCustomized && (
                                <span className="px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                                  Edited
                                </span>
                              )}
                              <span className={`px-2 py-0.5 text-xs rounded ${template.enabled ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                {template.enabled ? 'Active' : 'Off'}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{template.description}</p>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            <strong>Title:</strong> <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">{template.subject}</span>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 dark:border-slate-700">
                            <div className="flex flex-wrap gap-1">
                              {template.variables.map(v => (
                                <span key={v} className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded">
                                  {'{{'}{v}{'}}'}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setPreviewingTemplate(template)}
                                className="text-xs text-gray-600 dark:text-gray-400 hover:underline font-medium"
                              >
                                View
                              </button>
                              <button
                                onClick={() => setEditingTemplate(template)}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                              >
                                Edit →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-3">
                      <span className="text-amber-500 text-lg">💡</span>
                      <div>
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                          <strong>Click "Edit" on any template</strong> to modify the subject line or enable/disable it. Changes take effect immediately for new emails sent.
                        </p>
                        <div className="mt-2 flex gap-3">
                          <a
                            href="https://resend.com/emails"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-amber-700 dark:text-amber-300 hover:underline"
                          >
                            View sent emails in Resend →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Edit Template Modal */}
            {editingTemplate && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Edit Template: {editingTemplate.name}
                      </h3>
                      <button
                        onClick={() => setEditingTemplate(null)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {editingTemplate.description}
                    </p>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {/* Enabled Toggle */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                      <div>
                        <label className="font-medium text-gray-900 dark:text-white">
                          {editingTemplate.type === 'email' ? 'Send this email' : 'Send this notification'}
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          When disabled, this communication will not be sent
                        </p>
                      </div>
                      <button
                        onClick={() => setEditingTemplate({ ...editingTemplate, enabled: !editingTemplate.enabled })}
                        className={`relative w-12 h-6 rounded-full transition-colors ${editingTemplate.enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${editingTemplate.enabled ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>

                    {/* Subject Line */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {editingTemplate.type === 'email' ? 'Subject Line' : 'Notification Title'}
                      </label>
                      <input
                        type="text"
                        value={editingTemplate.subject || ''}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-mono text-sm"
                        placeholder="Enter subject line..."
                      />
                    </div>

                    {/* Body (for push notifications) */}
                    {editingTemplate.type === 'push' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Notification Body
                        </label>
                        <textarea
                          value={editingTemplate.body || ''}
                          onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-mono text-sm"
                          placeholder="Notification body text..."
                        />
                      </div>
                    )}

                    {/* Available Variables */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Available Variables
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {editingTemplate.variables.map(v => (
                          <button
                            key={v}
                            onClick={() => {
                              const varText = `{{${v}}}`;
                              setEditingTemplate({
                                ...editingTemplate,
                                subject: (editingTemplate.subject || '') + varText
                              });
                            }}
                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          >
                            {'{{'}{v}{'}}'}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Click to add to subject line
                      </p>
                    </div>

                    {/* Function Info */}
                    <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        <strong>Sent by:</strong> <code className="bg-gray-200 dark:bg-slate-700 px-1 rounded">{editingTemplate.functionName}</code>
                      </p>
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-3">
                    <button
                      onClick={() => setEditingTemplate(null)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveTemplate(editingTemplate)}
                      disabled={isSavingTemplate}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isSavingTemplate ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Template Modal */}
            {previewingTemplate && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Preview: {previewingTemplate.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {previewingTemplate.type === 'email' ? 'Email' : 'Push Notification'} • {previewingTemplate.enabled ? 'Active' : 'Disabled'}
                      </p>
                    </div>
                    <button
                      onClick={() => setPreviewingTemplate(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto">
                    {previewingTemplate.type === 'email' ? (
                      <div className="p-4 space-y-4">
                        {/* Email Header Preview */}
                        <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 bg-gray-50 dark:bg-slate-900">
                          <div className="space-y-2 text-sm">
                            <div className="flex">
                              <span className="w-16 text-gray-500 dark:text-gray-400">From:</span>
                              <span className="text-gray-900 dark:text-white">VoraPrep &lt;hello@voraprep.com&gt;</span>
                            </div>
                            <div className="flex">
                              <span className="w-16 text-gray-500 dark:text-gray-400">To:</span>
                              <span className="text-gray-900 dark:text-white">user@example.com</span>
                            </div>
                            <div className="flex">
                              <span className="w-16 text-gray-500 dark:text-gray-400">Subject:</span>
                              <span className="text-gray-900 dark:text-white font-medium">
                                {(previewingTemplate.subject || '')
                                  .replace(/\{\{firstName\}\}/g, 'John')
                                  .replace(/\{\{name\}\}/g, 'John')
                                  .replace(/\{\{email\}\}/g, 'user@example.com')
                                  .replace(/\{\{courseName\}\}/g, 'CPA')
                                  .replace(/\{\{examName\}\}/g, 'FAR')
                                  .replace(/\{\{studyTime\}\}/g, '2h 15m')
                                  .replace(/\{\{questionsAnswered\}\}/g, '45')
                                  .replace(/\{\{accuracy\}\}/g, '78%')
                                  .replace(/\{\{streak\}\}/g, '5')
                                  .replace(/\{\{daysUntilExam\}\}/g, '30')
                                  .replace(/\{\{.+?\}\}/g, '[value]')}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Email Body Preview */}
                        <div className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
                          <div 
                            className="bg-white p-6"
                            dangerouslySetInnerHTML={{ 
                              __html: (previewingTemplate.body || '<p style="color: #666; text-align: center;">Email body not available for preview.<br/>The full HTML template is generated at send time.</p>')
                                .replace(/\{\{firstName\}\}/g, 'John')
                                .replace(/\{\{name\}\}/g, 'John')
                                .replace(/\{\{email\}\}/g, 'user@example.com')
                                .replace(/\{\{courseName\}\}/g, 'CPA')
                                .replace(/\{\{examName\}\}/g, 'FAR')
                                .replace(/\{\{studyTime\}\}/g, '2h 15m')
                                .replace(/\{\{questionsAnswered\}\}/g, '45')
                                .replace(/\{\{accuracy\}\}/g, '78%')
                                .replace(/\{\{streak\}\}/g, '5')
                                .replace(/\{\{daysUntilExam\}\}/g, '30')
                                .replace(/\{\{.+?\}\}/g, '<span style="background:#fef3c7;padding:1px 4px;border-radius:2px;">[value]</span>')
                            }}
                          />
                        </div>
                        
                        {/* Variable Reference */}
                        <div className="text-xs text-gray-500 dark:text-gray-400 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                          <strong>Sample values used:</strong> firstName=John, email=user@example.com, courseName=CPA, examName=FAR, studyTime=2h 15m, questionsAnswered=45, accuracy=78%, streak=5, daysUntilExam=30
                        </div>
                      </div>
                    ) : (
                      /* Push Notification Preview */
                      <div className="p-6 flex flex-col items-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Mobile notification preview</p>
                        
                        {/* iOS-style notification mockup */}
                        <div className="w-80 bg-white dark:bg-slate-700 rounded-2xl shadow-lg overflow-hidden">
                          <div className="p-3 flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-lg font-bold">
                              V
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                                  VORAPREP
                                </span>
                                <span className="text-xs text-gray-400">now</span>
                              </div>
                              <p className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">
                                {(previewingTemplate.subject || 'Notification Title')
                                  .replace(/\{\{firstName\}\}/g, 'John')
                                  .replace(/\{\{name\}\}/g, 'John')
                                  .replace(/\{\{streak\}\}/g, '5')
                                  .replace(/\{\{daysUntilExam\}\}/g, '30')
                                  .replace(/\{\{.+?\}\}/g, '[value]')}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                {(previewingTemplate.body || 'Notification body text...')
                                  .replace(/\{\{firstName\}\}/g, 'John')
                                  .replace(/\{\{name\}\}/g, 'John')
                                  .replace(/\{\{streak\}\}/g, '5')
                                  .replace(/\{\{daysUntilExam\}\}/g, '30')
                                  .replace(/\{\{.+?\}\}/g, '[value]')}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Android-style notification mockup */}
                        <div className="mt-6 w-80">
                          <p className="text-xs text-gray-400 mb-2 text-center">Android style</p>
                          <div className="bg-gray-100 dark:bg-slate-600 rounded-lg p-3 flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              V
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">VoraPrep</span>
                                <span className="text-xs text-gray-400">• now</span>
                              </div>
                              <p className="font-medium text-gray-900 dark:text-white text-sm">
                                {(previewingTemplate.subject || 'Notification Title')
                                  .replace(/\{\{firstName\}\}/g, 'John')
                                  .replace(/\{\{name\}\}/g, 'John')
                                  .replace(/\{\{streak\}\}/g, '5')
                                  .replace(/\{\{daysUntilExam\}\}/g, '30')
                                  .replace(/\{\{.+?\}\}/g, '[value]')}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                                {(previewingTemplate.body || 'Notification body text...')
                                  .replace(/\{\{firstName\}\}/g, 'John')
                                  .replace(/\{\{name\}\}/g, 'John')
                                  .replace(/\{\{streak\}\}/g, '5')
                                  .replace(/\{\{daysUntilExam\}\}/g, '30')
                                  .replace(/\{\{.+?\}\}/g, '[value]')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <button
                      onClick={() => {
                        setPreviewingTemplate(null);
                        setEditingTemplate(previewingTemplate);
                      }}
                      className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Edit this template →
                    </button>
                    <button
                      onClick={() => setPreviewingTemplate(null)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* External Tools */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🔗 External Monitoring</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://console.firebase.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-200 transition-colors"
                >
                  🔥 Firebase Console ↗
                </a>
                <a
                  href="https://dashboard.stripe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  💳 Stripe Dashboard ↗
                </a>
                <a
                  href="https://analytics.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 transition-colors"
                >
                  📊 GA4 ↗
                </a>
                <a
                  href="https://resend.com/emails"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  📧 Resend ↗
                </a>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Admin Settings</h3>
            <div className="space-y-4">
              {/* Stripe Payment Status */}
              <StripeStatusSection />

              {/* AI Service Status */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">🤖 AI Service Status (Vory)</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-700 dark:text-blue-300">Gemini API Key:</span>
                    <span className={`text-sm font-medium ${import.meta.env.VITE_GEMINI_API_KEY ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
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
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                              Last: {new Date(lastFailure.timestamp).toLocaleString()} - {lastFailure.message}
                            </p>
                            <button
                              onClick={() => {
                                localStorage.removeItem('ai_api_failures');
                                window.location.reload();
                              }}
                              className="mt-2 text-xs text-red-700 dark:text-red-300 underline hover:no-underline"
                            >
                              Clear failures
                            </button>
                          </div>
                        );
                      }
                      return <p className="text-sm text-green-600 dark:text-green-400">✓ No recent failures</p>;
                    } catch {
                      return null;
                    }
                  })()}
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                    To update the API key, add VITE_GEMINI_API_KEY to GitHub Secrets and redeploy.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Admin Access</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Authorized admin emails:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                  {ADMIN_EMAILS.map((email) => (
                    <li key={email}>{email}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Firebase Project</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Project: {import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Unknown'}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Environment: {import.meta.env.VITE_ENVIRONMENT || 'development'}</p>
              </div>
              
              {/* Reset Account Section */}
              <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">🔄 Reset My Account (Testing)</h4>
                <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                  Reset your account to test the app from the beginning. This will delete:
                </p>
                <ul className="text-sm text-red-600 dark:text-red-400 list-disc list-inside mb-4">
                  <li>All progress data</li>
                  <li>Question history & performance</li>
                  <li>Completed lessons</li>
                  <li>Achievements & badges</li>
                  <li>Study streaks</li>
                  <li>Bookmarks & flagged questions</li>
                  <li>Onboarding status (will show onboarding again)</li>
                </ul>
                
                {/* Course selector for per-exam reset */}
                <div className="mb-4 p-3 bg-white dark:bg-slate-800 rounded border border-red-200 dark:border-red-800">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Exam to reset (for per-exam options):
                  </label>
                  <select 
                    value={resetExamSelection}
                    onChange={(e) => setResetExamSelection(e.target.value)}
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    <option value="cpa">CPA</option>
                    <option value="ea">EA (Enrolled Agent)</option>
                    <option value="cma">CMA</option>
                    <option value="cia">CIA</option>
                    <option value="cfp">CFP</option>
                    <option value="cisa">CISA</option>
                  </select>
                </div>
                
                <div className="flex flex-wrap gap-3">
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
                          onboardingCompleted: {}, // Reset per-course onboarding
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
                      
                      // Use the selected exam from dropdown
                      const currentCourse = resetExamSelection;
                      
                      const confirmed = window.confirm(`Reset onboarding for ${currentCourse.toUpperCase()} only? You'll see the onboarding flow again for this exam without losing progress.`);
                      if (!confirmed) return;
                      
                      try {
                        const userRef = doc(db, 'users', user.uid);
                        const userDoc = await getDoc(userRef);
                        const userData = userDoc.data();
                        
                        // Update per-course onboarding status
                        const existingOnboarding = userData?.onboardingCompleted || {};
                        const updatedOnboarding = { ...existingOnboarding, [currentCourse]: false };
                        
                        await updateDoc(userRef, { 
                          onboardingCompleted: updatedOnboarding,
                          // Keep legacy flag in sync for backwards compatibility
                          onboardingComplete: Object.values(updatedOnboarding).some(v => v === true)
                        });
                        addLog(`✅ Onboarding reset for ${currentCourse.toUpperCase()}! Redirecting...`, 'success');
                        setTimeout(() => {
                          window.location.href = '/onboarding';
                        }, 1000);
                      } catch (error) {
                        addLog('❌ Failed: ' + (error instanceof Error ? error.message : String(error)), 'error');
                      }
                    }}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    🎯 Reset {resetExamSelection.toUpperCase()} Onboarding
                  </button>
                  <button
                    onClick={async () => {
                      if (!user) return;
                      
                      // Use the selected exam from dropdown
                      const currentCourse = resetExamSelection;
                      
                      const confirmed = window.confirm(
                        `⚠️ Reset ALL progress for ${currentCourse.toUpperCase()} only?\n\n` +
                        `This will delete:\n` +
                        `• Question history & performance for ${currentCourse.toUpperCase()}\n` +
                        `• Completed lessons for ${currentCourse.toUpperCase()}\n` +
                        `• Achievements & streaks for ${currentCourse.toUpperCase()}\n` +
                        `• Bookmarks & flagged questions for ${currentCourse.toUpperCase()}\n\n` +
                        `Other exams will NOT be affected.`
                      );
                      if (!confirmed) return;
                      
                      try {
                        addLog(`Starting progress reset for ${currentCourse.toUpperCase()}...`, 'info');
                        const batch = writeBatch(db);
                        const userId = user.uid;
                        
                        // Get course sections to identify course-specific activities
                        const courseSections = COURSES[currentCourse as CourseId]?.sections?.map(s => s.id) || [];
                        
                        // Collections that store course-specific data (with courseId field)
                        const collectionsWithCourseId = [
                          'lessons',
                          'progress',
                          'questionHistory', 
                          'lessonProgress',
                          'achievements',
                          'bookmarks',
                          'flaggedQuestions',
                          'studySessions',
                          'examResults',
                          'flashcardProgress',
                          'questionAttempts',
                          'study_plans',
                          'studyState',
                        ];
                        
                        let totalDeleted = 0;
                        
                        // Delete docs where courseId matches current course
                        for (const collName of collectionsWithCourseId) {
                          try {
                            const subColRef = collection(db, 'users', userId, collName);
                            const subDocs = await getDocs(subColRef);
                            subDocs.forEach((docSnap) => {
                              const data = docSnap.data();
                              const docId = docSnap.id.toLowerCase();
                              const section = (data.section || '').toLowerCase();
                              
                              // Check if this doc belongs to the current course:
                              // 1. Explicit courseId match
                              // 2. Section matches course sections (e.g., CISA1, CISA2)
                              // 3. Doc ID starts with course prefix (e.g., cisa1-a-1)
                              // 4. Legacy CPA data (no courseId, currentCourse is 'cpa')
                              const belongsToCourse = 
                                data.courseId === currentCourse ||
                                courseSections.some(s => section === s.toLowerCase()) ||
                                docId.startsWith(currentCourse.toLowerCase()) ||
                                (data.courseId === undefined && currentCourse === 'cpa' && 
                                  !['ea', 'cma', 'cia', 'cfp', 'cisa'].some(c => docId.startsWith(c)));
                              
                              if (belongsToCourse) {
                                batch.delete(docSnap.ref);
                                totalDeleted++;
                              }
                            });
                          } catch (e) {
                            // Collection might not exist
                          }
                        }
                        
                        // Handle daily_log specially - filter by course-prefixed doc ID, activity section, or today's date
                        // New format: daily_log docs use IDs like "cfp_2026-02-11" (courseId_date)
                        // Legacy format: daily_log docs use IDs like "2026-02-11" with activities containing section
                        try {
                          const dailyLogRef = collection(db, 'users', userId, 'daily_log');
                          const dailyLogDocs = await getDocs(dailyLogRef);
                          dailyLogDocs.forEach((docSnap) => {
                            const docId = docSnap.id;
                            const data = docSnap.data();
                            const activities = data.activities || [];
                            
                            // Check if doc ID starts with course prefix (new format: cfp_2026-02-11)
                            const isCourseSpecificDoc = docId.startsWith(`${currentCourse}_`);
                            
                            // Check if ANY activity belongs to this course's sections (legacy format)
                            const hasCourseActivity = activities.some((a: { section?: string }) => 
                              a.section && courseSections.some(s => 
                                a.section?.toLowerCase() === s.toLowerCase() ||
                                a.section?.toLowerCase().includes(currentCourse)
                              )
                            );
                            
                            // Delete if:
                            // 1. Doc ID matches course prefix (new format)
                            // 2. Has activities from this course (legacy format)
                            // 3. It's today's legacy doc (fresh start for backwards compat)
                            const isTodayLegacyDoc = docId === format(new Date(), 'yyyy-MM-dd');
                            
                            if (isCourseSpecificDoc || hasCourseActivity || isTodayLegacyDoc) {
                              batch.delete(docSnap.ref);
                              totalDeleted++;
                            }
                          });
                        } catch (e) {
                          // Collection might not exist
                        }
                        
                        // Reset onboarding for this course only
                        const userRef = doc(db, 'users', userId);
                        const userDoc = await getDoc(userRef);
                        const userData = userDoc.data();
                        const existingOnboarding = userData?.onboardingCompleted || {};
                        
                        // Also clear lessonProgress entries for this course
                        // Lesson IDs are prefixed with course name (e.g., 'cisa-lesson-1', 'cpa-far-lesson-1')
                        // and section IDs start with course prefix (e.g., 'CISA1', 'FAR')
                        const existingLessonProgress = userData?.lessonProgress || {};
                        const coursePrefix = currentCourse.toLowerCase();
                        const courseConfig = COURSES[currentCourse as CourseId];
                        const sectionPrefixes = (courseConfig?.sections || []).map(s => s.id.toLowerCase());
                        
                        // Filter out lesson progress entries for this course
                        const filteredLessonProgress: Record<string, number> = {};
                        Object.entries(existingLessonProgress).forEach(([lessonId, progress]) => {
                          const lessonIdLower = lessonId.toLowerCase();
                          // Keep it only if it doesn't belong to the current course
                          const belongsToCourse = 
                            lessonIdLower.startsWith(coursePrefix) ||
                            sectionPrefixes.some(prefix => lessonIdLower.startsWith(prefix));
                          if (!belongsToCourse) {
                            filteredLessonProgress[lessonId] = progress as number;
                          }
                        });
                        
                        batch.update(userRef, {
                          onboardingCompleted: { ...existingOnboarding, [currentCourse]: false },
                          lessonProgress: filteredLessonProgress,
                        });
                        
                        await batch.commit();
                        addLog(`✅ Reset ${totalDeleted} records for ${currentCourse.toUpperCase()}! Redirecting...`, 'success');
                        
                        // Clear local storage for this course - comprehensive cleanup
                        localStorage.removeItem(`voraprep_study_state_${currentCourse}`);
                        localStorage.removeItem(`dailyplan_completed_${currentCourse}`);
                        localStorage.removeItem(`${currentCourse}-cram-mode`);
                        
                        // Clear daily plan cache entries (match pattern: daily_plan_{userId}_{date}_{section})
                        const keysToRemove: string[] = [];
                        for (let i = 0; i < localStorage.length; i++) {
                          const key = localStorage.key(i);
                          if (key && (
                            key.startsWith(`daily_plan_${userId}`) ||
                            key.includes(`_${currentCourse}_`) ||
                            key.endsWith(`_${currentCourse}`)
                          )) {
                            keysToRemove.push(key);
                          }
                        }
                        keysToRemove.forEach(key => localStorage.removeItem(key));
                        
                        setTimeout(() => {
                          window.location.href = '/onboarding';
                        }, 1500);
                      } catch (error) {
                        addLog('❌ Failed: ' + (error instanceof Error ? error.message : String(error)), 'error');
                      }
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    🗑️ Reset {resetExamSelection.toUpperCase()} Progress
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
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-primary-600 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{selectedUser.email || 'Unknown User'}</h2>
                  <p className="text-blue-100 text-sm font-mono">{selectedUser.id}</p>
                  <div className="flex gap-3 mt-2 text-sm flex-wrap">
                    <span className="bg-white/20 px-2 py-1 rounded font-medium">{getUserCourse(selectedUser).toUpperCase()}</span>
                    <span className="bg-white/20 px-2 py-1 rounded font-medium">{selectedUser.examSection || 'No section'}</span>
                    <span className="bg-white/20 px-2 py-1 rounded font-medium">{selectedUser.subscription?.tier || 'free'}</span>
                    {/* Onboarding Status Badge */}
                    {(() => {
                      const onboarded = selectedUser.onboardingComplete === true || 
                        (selectedUser.onboardingCompleted && Object.values(selectedUser.onboardingCompleted).some((v: unknown) => v === true));
                      return onboarded 
                        ? <span className="bg-green-500 px-2 py-1 rounded font-medium">✓ Onboarded</span>
                        : <span className="bg-red-500 px-2 py-1 rounded font-medium">✗ No Onboarding</span>;
                    })()}
                    {selectedUser.isAdmin && <span className="bg-amber-500 px-2 py-1 rounded font-medium">Admin</span>}
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
                  <span className="ml-3 text-gray-600 dark:text-gray-400">Loading activity data...</span>
                </div>
              ) : userActivity ? (
                <div className="space-y-6">
                  {/* Stats Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{userActivity.stats.totalQuestions}</div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">Questions Answered</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-green-700 dark:text-green-300">{userActivity.stats.overallAccuracy}%</div>
                      <div className="text-sm text-green-600 dark:text-green-400">Accuracy</div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{userActivity.stats.studyStreak}</div>
                      <div className="text-sm text-amber-600 dark:text-amber-400">Day Streak</div>
                    </div>
                    <div className="bg-primary-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary-700">{Math.round(userActivity.stats.totalStudyMinutes / 60)}h</div>
                      <div className="text-sm text-primary-600">Study Time</div>
                    </div>
                  </div>

                  {/* Last Active */}
                  {userActivity.stats.lastActiveDate && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-900 rounded-lg p-3">
                      <strong>Last Active:</strong> {userActivity.stats.lastActiveDate}
                    </div>
                  )}

                  {/* Recent Daily Activity */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">📅 Recent Daily Activity</h4>
                    {userActivity.dailyLogs.length > 0 ? (
                      <div className="bg-gray-50 dark:bg-slate-900 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100 dark:bg-slate-700">
                            <tr>
                              <th className="p-2 text-left">Date</th>
                              <th className="p-2 text-center">Course</th>
                              <th className="p-2 text-center">Questions</th>
                              <th className="p-2 text-center">Correct</th>
                              <th className="p-2 text-center">Lessons</th>
                              <th className="p-2 text-center">Minutes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userActivity.dailyLogs.slice(0, 20).map((log, i) => (
                              <tr key={i} className="border-t border-gray-200 dark:border-slate-700">
                                <td className="p-2">{log.date}</td>
                                <td className="p-2 text-center">
                                  {log.courseId ? (
                                    <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                                      log.courseId === 'cpa' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                      log.courseId === 'ea' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                      log.courseId === 'cma' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                                      log.courseId === 'cia' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                                      log.courseId === 'cisa' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' :
                                      'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                    }`}>
                                      {log.courseId.toUpperCase()}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400 text-xs">—</span>
                                  )}
                                </td>
                                <td className="p-2 text-center">{log.questionsAttempted || log.questionsAnswered || 0}</td>
                                <td className="p-2 text-center text-green-600 dark:text-green-400">{log.questionsCorrect || log.correctAnswers || 0}</td>
                                <td className="p-2 text-center">{log.lessonsCompleted || 0}</td>
                                <td className="p-2 text-center">{Math.round(log.studyTimeMinutes || log.studyMinutes || 0)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">No daily activity recorded.</p>
                    )}
                  </div>

                  {/* Practice Sessions */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">📝 Recent Practice Sessions</h4>
                    {userActivity.practiceSessions.length > 0 ? (
                      <div className="space-y-2">
                        {userActivity.practiceSessions.slice(0, 5).map((session) => (
                          <div key={session.id} className="bg-gray-50 dark:bg-slate-900 rounded-lg p-3 flex justify-between items-center">
                            <div>
                              <span className="font-medium">{session.section || 'Practice'}</span>
                              <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">
                                {session.startedAt?.seconds 
                                  ? new Date(session.startedAt.seconds * 1000).toLocaleDateString()
                                  : 'Unknown date'}
                              </span>
                            </div>
                            <div className="flex gap-4 text-sm">
                              <span>{session.questionsAnswered || 0} Q</span>
                              <span className={session.accuracy >= 75 ? 'text-green-600 dark:text-green-400' : session.accuracy >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}>
                                {session.accuracy || 0}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">No practice sessions recorded.</p>
                    )}
                  </div>

                  {/* AI Conversations */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">🤖 Vory Conversations</h4>
                    {userActivity.recentConversations.length > 0 ? (
                      <div className="space-y-2">
                        {userActivity.recentConversations.map((conv) => (
                          <div key={conv.id} className="bg-gray-50 dark:bg-slate-900 rounded-lg p-3 flex justify-between items-center">
                            <span className="font-medium">{conv.title}</span>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {conv.messageCount} messages • 
                              {conv.updatedAt?.seconds 
                                ? new Date(conv.updatedAt.seconds * 1000).toLocaleDateString()
                                : ''}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">No AI conversations.</p>
                    )}
                  </div>

                  {/* Diagnostic Results */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">🎯 Diagnostic Exams</h4>
                    {userActivity.diagnosticResults && userActivity.diagnosticResults.length > 0 ? (
                      <div className="space-y-2">
                        {userActivity.diagnosticResults.map((diag) => (
                          <div key={diag.id} className="bg-gray-50 dark:bg-slate-900 rounded-lg p-3 flex justify-between items-center">
                            <div>
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold mr-2 ${
                                diag.courseId === 'cpa' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                diag.courseId === 'ea' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                diag.courseId === 'cma' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                                diag.courseId === 'cia' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                                diag.courseId === 'cisa' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' :
                                'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                              }`}>
                                {diag.courseId?.toUpperCase() || '?'}
                              </span>
                              <span className="font-medium">{diag.section || 'Diagnostic'}</span>
                              <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">
                                {diag.completedAt?.seconds 
                                  ? new Date(diag.completedAt.seconds * 1000).toLocaleDateString()
                                  : ''}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${diag.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {diag.percentage}%
                              </span>
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${diag.passed ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                                {diag.passed ? 'PASS' : 'FAIL'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">No diagnostic exams completed.</p>
                    )}
                  </div>

                  {/* Recent Question History */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">❓ Recent Questions ({userActivity.questionHistory.length})</h4>
                    {userActivity.questionHistory.length > 0 ? (
                      <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-3 max-h-48 overflow-y-auto">
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
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                          Showing last {Math.min(50, userActivity.questionHistory.length)} of {userActivity.questionHistory.length} questions
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">No question history.</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">No activity data available. (userActivity: {userActivity ? 'exists' : 'null'}, isLoading: {isLoadingActivity ? 'true' : 'false'})</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t p-4 flex justify-end gap-3">
              <button
                onClick={() => { setSelectedUser(null); setUserActivity(null); }}
                className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600"
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

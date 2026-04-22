/**
 * Session Recording Service
 * 
 * Comprehensive user activity tracking for admin visibility.
 * Captures every page view, click, and interaction to identify
 * exactly where users drop off.
 * 
 * Data stored in Firestore:
 * - users/{uid}/sessions/{sessionId} - Session metadata
 * - users/{uid}/sessions/{sessionId}/activities/{activityId} - Individual actions
 */

import { 
  collection, 
  collectionGroup,
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  query, 
  orderBy, 
  limit as firestoreLimit,
  getDocs,
  where,
  serverTimestamp,
  Timestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import logger from '../utils/logger';

// Activity Types
export type ActivityType = 
  | 'page_view'
  | 'click'
  | 'scroll'
  | 'form_submit'
  | 'button_click'
  | 'link_click'
  | 'modal_open'
  | 'modal_close'
  | 'error'
  | 'session_start'
  | 'session_end'
  | 'signup'
  | 'login'
  | 'logout'
  | 'course_select'
  | 'practice_start'
  | 'practice_end'
  | 'lesson_start'
  | 'lesson_complete'
  | 'question_answer'
  | 'subscription_view'
  | 'checkout_start'
  | 'checkout_complete';

export interface Activity {
  id?: string;
  type: ActivityType;
  timestamp: Date | Timestamp;
  page: string;
  pageName: string; // Human-readable page name
  details: {
    element?: string; // Button text, link text
    elementType?: string; // button, link, input
    target?: string; // href or action target
    value?: string; // input value (never passwords)
    section?: string; // Exam section if applicable
    courseId?: string;
    questionId?: string;
    errorMessage?: string;
    duration?: number; // Time spent in ms
    scrollDepth?: number; // 0-100%
    viewportData?: {
      width: number;
      height: number;
    };
    metadata?: Record<string, unknown>;
  };
}

export interface Session {
  id?: string;
  userId: string;
  userEmail?: string;
  userName?: string;
  startedAt: Date | Timestamp;
  endedAt?: Date | Timestamp | null;
  lastActivityAt: Date | Timestamp;
  duration?: number; // Total duration in ms
  pageCount: number;
  clickCount: number;
  device: {
    userAgent: string;
    platform: string;
    language: string;
    screenWidth: number;
    screenHeight: number;
    viewportWidth: number;
    viewportHeight: number;
    isMobile: boolean;
    isTouch: boolean;
  };
  entry: {
    page: string;
    pageName: string;
    referrer: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  };
  exit?: {
    page: string;
    pageName: string;
  };
  courseId?: string;
  isActive: boolean;
}

// Utility to remove undefined values from objects (Firestore doesn't accept undefined)
// This is critical - Firestore will reject ANY undefined value at any nesting level
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const removeUndefined = (obj: any): any => {
  // Handle null/undefined at top level
  if (obj === null || obj === undefined) return null;
  
  // Arrays: recursively clean each element
  if (Array.isArray(obj)) {
    return obj.map(item => removeUndefined(item)).filter(item => item !== undefined);
  }
  
  // Non-objects pass through (strings, numbers, booleans)
  if (typeof obj !== 'object') return obj;
  
  // Preserve Date and Timestamp instances
  if (obj instanceof Date || obj instanceof Timestamp) return obj;
  
  // For plain objects, recursively clean and filter out undefined
  const cleaned: Record<string, unknown> = {};
  const keys = Object.keys(obj);
  
  for (const key of keys) {
    const value = obj[key];
    
    // Skip undefined values entirely
    if (value === undefined) {
      continue;
    }
    
    // Recursively clean nested objects
    if (typeof value === 'object' && value !== null) {
      const cleanedValue = removeUndefined(value);
      // Only include if the cleaned value is not undefined
      if (cleanedValue !== undefined) {
        cleaned[key] = cleanedValue;
      }
    } else {
      // Primitive values (and null) pass through
      cleaned[key] = value;
    }
  }
  
  return cleaned;
};

// Generate unique session ID
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Get device info
const getDeviceInfo = (): Session['device'] => {
  const ua = navigator.userAgent;
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return {
    userAgent: ua.substring(0, 500), // Truncate to save space
    platform: navigator.platform || 'unknown',
    language: navigator.language || 'en',
    screenWidth: window.screen?.width || 0,
    screenHeight: window.screen?.height || 0,
    viewportWidth: window.innerWidth || 0,
    viewportHeight: window.innerHeight || 0,
    isMobile,
    isTouch,
  };
};

// Map paths to human-readable page names
export const getPageName = (path: string): string => {
  // Remove query params and hash
  const cleanPath = path.split('?')[0].split('#')[0];
  
  const pageNames: Record<string, string> = {
    '/': 'Landing Page',
    '/home': 'Dashboard',
    '/login': 'Login',
    '/register': 'Sign Up',
    '/forgot-password': 'Forgot Password',
    '/verify-email': 'Verify Email',
    '/practice': 'Practice Mode',
    '/flashcards': 'Flashcards',
    '/flashcards/setup': 'Flashcard Setup',
    '/timed-quiz': 'Timed Quiz',
    '/exam-simulator': 'Exam Simulator',
    '/exam-review': 'Exam Review',
    '/lessons': 'Lessons',
    '/progress': 'Progress',
    '/study-plan': 'Study Plan',
    '/study-plan/setup': 'Study Plan Setup',
    '/settings': 'Settings',
    '/subscription': 'Subscription',
    '/you': 'Profile',
    '/ai-tutor': 'AI Tutor',
    '/achievements': 'Achievements',
    '/diagnostic': 'Diagnostic Quiz',
    '/onboarding': 'Onboarding',
    '/checkout-success': 'Checkout Success',
    '/checkout-cancel': 'Checkout Canceled',
    '/start-checkout': 'Start Checkout',
    '/about': 'About Us',
    '/pricing': 'Pricing',
    '/compare': 'Compare Plans',
    '/resources': 'Resources Hub',
    '/blog': 'Blog',
    '/terms': 'Terms of Service',
    '/privacy': 'Privacy Policy',
    '/pass-guarantee': 'Pass Guarantee',
    '/voraprep': 'VoraPrep Home',
    // Course landing pages
    '/cpa': 'CPA Landing',
    '/ea': 'EA Landing',
    '/cma': 'CMA Landing',
    '/cia': 'CIA Landing',
    '/cisa': 'CISA Landing',
    '/cfp': 'CFP Landing',
    // Course info pages
    '/cpa-info': 'CPA Info',
    '/ea-info': 'EA Info',
    '/cma-info': 'CMA Info',
    '/cia-info': 'CIA Info',
    '/cisa-info': 'CISA Info',
    '/cfp-info': 'CFP Info',
    // Admin pages
    '/admin': 'Admin Hub',
    '/admin/analytics': 'User Analytics',
    '/admin/cms': 'Admin CMS',
  };
  
  // Exact match
  if (pageNames[cleanPath]) {
    return pageNames[cleanPath];
  }
  
  // Pattern matching for dynamic routes
  if (cleanPath.startsWith('/lessons/')) {
    return 'Lesson Viewer';
  }
  if (cleanPath.startsWith('/blog/')) {
    return 'Blog Article';
  }
  if (cleanPath.startsWith('/resources/')) {
    return 'Resource Page';
  }
  if (cleanPath.match(/\/(far|aud|reg|bar|isc|tcp)\//i)) {
    const section = cleanPath.match(/\/(far|aud|reg|bar|isc|tcp)/i)?.[1]?.toUpperCase();
    return `${section} Section`;
  }
  if (cleanPath.match(/\/(see1|see2|see3)\//i)) {
    const section = cleanPath.match(/\/(see[1-3])/i)?.[1]?.toUpperCase();
    return `EA ${section}`;
  }
  if (cleanPath.match(/\/(cisa[1-5])\//i)) {
    const section = cleanPath.match(/\/(cisa[1-5])/i)?.[1]?.toUpperCase();
    return `CISA ${section}`;
  }
  
  // Default: convert path to title case
  const lastSegment = cleanPath.split('/').filter(Boolean).pop() || 'Unknown';
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Session Recording Service Class
class SessionRecordingService {
  private currentSessionId: string | null = null;
  private currentUserId: string | null = null;
  private activityBuffer: Activity[] = [];
  private flushInterval: NodeJS.Timeout | null = null;
  private pageViewCount = 0;
  private clickCount = 0;
  private lastActivityTime = Date.now();
  private sessionStartTime = Date.now();
  private isEnabled = true;

  // Initialize service for a user
  async startSession(userId: string, userEmail?: string, userName?: string): Promise<string> {
    if (!this.isEnabled || !userId) {
      return '';
    }

    // End existing session if any
    if (this.currentSessionId) {
      await this.endSession();
    }

    this.currentUserId = userId;
    this.currentSessionId = generateSessionId();
    this.pageViewCount = 0;
    this.clickCount = 0;
    this.sessionStartTime = Date.now();
    this.lastActivityTime = Date.now();

    const currentPath = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);

    // Get UTM params (avoid undefined - Firestore doesn't accept it)
    const utmSource = searchParams.get('utm_source') || localStorage.getItem('utm_source') || null;
    const utmMedium = searchParams.get('utm_medium') || localStorage.getItem('utm_medium') || null;
    const utmCampaign = searchParams.get('utm_campaign') || localStorage.getItem('utm_campaign') || null;

    const session: Session = {
      userId,
      userEmail: userEmail || undefined,
      userName: userName || undefined,
      startedAt: new Date(),
      lastActivityAt: new Date(),
      pageCount: 0,
      clickCount: 0,
      device: getDeviceInfo(),
      entry: {
        page: currentPath,
        pageName: getPageName(currentPath),
        referrer: document.referrer || 'direct',
        ...(utmSource && { utmSource }),
        ...(utmMedium && { utmMedium }),
        ...(utmCampaign && { utmCampaign }),
      },
      isActive: true,
    };

    try {
      const sessionRef = doc(db, 'users', userId, 'sessions', this.currentSessionId);
      await setDoc(sessionRef, session);
      
      // Record session start activity
      await this.trackActivity({
        type: 'session_start',
        timestamp: new Date(),
        page: currentPath,
        pageName: getPageName(currentPath),
        details: {
          metadata: {
            referrer: document.referrer,
          },
        },
      });

      // Start flush interval (every 10 seconds)
      this.startFlushInterval();

      // Log in production too for debugging
      console.log('[SessionRecording] ✅ Session started:', this.currentSessionId);
    } catch (error) {
      // Always log errors, even in production
      console.error('[SessionRecording] ❌ Failed to start session:', error);
    }

    return this.currentSessionId;
  }

  // Track an activity
  async trackActivity(activity: Omit<Activity, 'id'>): Promise<void> {
    if (!this.isEnabled || !this.currentUserId || !this.currentSessionId) {
      return;
    }

    this.lastActivityTime = Date.now();

    // Update counters
    if (activity.type === 'page_view') {
      this.pageViewCount++;
      console.log('[SessionRecording] 📄 Page view:', activity.page, '(total:', this.pageViewCount, ')');
    }
    if (activity.type === 'click' || activity.type === 'button_click' || activity.type === 'link_click') {
      this.clickCount++;
      console.log('[SessionRecording] 🖱️ Click:', activity.details?.element, '(total:', this.clickCount, ')');
    }

    // Sanitize activity before buffering (remove undefined values that Firestore rejects)
    const sanitizedActivity = removeUndefined(activity) as Activity;

    // Add to buffer for batch writing
    this.activityBuffer.push(sanitizedActivity);

    // Flush immediately for important events AND page views
    const immediateFlushEvents: ActivityType[] = [
      'session_start', 'session_end', 'signup', 'login', 'logout',
      'checkout_start', 'checkout_complete', 'error', 'page_view',
      // Include clicks for better tracking reliability
      'click', 'button_click', 'link_click',
    ];
    if (immediateFlushEvents.includes(activity.type)) {
      await this.flushActivities();
    }
  }

  // Convenience methods for common activities
  async trackPageView(path: string, additionalDetails?: Record<string, unknown>): Promise<void> {
    // Sanitize additionalDetails to prevent undefined values from being spread in
    const safeDetails = additionalDetails ? removeUndefined(additionalDetails) : {};
    
    await this.trackActivity({
      type: 'page_view',
      timestamp: new Date(),
      page: path,
      pageName: getPageName(path),
      details: {
        viewportData: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        duration: Date.now() - this.lastActivityTime,
        ...safeDetails,
      },
    });
  }

  async trackClick(
    element: string,
    elementType: string,
    page: string,
    target?: string,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const activityType: ActivityType = 
      elementType === 'button' ? 'button_click' :
      elementType === 'a' || elementType === 'link' ? 'link_click' : 'click';

    // Build details object without undefined values
    const details: Activity['details'] = {
      element: element.substring(0, 200), // Truncate long text
      elementType,
    };
    if (target) {
      details.target = target.substring(0, 500);
    }
    if (metadata) {
      // Sanitize metadata to prevent undefined values
      details.metadata = removeUndefined(metadata);
    }

    await this.trackActivity({
      type: activityType,
      timestamp: new Date(),
      page,
      pageName: getPageName(page),
      details,
    });
  }

  async trackError(errorMessage: string, page: string, metadata?: Record<string, unknown>): Promise<void> {
    // Build details object without undefined values
    const details: Activity['details'] = {
      errorMessage: errorMessage.substring(0, 1000),
    };
    if (metadata) {
      // Sanitize metadata to prevent undefined values
      details.metadata = removeUndefined(metadata);
    }

    await this.trackActivity({
      type: 'error',
      timestamp: new Date(),
      page,
      pageName: getPageName(page),
      details,
    });
  }

  async trackCustomEvent(
    type: ActivityType,
    page: string,
    details: Activity['details']
  ): Promise<void> {
    // Sanitize details to prevent undefined values from caller
    const safeDetails = removeUndefined(details) || {};
    
    await this.trackActivity({
      type,
      timestamp: new Date(),
      page,
      pageName: getPageName(page),
      details: safeDetails,
    });
  }

  // Flush buffered activities to Firestore
  private async flushActivities(): Promise<void> {
    if (!this.currentUserId || !this.currentSessionId || this.activityBuffer.length === 0) {
      return;
    }

    const activitiesToFlush = [...this.activityBuffer];
    this.activityBuffer = [];
    
    console.log('[SessionRecording] Flushing', activitiesToFlush.length, 'activities to Firestore...');

    try {
      const activitiesRef = collection(
        db,
        'users',
        this.currentUserId,
        'sessions',
        this.currentSessionId,
        'activities'
      );

      // Batch write activities (removeUndefined prevents Firestore rejection)
      await Promise.all(
        activitiesToFlush.map(activity => {
          // Convert timestamp first (before sanitization)
          const activityWithTimestamp = {
            ...activity,
            timestamp: activity.timestamp instanceof Date 
              ? Timestamp.fromDate(activity.timestamp) 
              : activity.timestamp,
          };
          
          // Triple-sanitize: activities should already be clean, but ensure nothing slips through
          const sanitized = removeUndefined(activityWithTimestamp);
          
          return addDoc(activitiesRef, sanitized);
        })
      );

      // Update session stats
      const sessionRef = doc(db, 'users', this.currentUserId, 'sessions', this.currentSessionId);
      await updateDoc(sessionRef, {
        lastActivityAt: serverTimestamp(),
        pageCount: this.pageViewCount,
        clickCount: this.clickCount,
        duration: Date.now() - this.sessionStartTime,
      });
      
      console.log('[SessionRecording] ✅ Flushed activities, updated session stats');
    } catch (error) {
      console.error('[SessionRecording] ❌ Failed to flush activities:', error);
      // Re-add failed activities to buffer
      this.activityBuffer = [...activitiesToFlush, ...this.activityBuffer];
    }
  }

  private startFlushInterval(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flushInterval = setInterval(() => {
      this.flushActivities();
    }, 10000); // Flush every 10 seconds
  }

  // End current session
  async endSession(): Promise<void> {
    if (!this.currentUserId || !this.currentSessionId) {
      return;
    }

    const currentPath = window.location.pathname;

    // Track session end
    await this.trackActivity({
      type: 'session_end',
      timestamp: new Date(),
      page: currentPath,
      pageName: getPageName(currentPath),
      details: {
        duration: Date.now() - this.sessionStartTime,
      },
    });

    // Flush remaining activities
    await this.flushActivities();

    // Update session with exit info
    try {
      const sessionRef = doc(db, 'users', this.currentUserId, 'sessions', this.currentSessionId);
      await updateDoc(sessionRef, {
        endedAt: serverTimestamp(),
        isActive: false,
        exit: {
          page: currentPath,
          pageName: getPageName(currentPath),
        },
        duration: Date.now() - this.sessionStartTime,
        pageCount: this.pageViewCount,
        clickCount: this.clickCount,
      });
    } catch (error) {
      logger.error('[SessionRecording] Failed to end session:', error);
    }

    // Clear interval
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }

    this.currentSessionId = null;
    logger.debug('[SessionRecording] Session ended');
  }

  // Heartbeat - silently updates lastActivityAt to track active sessions
  async heartbeat(): Promise<void> {
    if (!this.isEnabled || !this.currentUserId || !this.currentSessionId) {
      return;
    }

    try {
      const sessionRef = doc(db, 'users', this.currentUserId, 'sessions', this.currentSessionId);
      await updateDoc(sessionRef, {
        lastActivityAt: serverTimestamp(),
        duration: Date.now() - this.sessionStartTime,
        isActive: true,
      });
    } catch (error) {
      // Silent failure - heartbeats are best-effort
      console.warn('[SessionRecording] Heartbeat failed:', error);
    }
  }

  // Get current session ID
  getSessionId(): string | null {
    return this.currentSessionId;
  }

  // Enable/disable recording
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  // Get session data for a user
  static async getUserSessions(
    userId: string,
    limitCount = 20
  ): Promise<Session[]> {
    try {
      const sessionsRef = collection(db, 'users', userId, 'sessions');
      const q = query(
        sessionsRef,
        orderBy('startedAt', 'desc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Session[];
    } catch (error) {
      logger.error('[SessionRecording] Failed to get user sessions:', error);
      return [];
    }
  }

  // Get activities for a session
  static async getSessionActivities(
    userId: string,
    sessionId: string,
    limitCount = 100
  ): Promise<Activity[]> {
    try {
      const activitiesRef = collection(
        db,
        'users',
        userId,
        'sessions',
        sessionId,
        'activities'
      );
      const q = query(
        activitiesRef,
        orderBy('timestamp', 'asc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Activity[];
    } catch (error) {
      logger.error('[SessionRecording] Failed to get session activities:', error);
      return [];
    }
  }

  // Get recent activities across all users (for admin)
  // OPTIMIZED: Uses collection group query instead of N+1 queries
  static async getRecentActivities(limitCount = 50): Promise<Array<{
    userId: string;
    userEmail?: string;
    userName?: string;
    session: Session;
    activities: Activity[];
  }>> {
    try {
      console.log('[SessionRecording] getRecentActivities using optimized collection group query...');
      
      // Step 1: Use collection group query to get recent sessions across ALL users
      // This is a single query instead of 180+ individual queries
      const sessionsQuery = query(
        collectionGroup(db, 'sessions'),
        orderBy('lastActivityAt', 'desc'),
        firestoreLimit(limitCount)
      );
      
      const sessionsSnapshot = await getDocs(sessionsQuery);
      console.log('[SessionRecording] Found', sessionsSnapshot.size, 'recent sessions');
      
      if (sessionsSnapshot.empty) {
        return [];
      }
      
      // Step 2: Extract user IDs from session paths and fetch user data
      const userIds = new Set<string>();
      const sessionsByUser: Map<string, Array<{ session: Session; sessionRef: string }>> = new Map();
      
      for (const sessionDoc of sessionsSnapshot.docs) {
        // Path format: users/{userId}/sessions/{sessionId}
        const pathParts = sessionDoc.ref.path.split('/');
        const userId = pathParts[1]; // users/[userId]/sessions/sessionId
        
        userIds.add(userId);
        
        const existing = sessionsByUser.get(userId) || [];
        existing.push({
          session: { id: sessionDoc.id, ...sessionDoc.data() } as Session,
          sessionRef: sessionDoc.ref.path,
        });
        sessionsByUser.set(userId, existing);
      }
      
      // Step 3: Batch fetch user data for display names/emails
      const userDataMap: Map<string, { email?: string; displayName?: string }> = new Map();
      const userFetchPromises = Array.from(userIds).map(async (userId) => {
        try {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            const data = userDoc.data();
            // Skip internal test accounts
            if (data.email && data.email.toLowerCase().includes('sagecg.com')) {
              return; // Will filter out below
            }
            userDataMap.set(userId, {
              email: data.email,
              displayName: data.displayName,
            });
          }
        } catch {
          // User may have been deleted
        }
      });
      await Promise.all(userFetchPromises);
      
      // Step 4: Fetch activities for each session (parallelized)
      const results: Array<{
        userId: string;
        userEmail?: string;
        userName?: string;
        session: Session;
        activities: Activity[];
      }> = [];
      
      const activityFetchPromises = Array.from(sessionsByUser.entries()).flatMap(([userId, sessionsData]) => {
        const userData = userDataMap.get(userId);
        if (!userData) return []; // Skip if user was filtered (e.g., sagecg.com)
        
        return sessionsData.map(async ({ session, sessionRef }) => {
          try {
            // Fetch activities for this session
            const activitiesRef = collection(db, sessionRef, 'activities');
            const activitiesQuery = query(activitiesRef, firestoreLimit(20));
            const activitiesSnapshot = await getDocs(activitiesQuery);
            
            const activities = activitiesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })) as Activity[];
            
            results.push({
              userId,
              userEmail: userData.email,
              userName: userData.displayName,
              session,
              activities,
            });
          } catch (error) {
            console.warn('[SessionRecording] Failed to fetch activities for session:', sessionRef, error);
          }
        });
      });
      
      await Promise.all(activityFetchPromises);
      
      // Sort by most recent activity (newest first) - already sorted by query but re-sort after parallel fetch
      results.sort((a, b) => {
        let aTime = 0;
        let bTime = 0;
        
        if (a.session.lastActivityAt instanceof Timestamp) {
          aTime = a.session.lastActivityAt.toMillis();
        } else if (a.session.lastActivityAt) {
          aTime = new Date(a.session.lastActivityAt as Date).getTime() || 0;
        }
        
        if (b.session.lastActivityAt instanceof Timestamp) {
          bTime = b.session.lastActivityAt.toMillis();
        } else if (b.session.lastActivityAt) {
          bTime = new Date(b.session.lastActivityAt as Date).getTime() || 0;
        }
        
        return bTime - aTime;
      });

      console.log('[SessionRecording] getRecentActivities returning', results.length, 'sessions');
      return results.slice(0, limitCount);
    } catch (error) {
      console.error('[SessionRecording] ❌ Failed to get recent activities:', error);
      return [];
    }
  }

  // Get single session details
  static async getSession(userId: string, sessionId: string): Promise<Session | null> {
    try {
      const sessionRef = doc(db, 'users', userId, 'sessions', sessionId);
      const sessionDoc = await getDoc(sessionRef);
      
      if (!sessionDoc.exists()) {
        return null;
      }
      
      return { id: sessionDoc.id, ...sessionDoc.data() } as Session;
    } catch (error) {
      logger.error('[SessionRecording] Failed to get session:', error);
      return null;
    }
  }
}

// Singleton instance
export const sessionRecorder = new SessionRecordingService();

// Export the class for static method access
export { SessionRecordingService };

export default sessionRecorder;

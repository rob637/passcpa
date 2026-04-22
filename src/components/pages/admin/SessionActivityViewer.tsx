/**
 * Session Activity Viewer — Detailed view of user session activities
 * 
 * Shows a timeline of every action a user took during a session,
 * helping identify exactly where users drop off.
 */

import { useState, useEffect, useCallback } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import {
  ChevronDown, ChevronRight, MousePointer, Eye, AlertCircle,
  LogIn, LogOut, PlayCircle, CheckCircle, CreditCard, ExternalLink,
  Monitor, Smartphone, Clock, Activity, User, Mail, MapPin, Layers,
  Sparkles, X, Loader2, Brain,
} from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { SessionRecordingService, Session, Activity as SessionActivity, ActivityType } from '../../../services/sessionRecordingService';
import { analyzeSession, SessionAnalysisResult, formatAnalysisForDisplay } from '../../../services/sessionAnalysisService';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import logger from '../../../utils/logger';

// Activity icon mapping
const ACTIVITY_ICONS: Partial<Record<ActivityType, typeof MousePointer>> = {
  page_view: Eye,
  click: MousePointer,
  button_click: MousePointer,
  link_click: ExternalLink,
  session_start: PlayCircle,
  session_end: LogOut,
  signup: User,
  login: LogIn,
  logout: LogOut,
  error: AlertCircle,
  checkout_start: CreditCard,
  checkout_complete: CheckCircle,
  practice_start: PlayCircle,
  practice_end: CheckCircle,
  lesson_start: PlayCircle,
  lesson_complete: CheckCircle,
};

// Activity colors
const ACTIVITY_COLORS: Partial<Record<ActivityType, string>> = {
  page_view: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  click: 'text-gray-500 bg-gray-50 dark:bg-gray-700',
  button_click: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20',
  link_click: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20',
  session_start: 'text-green-500 bg-green-50 dark:bg-green-900/20',
  session_end: 'text-red-500 bg-red-50 dark:bg-red-900/20',
  signup: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
  login: 'text-green-500 bg-green-50 dark:bg-green-900/20',
  logout: 'text-red-500 bg-red-50 dark:bg-red-900/20',
  error: 'text-red-500 bg-red-50 dark:bg-red-900/20',
  checkout_start: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  checkout_complete: 'text-green-500 bg-green-50 dark:bg-green-900/20',
};

// Safely convert Firestore timestamp/date to valid Date object
// Handles: Timestamp, Date, { seconds, nanoseconds }, undefined/null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toSafeDate = (ts: any): Date => {
  if (!ts) return new Date(0); // Fallback for null/undefined
  if (ts instanceof Timestamp) return ts.toDate();
  if (ts instanceof Date) return ts;
  // Handle plain object { seconds, nanoseconds } from Firestore serialization
  if (typeof ts === 'object' && typeof ts.seconds === 'number') {
    return new Date(ts.seconds * 1000);
  }
  // Handle numeric timestamp (milliseconds)
  if (typeof ts === 'number') return new Date(ts);
  // Last resort
  const d = new Date(ts);
  return isNaN(d.getTime()) ? new Date(0) : d;
};

// Format timestamp
const formatTimestamp = (ts: Date | Timestamp): string => {
  const date = toSafeDate(ts);
  return format(date, 'h:mm:ss a');
};

// Format duration ms to readable
const formatDuration = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${Math.round(ms / 1000)}s`;
  const mins = Math.floor(ms / 60000);
  const secs = Math.round((ms % 60000) / 1000);
  return `${mins}m ${secs}s`;
};

interface SessionDetailProps {
  userId: string;
  sessionId: string;
  session?: Session;
  onClose: () => void;
}

export function SessionDetailView({ userId, sessionId, session: initialSession, onClose }: SessionDetailProps) {
  const [session, setSession] = useState<Session | null>(initialSession || null);
  const [activities, setActivities] = useState<SessionActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedActivities, setExpandedActivities] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadSessionData = async () => {
      setLoading(true);
      try {
        // Load session if not provided
        if (!initialSession) {
          const loadedSession = await SessionRecordingService.getSession(userId, sessionId);
          setSession(loadedSession);
        }

        // Load activities
        const loadedActivities = await SessionRecordingService.getSessionActivities(userId, sessionId, 200);
        setActivities(loadedActivities);
      } catch (error) {
        logger.error('Failed to load session detail:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSessionData();
  }, [userId, sessionId, initialSession]);

  const toggleActivity = (activityId: string) => {
    setExpandedActivities(prev => {
      const next = new Set(prev);
      if (next.has(activityId)) {
        next.delete(activityId);
      } else {
        next.add(activityId);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Session not found</p>
        <Button variant="secondary" onClick={onClose} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const startTime = toSafeDate(session.startedAt);

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Session Timeline
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {formatDistanceToNow(startTime, { addSuffix: true })} • {format(startTime, 'MMM d, yyyy h:mm a')}
            </p>
          </div>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>

        {/* Session Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">User</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {session.userName || session.userEmail || userId.slice(0, 8)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {session.device?.isMobile ? (
              <Smartphone className="w-4 h-4 text-gray-400" />
            ) : (
              <Monitor className="w-4 h-4 text-gray-400" />
            )}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Device</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {session.device?.isMobile ? 'Mobile' : 'Desktop'} 
                {session.device?.viewportWidth ? ` (${session.device.viewportWidth}×${session.device.viewportHeight})` : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {session.duration ? formatDuration(session.duration) : '—'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Activity</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {session.pageCount || 0} pages, {session.clickCount || 0} clicks
              </p>
            </div>
          </div>
        </div>

        {/* Entry/Exit Info */}
        <div className="flex items-center gap-4 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-green-500">●</span>
            <span className="text-gray-500 dark:text-gray-400">Entry:</span>
            <span className="font-medium text-gray-900 dark:text-white">{session.entry?.pageName || session.entry?.page || '/'}</span>
          </div>
          {session.exit && (
            <div className="flex items-center gap-2">
              <span className="text-red-500">●</span>
              <span className="text-gray-500 dark:text-gray-400">Exit:</span>
              <span className="font-medium text-gray-900 dark:text-white">{session.exit.pageName || session.exit.page}</span>
            </div>
          )}
          {session.entry?.referrer && session.entry.referrer !== 'direct' && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400 truncate max-w-[200px]" title={session.entry.referrer}>
                {session.entry.referrer}
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* Activity Timeline */}
      <Card className="p-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Activity Timeline ({activities.length} events)
        </h4>

        {activities.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No activities recorded yet</p>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />

            <div className="space-y-2">
              {activities.map((activity, idx) => {
                const Icon = ACTIVITY_ICONS[activity.type] || Eye;
                const colorClass = ACTIVITY_COLORS[activity.type] || 'text-gray-500 bg-gray-50 dark:bg-gray-700';
                const isExpanded = expandedActivities.has(activity.id || `${idx}`);
                const hasDetails = activity.details && Object.keys(activity.details).length > 0;

                return (
                  <div key={activity.id || idx} className="relative flex items-start gap-3 pl-1">
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0 z-10`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div 
                        className={`flex items-center gap-2 py-1.5 ${hasDetails ? 'cursor-pointer' : ''}`}
                        onClick={() => hasDetails && toggleActivity(activity.id || `${idx}`)}
                      >
                        {hasDetails && (
                          isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          )
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {activity.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatTimestamp(activity.timestamp)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {activity.pageName}
                            {activity.details?.element && (
                              <span className="text-gray-400 ml-2">
                                → {activity.details.element}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {isExpanded && hasDetails && (
                        <div className="ml-6 mt-1 mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs">
                          <pre className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap overflow-x-auto">
                            {JSON.stringify(activity.details, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ============================================================================
// Recent Activity List Component (for dashboard)
// ============================================================================

export interface RecentActivityItem {
  userId: string;
  userEmail?: string;
  userName?: string;
  session: Session;
  activities: SessionActivity[];
}

interface RecentActivityListProps {
  activities: RecentActivityItem[];
  loading: boolean;
  onRefresh: () => void;
  onViewSession: (userId: string, sessionId: string, session: Session) => void;
}

type SortField = 'time' | 'user' | 'pages' | 'clicks' | 'duration' | 'exitPage';
type SortDirection = 'asc' | 'desc';

// ============================================================================
// AI Analysis Modal Component
// ============================================================================

interface AIAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
  activities: SessionActivity[];
  userName?: string;
  userEmail?: string;
}

function AIAnalysisModal({ isOpen, onClose, session, activities, userName, userEmail }: AIAnalysisModalProps) {
  const [analysis, setAnalysis] = useState<SessionAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset analysis when session changes
  useEffect(() => {
    if (session?.id) {
      setAnalysis(null);
      setError(null);
      setLoading(false);
    }
  }, [session?.id]);

  // Auto-run analysis when modal opens with a new session
  useEffect(() => {
    if (isOpen && session && !analysis && !loading) {
      runAnalysis();
    }
  }, [isOpen, session?.id]);

  const runAnalysis = async () => {
    if (!session) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeSession(session, activities, userName, userEmail);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const scoreColor = analysis ? (
    analysis.sessionScore >= 7 ? 'text-green-600 dark:text-green-400' :
    analysis.sessionScore >= 4 ? 'text-yellow-600 dark:text-yellow-400' :
    'text-red-600 dark:text-red-400'
  ) : '';

  const priorityColors = {
    critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
  };

  const significanceColors = {
    positive: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
    neutral: 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700',
    negative: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
    critical: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity" 
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">AI Session Analysis</h2>
                <p className="text-white/80 text-sm">
                  {userName || userEmail || 'Anonymous'} • {session?.pageCount || 0} pages • {Math.round((session?.duration || 0) / 1000)}s
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-pulse" />
                  <Loader2 className="w-8 h-8 text-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Analyzing session with AI...</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">This may take 10-15 seconds</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Analysis Failed</span>
                </div>
                <p className="mt-2 text-red-700 dark:text-red-300">{error}</p>
                <Button onClick={runAnalysis} variant="secondary" className="mt-3">
                  Try Again
                </Button>
              </div>
            )}

            {analysis && !loading && (
              <div className="space-y-6">
                {/* Score & Type */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${scoreColor}`}>
                      {analysis.sessionScore}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">/ 10</div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      analysis.sessionType === 'intent-to-convert' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      analysis.sessionType === 'learning' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      analysis.sessionType === 'exploration' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                      analysis.sessionType === 'confused' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {analysis.sessionType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{analysis.journeySummary}</p>
                  </div>
                </div>

                {/* User Intent */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    User Intent
                  </h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-blue-800 dark:text-blue-400">
                      <span className="font-medium">Goal:</span> {analysis.userIntent.primaryGoal}
                    </p>
                    <p className="text-blue-800 dark:text-blue-400">
                      <span className="font-medium">Achieved:</span> {analysis.userIntent.achievedGoal ? '✅ Yes' : '❌ No'}
                    </p>
                    {analysis.userIntent.blockers.length > 0 && (
                      <div className="mt-2">
                        <span className="font-medium text-blue-800 dark:text-blue-400">Blockers:</span>
                        <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 text-sm">
                          {analysis.userIntent.blockers.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Moments */}
                {analysis.keyMoments.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Key Moments
                    </h3>
                    <div className="space-y-2">
                      {analysis.keyMoments.map((moment, i) => (
                        <div 
                          key={i}
                          className={`p-3 rounded-lg border ${significanceColors[moment.significance]}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-gray-500">{moment.timestamp}</span>
                            <span className="font-medium text-gray-900 dark:text-white">{moment.action}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{moment.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Drop-off Analysis */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Why They Dropped Off
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                      analysis.dropOffAnalysis.confidenceLevel === 'high' ? 'bg-green-200 text-green-800' :
                      analysis.dropOffAnalysis.confidenceLevel === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {analysis.dropOffAnalysis.confidenceLevel} confidence
                    </span>
                  </h3>
                  <p className="mt-2 text-amber-800 dark:text-amber-400 font-medium">
                    {analysis.dropOffAnalysis.likelyReason}
                  </p>
                  {analysis.dropOffAnalysis.supportingEvidence.length > 0 && (
                    <div className="mt-3">
                      <span className="text-sm font-medium text-amber-800 dark:text-amber-400">Evidence:</span>
                      <ul className="list-disc list-inside text-amber-700 dark:text-amber-300 text-sm">
                        {analysis.dropOffAnalysis.supportingEvidence.map((e, i) => <li key={i}>{e}</li>)}
                      </ul>
                    </div>
                  )}
                  {analysis.dropOffAnalysis.psychologicalFactors.length > 0 && (
                    <div className="mt-3">
                      <span className="text-sm font-medium text-amber-800 dark:text-amber-400">Psychological Factors:</span>
                      <ul className="list-disc list-inside text-amber-700 dark:text-amber-300 text-sm">
                        {analysis.dropOffAnalysis.psychologicalFactors.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Improvements */}
                {analysis.improvements.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Recommended Improvements
                    </h3>
                    <div className="space-y-3">
                      {analysis.improvements.map((imp, i) => (
                        <div 
                          key={i}
                          className={`p-4 rounded-lg border ${priorityColors[imp.priority]}`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold uppercase">{imp.priority}</span>
                            <span className="font-semibold">{imp.area}</span>
                          </div>
                          <p className="text-sm"><strong>Problem:</strong> {imp.problem}</p>
                          <p className="text-sm mt-1"><strong>Suggestion:</strong> {imp.suggestion}</p>
                          <p className="text-sm mt-1 opacity-80"><strong>Expected Impact:</strong> {imp.expectedImpact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Re-analyze button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button onClick={runAnalysis} variant="secondary" className="w-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Re-analyze Session
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecentActivityList({ 
  activities, 
  loading, 
  onRefresh, 
  onViewSession 
}: RecentActivityListProps) {
  const [sortField, setSortField] = useState<SortField>('time');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  
  // AI Analysis modal state
  const [analysisModal, setAnalysisModal] = useState<{
    isOpen: boolean;
    session: Session | null;
    activities: SessionActivity[];
    userName?: string;
    userEmail?: string;
  }>({ isOpen: false, session: null, activities: [] });

  const openAnalysisModal = (item: RecentActivityItem) => {
    setAnalysisModal({
      isOpen: true,
      session: item.session,
      activities: item.activities,
      userName: item.userName,
      userEmail: item.userEmail,
    });
  };

  const closeAnalysisModal = () => {
    setAnalysisModal({ isOpen: false, session: null, activities: [] });
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedActivities = [...activities]
    .filter(a => filterActive === null || a.session.isActive === filterActive)
    .sort((a, b) => {
      const dir = sortDirection === 'asc' ? 1 : -1;
      
      switch (sortField) {
        case 'time': {
          const aTime = toSafeDate(a.session.lastActivityAt).getTime();
          const bTime = toSafeDate(b.session.lastActivityAt).getTime();
          return (bTime - aTime) * dir;
        }
        case 'user':
          return ((a.userEmail || '').localeCompare(b.userEmail || '')) * dir;
        case 'pages':
          return ((a.session.pageCount || 0) - (b.session.pageCount || 0)) * dir;
        case 'clicks':
          return ((a.session.clickCount || 0) - (b.session.clickCount || 0)) * dir;
        case 'duration':
          return ((a.session.duration || 0) - (b.session.duration || 0)) * dir;
        case 'exitPage':
          return ((a.session.exit?.pageName || '').localeCompare(b.session.exit?.pageName || '')) * dir;
        default:
          return 0;
      }
    });

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th
      onClick={() => handleSort(field)}
      className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none"
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field && (
          <span className="text-blue-500">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterActive(null)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterActive === null
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            All Sessions
          </button>
          <button
            onClick={() => setFilterActive(true)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterActive === true
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Active Now
          </button>
          <button
            onClick={() => setFilterActive(false)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterActive === false
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Ended
          </button>
        </div>
        <Button variant="secondary" onClick={onRefresh} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <SortHeader field="user">User</SortHeader>
              <SortHeader field="time">Last Activity</SortHeader>
              <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Entry Page</th>
              <SortHeader field="exitPage">Exit/Current Page</SortHeader>
              <SortHeader field="pages">Pages</SortHeader>
              <SortHeader field="clicks">Clicks</SortHeader>
              <SortHeader field="duration">Duration</SortHeader>
              <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Status</th>
              <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && sortedActivities.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-500">
                  Loading recent activity...
                </td>
              </tr>
            ) : sortedActivities.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-500">
                  No sessions found. Activity tracking will appear here once users interact with the app.
                </td>
              </tr>
            ) : (
              sortedActivities.map(item => {
                const lastActivity = toSafeDate(item.session.lastActivityAt);
                
                // Find the last page view for "current"
                const lastPageView = item.activities.find(a => a.type === 'page_view');
                const currentPage = item.session.isActive 
                  ? lastPageView?.pageName || item.session.entry?.pageName
                  : item.session.exit?.pageName;

                return (
                  <tr 
                    key={item.session.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-2 px-3">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white truncate max-w-[150px]">
                          {item.userName || item.userEmail?.split('@')[0] || 'Anonymous'}
                        </div>
                        {item.userEmail && (
                          <div className="text-xs text-gray-400 truncate max-w-[150px]">
                            {item.userEmail}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      <div title={format(lastActivity, 'MMM d, yyyy h:mm:ss a')}>
                        {formatDistanceToNow(lastActivity, { addSuffix: true })}
                      </div>
                    </td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      <span className="truncate max-w-[120px] inline-block" title={item.session.entry?.page}>
                        {item.session.entry?.pageName || '—'}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span 
                        className={`truncate max-w-[120px] inline-block ${
                          item.session.isActive 
                            ? 'text-blue-600 dark:text-blue-400 font-medium' 
                            : 'text-red-600 dark:text-red-400'
                        }`}
                        title={item.session.exit?.page || lastPageView?.page}
                      >
                        {currentPage || '—'}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.session.pageCount || 0}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.session.clickCount || 0}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      {item.session.duration ? formatDuration(item.session.duration) : '—'}
                    </td>
                    <td className="py-2 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        item.session.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {item.session.isActive ? '● Active' : 'Ended'}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openAnalysisModal(item)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-medium rounded hover:from-purple-600 hover:to-blue-600 transition-all"
                          title="AI Analysis"
                        >
                          <Sparkles className="w-3 h-3" />
                          Review
                        </button>
                        <button
                          onClick={() => onViewSession(item.userId, item.session.id || '', item.session)}
                          className="text-blue-600 dark:text-blue-400 hover:underline text-xs font-medium"
                        >
                          Timeline →
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* AI Analysis Modal - key forces full re-mount when session changes */}
      <AIAnalysisModal
        key={analysisModal.session?.id || 'no-session'}
        isOpen={analysisModal.isOpen}
        onClose={closeAnalysisModal}
        session={analysisModal.session}
        activities={analysisModal.activities}
        userName={analysisModal.userName}
        userEmail={analysisModal.userEmail}
      />
    </div>
  );
}

export default SessionDetailView;

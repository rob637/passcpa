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
} from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { SessionRecordingService, Session, Activity as SessionActivity, ActivityType } from '../../../services/sessionRecordingService';
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

// Format timestamp
const formatTimestamp = (ts: Date | Timestamp): string => {
  const date = ts instanceof Timestamp ? ts.toDate() : new Date(ts);
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

  const startTime = session.startedAt instanceof Timestamp 
    ? session.startedAt.toDate() 
    : new Date(session.startedAt);

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

export function RecentActivityList({ 
  activities, 
  loading, 
  onRefresh, 
  onViewSession 
}: RecentActivityListProps) {
  const [sortField, setSortField] = useState<SortField>('time');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterActive, setFilterActive] = useState<boolean | null>(null);

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
          const aTime = a.session.lastActivityAt instanceof Timestamp 
            ? a.session.lastActivityAt.toMillis() 
            : new Date(a.session.lastActivityAt as Date).getTime();
          const bTime = b.session.lastActivityAt instanceof Timestamp 
            ? b.session.lastActivityAt.toMillis() 
            : new Date(b.session.lastActivityAt as Date).getTime();
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
                const lastActivity = item.session.lastActivityAt instanceof Timestamp
                  ? item.session.lastActivityAt.toDate()
                  : new Date(item.session.lastActivityAt as Date);
                
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
                      <button
                        onClick={() => onViewSession(item.userId, item.session.id || '', item.session)}
                        className="text-blue-600 dark:text-blue-400 hover:underline text-xs font-medium"
                      >
                        View Timeline →
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SessionDetailView;

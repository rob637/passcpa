/**
 * User Analytics Dashboard — Real-time visibility into user behavior
 * 
 * Key Metrics:
 * - User growth over time (signups by day/week/month)
 * - Active users (DAU/WAU/MAU)
 * - Cohort retention
 * - Course distribution
 * - Study engagement (questions answered, time spent)
 * - Subscription conversion funnel
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { format, subDays, startOfDay, startOfWeek, subWeeks } from 'date-fns';
import {
  ChevronLeft, Users, TrendingUp, Activity,
  RefreshCw, Download, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle, BookOpen, Zap, Search,
  ChevronRight,
} from 'lucide-react';
import { collection, query, getDocs, limit, getCountFromServer } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import { isAdminEmail } from '../../../config/adminConfig';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { CourseId } from '../../../types/course';
import logger from '../../../utils/logger';

// Types
interface UserDocument {
  id: string;
  email: string | null;
  displayName: string | null;
  createdAt?: { seconds: number } | null;
  updatedAt?: { seconds: number } | null;
  activeCourse?: CourseId;
  examSection?: string;
  onboardingCompleted?: Partial<Record<CourseId, boolean>>;
  subscription?: {
    tier?: string;
    status?: string;
  };
  signupSource?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}

interface AnalyticsState {
  users: UserDocument[];
  isLoading: boolean;
  error: string | null;
  dateRange: '7d' | '30d' | '90d' | 'all';
  totalUserCount: number;
  searchQuery: string;
  currentPage: number;
  pageSize: number;
}

// Chart colors
const COLORS = {
  primary: '#2563eb',
  success: '#16a34a',
  warning: '#d97706',
  error: '#dc2626',
  purple: '#7c3aed',
  cyan: '#0891b2',
};

const COURSE_COLORS: Record<string, string> = {
  cpa: '#2563eb',
  ea: '#16a34a',
  cma: '#7c3aed',
  cia: '#d97706',
  cisa: '#0891b2',
  cfp: '#dc2626',
};

export default function UserAnalyticsDashboard() {
  const { user, userProfile } = useAuth();
  const isAdmin = user && (userProfile?.isAdmin || isAdminEmail(user?.email));

  const [state, setState] = useState<AnalyticsState>({
    users: [],
    isLoading: true,
    error: null,
    dateRange: '30d',
    totalUserCount: 0,
    searchQuery: '',
    currentPage: 1,
    pageSize: 25,
  });

  const [activityData, setActivityData] = useState<{
    questionsAnswered: number;
    studyTimeMinutes: number;
    activeUsers24h: number;
    activeUsers7d: number;
  }>({
    questionsAnswered: 0,
    studyTimeMinutes: 0,
    activeUsers24h: 0,
    activeUsers7d: 0,
  });

  // Load users
  const loadData = useCallback(async () => {
    if (!isAdmin) return;
    setState(s => ({ ...s, isLoading: true, error: null }));

    try {
      // Get total user count from Firestore (accurate count, not limited)
      const totalUserCount = (await getCountFromServer(collection(db, 'users'))).data().count;

      // Load users (up to 2000 for analysis - increased from 500)
      // Note: We don't use orderBy('createdAt') because some legacy users lack this field
      // and Firestore excludes docs that don't have the orderBy field
      const usersQuery = query(
        collection(db, 'users'),
        limit(2000)
      );
      const usersSnap = await getDocs(usersQuery);
      const users: UserDocument[] = [];
      usersSnap.forEach(doc => {
        const data = doc.data();
        if (!data.deletedAt) {
          users.push({ id: doc.id, ...data } as UserDocument);
        }
      });
      // Sort client-side (newest first, users without createdAt go to end)
      users.sort((a, b) => {
        const aTime = a.createdAt?.seconds ?? 0;
        const bTime = b.createdAt?.seconds ?? 0;
        return bTime - aTime;
      });

      setState(s => ({ ...s, users, isLoading: false, totalUserCount }));

      // Calculate activity metrics
      const now = Date.now();
      const day = 24 * 60 * 60 * 1000;
      const week = 7 * day;

      const activeUsers24h = users.filter(u => {
        const updated = u.updatedAt?.seconds ? u.updatedAt.seconds * 1000 : 0;
        return now - updated < day;
      }).length;

      const activeUsers7d = users.filter(u => {
        const updated = u.updatedAt?.seconds ? u.updatedAt.seconds * 1000 : 0;
        return now - updated < week;
      }).length;

      setActivityData(prev => ({
        ...prev,
        activeUsers24h,
        activeUsers7d,
      }));

    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      logger.error('Error loading analytics', error);
      setState(s => ({
        ...s,
        isLoading: false,
        error: msg.includes('permission') ? 'Permission denied — ensure isAdmin: true in your user doc' : msg,
      }));
    }
  }, [isAdmin]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Compute metrics from user data
  const metrics = useMemo(() => {
    const users = state.users;
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    // Signups by day
    const signupsByDay: Record<string, number> = {};
    const rangeStart = state.dateRange === 'all' ? 0 :
      state.dateRange === '7d' ? now - 7 * day :
      state.dateRange === '30d' ? now - 30 * day : now - 90 * day;

    users.forEach(u => {
      if (!u.createdAt?.seconds) return;
      const ts = u.createdAt.seconds * 1000;
      if (ts < rangeStart) return;
      const dateStr = format(new Date(ts), 'MM/dd');
      signupsByDay[dateStr] = (signupsByDay[dateStr] || 0) + 1;
    });

    // Fill in missing days
    const days = state.dateRange === '7d' ? 7 : state.dateRange === '30d' ? 30 : 90;
    const signupChartData = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'MM/dd');
      signupChartData.push({
        date: dateStr,
        signups: signupsByDay[dateStr] || 0,
      });
    }

    // Course distribution
    const courseDistribution: Record<string, number> = {};
    users.forEach(u => {
      const course = u.activeCourse || 'unknown';
      courseDistribution[course] = (courseDistribution[course] || 0) + 1;
    });

    const courseChartData = Object.entries(courseDistribution)
      .filter(([k]) => k !== 'unknown')
      .map(([course, count]) => ({
        name: course.toUpperCase(),
        value: count,
        color: COURSE_COLORS[course] || '#6b7280',
      }));

    // Subscription status
    const subscriptionStatus = {
      free: 0,
      trial: 0,
      paid: 0,
      churned: 0,
    };

    users.forEach(u => {
      const tier = u.subscription?.tier || 'free';
      const status = u.subscription?.status;

      if (tier === 'free' || !tier) {
        subscriptionStatus.free++;
      } else if (status === 'trialing') {
        subscriptionStatus.trial++;
      } else if (status === 'active') {
        subscriptionStatus.paid++;
      } else if (status === 'canceled' || status === 'past_due') {
        subscriptionStatus.churned++;
      } else {
        subscriptionStatus.free++;
      }
    });

    // UTM source breakdown
    const utmSources: Record<string, number> = {};
    users.forEach(u => {
      const source = u.signupSource?.utm_source || 'direct';
      utmSources[source] = (utmSources[source] || 0) + 1;
    });

    const utmChartData = Object.entries(utmSources)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([source, count]) => ({
        source,
        count,
      }));

    // Onboarding completion
    const onboardingCompleted = users.filter(u => {
      if (!u.onboardingCompleted) return false;
      return Object.values(u.onboardingCompleted).some(v => v === true);
    }).length;

    // Today's signups
    const todayStart = startOfDay(new Date()).getTime();
    const todaySignups = users.filter(u => {
      if (!u.createdAt?.seconds) return false;
      return u.createdAt.seconds * 1000 >= todayStart;
    }).length;

    // This week's signups
    const weekStart = startOfWeek(new Date()).getTime();
    const weekSignups = users.filter(u => {
      if (!u.createdAt?.seconds) return false;
      return u.createdAt.seconds * 1000 >= weekStart;
    }).length;

    // Last week comparison
    const lastWeekStart = subWeeks(startOfWeek(new Date()), 1).getTime();
    const lastWeekEnd = weekStart;
    const lastWeekSignups = users.filter(u => {
      if (!u.createdAt?.seconds) return false;
      const ts = u.createdAt.seconds * 1000;
      return ts >= lastWeekStart && ts < lastWeekEnd;
    }).length;

    const weekOverWeekChange = lastWeekSignups > 0
      ? Math.round(((weekSignups - lastWeekSignups) / lastWeekSignups) * 100)
      : weekSignups > 0 ? 100 : 0;

    return {
      totalUsers: users.length,
      todaySignups,
      weekSignups,
      weekOverWeekChange,
      signupChartData,
      courseChartData,
      subscriptionStatus,
      utmChartData,
      onboardingCompleted,
      onboardingRate: users.length > 0 ? Math.round((onboardingCompleted / users.length) * 100) : 0,
      conversionRate: users.length > 0 ? Math.round((subscriptionStatus.paid / users.length) * 100) : 0,
      trialToPayRate: subscriptionStatus.trial + subscriptionStatus.paid > 0
        ? Math.round((subscriptionStatus.paid / (subscriptionStatus.trial + subscriptionStatus.paid)) * 100)
        : 0,
    };
  }, [state.users, state.dateRange]);

  // Export to CSV
  const exportToCsv = () => {
    const headers = ['Email', 'Name', 'Course', 'Signup Date', 'Subscription', 'UTM Source'];
    const rows = state.users.map(u => [
      u.email || '',
      u.displayName || '',
      u.activeCourse || '',
      u.createdAt?.seconds ? format(new Date(u.createdAt.seconds * 1000), 'yyyy-MM-dd') : '',
      u.subscription?.tier || 'free',
      u.signupSource?.utm_source || '',
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voraprep-users-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-500 dark:text-gray-400">You need admin privileges to view this page.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  User Analytics
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Real-time visibility into user behavior and growth
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Date Range Filter */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {(['7d', '30d', '90d'] as const).map(range => (
                  <button
                    key={range}
                    onClick={() => setState(s => ({ ...s, dateRange: range }))}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      state.dateRange === range
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <Button variant="secondary" onClick={loadData} leftIcon={RefreshCw}>
                Refresh
              </Button>
              <Button variant="secondary" onClick={exportToCsv} leftIcon={Download}>
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {state.error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400">
            {state.error}
          </div>
        )}

        {state.isLoading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <MetricCard
                icon={Users}
                label="Total Users"
                value={state.totalUserCount.toLocaleString()}
                trend={metrics.weekOverWeekChange}
                trendLabel={`${metrics.totalUsers.toLocaleString()} loaded`}
                color="blue"
              />
              <MetricCard
                icon={TrendingUp}
                label="This Week"
                value={metrics.weekSignups.toString()}
                subtext={`${metrics.todaySignups} today`}
                color="green"
              />
              <MetricCard
                icon={Activity}
                label="Active (24h)"
                value={activityData.activeUsers24h.toString()}
                subtext={`${activityData.activeUsers7d} in 7d`}
                color="purple"
              />
              <MetricCard
                icon={Zap}
                label="Conversion Rate"
                value={`${metrics.conversionRate}%`}
                subtext={`${metrics.subscriptionStatus.paid} paid users`}
                color="amber"
              />
            </div>

            {/* Charts Row 1 */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Signups Over Time */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Signups Over Time
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metrics.signupChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="signups"
                        stroke={COLORS.primary}
                        strokeWidth={2}
                        dot={{ fill: COLORS.primary, r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Course Distribution */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Course Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={metrics.courseChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {metrics.courseChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                        formatter={(value: number, name: string) => [`${value} users`, name]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Subscription Funnel */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Subscription Funnel
                </h3>
                <div className="space-y-3">
                  <FunnelBar
                    label="Free"
                    value={metrics.subscriptionStatus.free}
                    total={metrics.totalUsers}
                    color="gray"
                  />
                  <FunnelBar
                    label="Trial"
                    value={metrics.subscriptionStatus.trial}
                    total={metrics.totalUsers}
                    color="blue"
                  />
                  <FunnelBar
                    label="Paid"
                    value={metrics.subscriptionStatus.paid}
                    total={metrics.totalUsers}
                    color="green"
                  />
                  <FunnelBar
                    label="Churned"
                    value={metrics.subscriptionStatus.churned}
                    total={metrics.totalUsers}
                    color="red"
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Trial → Paid</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {metrics.trialToPayRate}%
                    </span>
                  </div>
                </div>
              </Card>

              {/* Traffic Sources */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Traffic Sources (UTM)
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metrics.utmChartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                      <YAxis
                        type="category"
                        dataKey="source"
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                        width={80}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                      />
                      <Bar dataKey="count" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Engagement Metrics */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Engagement
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Onboarding Rate</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {metrics.onboardingRate}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Completed Onboarding</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {metrics.onboardingCompleted}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active Last 7 Days</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {activityData.activeUsers7d}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* User Search & Recent Signups Table */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Users ({state.totalUserCount.toLocaleString()} total)
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={state.searchQuery}
                    onChange={(e) => setState(s => ({ ...s, searchQuery: e.target.value, currentPage: 1 }))}
                    className="pl-9 pr-4 py-2 w-full sm:w-64 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Email</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Name</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Course</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Status</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Source</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Signed Up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      // Filter users by search query
                      const filteredUsers = state.searchQuery.trim()
                        ? state.users.filter(u => {
                            const query = state.searchQuery.toLowerCase();
                            return (
                              (u.email?.toLowerCase().includes(query)) ||
                              (u.displayName?.toLowerCase().includes(query))
                            );
                          })
                        : state.users;
                      
                      // Paginate
                      const startIdx = (state.currentPage - 1) * state.pageSize;
                      const paginatedUsers = filteredUsers.slice(startIdx, startIdx + state.pageSize);
                      
                      return paginatedUsers.map(user => (
                      <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 px-3 text-gray-900 dark:text-white">{user.email || '—'}</td>
                        <td className="py-2 px-3 text-gray-900 dark:text-white">{user.displayName || '—'}</td>
                        <td className="py-2 px-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {(user.activeCourse || 'none').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            user.subscription?.tier === 'premium' || user.subscription?.status === 'active'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : user.subscription?.status === 'trialing'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {user.subscription?.status === 'active' ? 'Paid' :
                             user.subscription?.status === 'trialing' ? 'Trial' : 'Free'}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                          {user.signupSource?.utm_source || 'direct'}
                        </td>
                        <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                          {user.createdAt?.seconds
                            ? format(new Date(user.createdAt.seconds * 1000), 'MMM d, h:mm a')
                            : '—'}
                        </td>
                      </tr>
                    ));
                    })()}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {(() => {
                const filteredUsers = state.searchQuery.trim()
                  ? state.users.filter(u => {
                      const query = state.searchQuery.toLowerCase();
                      return (
                        (u.email?.toLowerCase().includes(query)) ||
                        (u.displayName?.toLowerCase().includes(query))
                      );
                    })
                  : state.users;
                const totalPages = Math.ceil(filteredUsers.length / state.pageSize);
                
                if (totalPages <= 1) return null;
                
                return (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Showing {((state.currentPage - 1) * state.pageSize) + 1}-{Math.min(state.currentPage * state.pageSize, filteredUsers.length)} of {filteredUsers.length}
                      {state.searchQuery && ` (filtered)`}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setState(s => ({ ...s, currentPage: Math.max(1, s.currentPage - 1) }))}
                        disabled={state.currentPage === 1}
                        className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Page {state.currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setState(s => ({ ...s, currentPage: Math.min(totalPages, s.currentPage + 1) }))}
                        disabled={state.currentPage === totalPages}
                        className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Subcomponents
// ============================================================================

function MetricCard({
  icon: Icon,
  label,
  value,
  trend,
  trendLabel,
  subtext,
  color,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  subtext?: string;
  color: 'blue' | 'green' | 'purple' | 'amber';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-0.5 text-xs font-medium ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {subtext || trendLabel || label}
        </div>
      </div>
    </Card>
  );
}

function FunnelBar({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: 'gray' | 'blue' | 'green' | 'red';
}) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const colorClasses = {
    gray: 'bg-gray-400',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
  };

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="font-medium text-gray-900 dark:text-white">{value}</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Daily CPA Analytics Dashboard
 * Tracks signups, engagement, and SMS delivery for the Daily CPA SMS product
 */

import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { format, subDays } from 'date-fns';
import {
  ChevronLeft, Users, MessageSquare, TrendingUp, CheckCircle,
  Activity, AlertCircle, RefreshCw, Download,
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { db } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import { isAdminEmail } from '../../../config/adminConfig';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import logger from '../../../utils/logger';

interface DailyCPAUser {
  uid: string;
  email: string;
  phone: string;
  status: 'active' | 'trialing' | 'canceled' | 'paused';
  tier: 'trial' | 'starter' | 'core' | 'pro';
  smsOptIn: boolean;
  createdAt: Date;
  section: string;
}

interface DailyCPAMetrics {
  totalSignups: number;
  activeUsers: number;
  trialingUsers: number;
  canceledUsers: number;
  avgAccuracy: number;
  totalSMSSent: number;
  conversionRate: number;
}

const COLORS = {
  active: '#10b981',
  trialing: '#f59e0b',
  canceled: '#ef4444',
  paused: '#gray',
  starter: '#3b82f6',
  core: '#8b5cf6',
  pro: '#ec4899',
};

export default function DailyCPADashboard() {
  const { user, userProfile } = useAuth();
  const isAdmin = user && (userProfile?.isAdmin || isAdminEmail(user?.email));

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<DailyCPAUser[]>([]);
  const [metrics, setMetrics] = useState<DailyCPAMetrics>({
    totalSignups: 0,
    activeUsers: 0,
    trialingUsers: 0,
    canceledUsers: 0,
    avgAccuracy: 0,
    totalSMSSent: 0,
    conversionRate: 0,
  });
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [signupsByDay, setSignupsByDay] = useState<Record<string, number>>({});
  const [statusDistribution, setStatusDistribution] = useState<Record<string, number>>({});
  const [tierDistribution, setTierDistribution] = useState<Record<string, number>>({});

  // Load data
  useEffect(() => {
    if (!isAdmin) return;
    loadData();
  }, [isAdmin, dateRange]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Get all Daily CPA users
      const usersSnap = await getDocs(collection(db, 'daily_users'));
      const usersData: DailyCPAUser[] = [];

      usersSnap.docs.forEach(doc => {
        const data = doc.data();
        usersData.push({
          uid: doc.id,
          email: data.email,
          phone: data.phone,
          status: data.status,
          tier: data.tier,
          smsOptIn: data.smsOptIn,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          section: data.section,
        });
      });

      setUsers(usersData);

      // Calculate signup by day
      const byDay: Record<string, number> = {};
      const byStatus: Record<string, number> = {};
      const byTier: Record<string, number> = {};

      usersData.forEach(u => {
        // By status
        byStatus[u.status] = (byStatus[u.status] || 0) + 1;

        // By tier
        byTier[u.tier] = (byTier[u.tier] || 0) + 1;

        // By day
        const dateStr = format(u.createdAt, 'yyyy-MM-dd');
        byDay[dateStr] = (byDay[dateStr] || 0) + 1;
      });

      setStatusDistribution(byStatus);
      setTierDistribution(byTier);
      setSignupsByDay(byDay);

      // Calculate metrics
      const smsLogsSnap = await getDocs(collection(db, 'daily_sms_log'));
      const funnelSnap = await getDocs(collection(db, 'daily_funnel_events'));

      const conversions = funnelSnap.docs.filter(d => d.data().event === 'signup').length;
      const conversionRate = usersData.length > 0 ? Math.round((conversions / usersData.length) * 100) : 0;

      setMetrics({
        totalSignups: usersData.length,
        activeUsers: usersData.filter(u => u.status === 'active').length,
        trialingUsers: usersData.filter(u => u.status === 'trialing').length,
        canceledUsers: usersData.filter(u => u.status === 'canceled').length,
        avgAccuracy: 0, // Would calculate from attempts
        totalSMSSent: smsLogsSnap.size,
        conversionRate: conversions,
      });
    } catch (error) {
      logger.error('Failed to load Daily CPA data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format data for charts
  const signupChartData = useMemo(() => {
    const daysToShow = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
    const chartData = [];
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const count = signupsByDay[dateStr] || 0;
      chartData.push({
        date: format(date, 'MMM dd'),
        signups: count,
      });
    }
    return chartData;
  }, [signupsByDay, dateRange]);

  const statusChartData = useMemo(() => {
    return Object.entries(statusDistribution).map(([status, count]) => ({
      name: status,
      value: count,
      color: COLORS[status as keyof typeof COLORS] || '#6b7280',
    }));
  }, [statusDistribution]);

  const tierChartData = useMemo(() => {
    return Object.entries(tierDistribution).map(([tier, count]) => ({
      name: tier,
      value: count,
      color: COLORS[tier as keyof typeof COLORS] || '#6b7280',
    }));
  }, [tierDistribution]);

  if (!isAdmin) {
    return (
      <div className="p-6">
        <p className="text-red-600">Access denied. Admin only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <ChevronLeft className="w-6 h-6" />
          <h1 className="text-3xl font-bold">Daily CPA Analytics</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Track SMS signups, engagement, and conversions</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Signups</span>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold">{metrics.totalSignups}</div>
            <p className="text-xs text-gray-500 mt-1">Lifetime</p>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Active</span>
              <Activity className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold">{metrics.activeUsers}</div>
            <p className="text-xs text-gray-500 mt-1">{metrics.totalSignups > 0 ? Math.round((metrics.activeUsers / metrics.totalSignups) * 100) : 0}% of signups</p>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">SMS Sent</span>
              <MessageSquare className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold">{metrics.totalSMSSent}</div>
            <p className="text-xs text-gray-500 mt-1">Total messages</p>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Conversions</span>
              <CheckCircle className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-bold">{metrics.conversionRate}</div>
            <p className="text-xs text-gray-500 mt-1">Trial→Paid conversions</p>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Signups Over Time */}
        <Card className="lg:col-span-2">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Signups Over Time</h2>
              <div className="flex gap-2">
                {(['7d', '30d', '90d'] as const).map(range => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`px-3 py-1 text-xs rounded ${
                      dateRange === range
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={signupChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="signups" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Status Distribution */}
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Tier Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Tier Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tierChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Users */}
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Signups</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {users
                .slice()
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .slice(0, 10)
                .map(u => (
                  <div key={u.uid} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{u.email}</p>
                        <p className="text-xs text-gray-500">{u.phone}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          u.status === 'active' ? 'bg-green-100 text-green-800' :
                          u.status === 'trialing' ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {u.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{u.tier}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{format(u.createdAt, 'MMM dd, yyyy HH:mm')}</p>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-2">
        <Button onClick={loadData} variant="secondary" className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>
    </div>
  );
}

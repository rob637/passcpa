/**
 * Referral System — User-facing & Admin management for referrals
 * 
 * Features:
 * - Unique referral codes per user
 * - Track referral signups
 * - Reward both referrer and referee
 * - Leaderboard of top referrers
 * - Admin view of all referrals
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ChevronLeft, Users, Gift, Trophy, Copy, CheckCircle,
  RefreshCw, Download, Zap, Star,
  Mail, Twitter, Facebook, Linkedin, MessageCircle,
} from 'lucide-react';
import {
  collection, query, getDocs, orderBy, limit, doc, where,
  serverTimestamp, increment, writeBatch,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import { isAdminEmail } from '../../../config/adminConfig';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import logger from '../../../utils/logger';

// Types
interface ReferralRecord {
  id: string;
  referrerId: string;
  referrerEmail: string;
  refereeId: string;
  refereeEmail: string;
  status: 'pending' | 'completed' | 'rewarded';
  createdAt: { seconds: number };
  rewardedAt?: { seconds: number };
}

interface ReferralStats {
  totalReferrals: number;
  completedReferrals: number;
  pendingRewards: number;
  topReferrers: Array<{
    userId: string;
    email: string;
    count: number;
    rewarded: number;
  }>;
}

// Referral rewards configuration
const REFERRAL_REWARDS = {
  referrer: {
    freeWeeks: 1,          // Extra free trial weeks
    xpBonus: 500,          // XP bonus
    badgeUnlock: true,     // Unlock special badge
  },
  referee: {
    extraTrialDays: 7,     // Extra trial days
    xpBonus: 200,          // Welcome XP boost
  },
  milestones: [
    { count: 5, reward: '1 Month Free', icon: '🥉' },
    { count: 10, reward: '3 Months Free', icon: '🥈' },
    { count: 25, reward: 'Lifetime Access', icon: '🥇' },
  ],
};

export default function ReferralSystemAdmin() {
  const { user, userProfile } = useAuth();
  const isAdmin = user && (userProfile?.isAdmin || isAdminEmail(user?.email));

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    completedReferrals: 0,
    pendingRewards: 0,
    topReferrers: [],
  });

  // Load referral data
  const loadData = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoading(true);
    setError(null);

    try {
      // Load recent referrals
      const referralsQuery = query(
        collection(db, 'referrals'),
        orderBy('createdAt', 'desc'),
        limit(100)
      );
      const referralsSnap = await getDocs(referralsQuery);
      const refs: ReferralRecord[] = [];
      referralsSnap.forEach(doc => {
        refs.push({ id: doc.id, ...doc.data() } as ReferralRecord);
      });
      setReferrals(refs);

      // Calculate stats
      const completed = refs.filter(r => r.status === 'completed' || r.status === 'rewarded').length;
      const pendingRewards = refs.filter(r => r.status === 'completed').length;

      // Get top referrers
      const referrerCounts: Record<string, { email: string; count: number; rewarded: number }> = {};
      refs.forEach(r => {
        if (!referrerCounts[r.referrerId]) {
          referrerCounts[r.referrerId] = { email: r.referrerEmail, count: 0, rewarded: 0 };
        }
        referrerCounts[r.referrerId].count++;
        if (r.status === 'rewarded') {
          referrerCounts[r.referrerId].rewarded++;
        }
      });

      const topReferrers = Object.entries(referrerCounts)
        .map(([userId, data]) => ({ userId, ...data }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setStats({
        totalReferrals: refs.length,
        completedReferrals: completed,
        pendingRewards,
        topReferrers,
      });

    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error('Error loading referrals', err);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Process pending rewards
  const processPendingRewards = async () => {
    const pending = referrals.filter(r => r.status === 'completed');
    if (pending.length === 0) {
      alert('No pending rewards to process');
      return;
    }

    if (!confirm(`Process ${pending.length} pending rewards?`)) return;

    try {
      const batch = writeBatch(db);
      
      for (const ref of pending) {
        // Mark as rewarded
        batch.update(doc(db, 'referrals', ref.id), {
          status: 'rewarded',
          rewardedAt: serverTimestamp(),
        });

        // Update referrer's referral count
        batch.update(doc(db, 'users', ref.referrerId), {
          referralCount: increment(1),
          'rewards.referralBonus': increment(REFERRAL_REWARDS.referrer.xpBonus),
        });
      }

      await batch.commit();
      alert(`Successfully processed ${pending.length} rewards!`);
      loadData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      alert('Error processing rewards: ' + msg);
    }
  };

  // Export to CSV
  const exportToCsv = () => {
    const headers = ['Referrer Email', 'Referee Email', 'Status', 'Date', 'Rewarded'];
    const rows = referrals.map(r => [
      r.referrerEmail,
      r.refereeEmail,
      r.status,
      r.createdAt?.seconds ? format(new Date(r.createdAt.seconds * 1000), 'yyyy-MM-dd') : '',
      r.rewardedAt?.seconds ? format(new Date(r.rewardedAt.seconds * 1000), 'yyyy-MM-dd') : '',
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voraprep-referrals-${format(new Date(), 'yyyy-MM-dd')}.csv`;
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
                  <Gift className="w-5 h-5 text-purple-500" />
                  Referral System
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Track and manage user referrals
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" onClick={loadData} leftIcon={RefreshCw}>
                Refresh
              </Button>
              <Button variant="secondary" onClick={exportToCsv} leftIcon={Download}>
                Export
              </Button>
              {stats.pendingRewards > 0 && (
                <Button variant="primary" onClick={processPendingRewards} leftIcon={Zap}>
                  Process {stats.pendingRewards} Rewards
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                icon={Users}
                label="Total Referrals"
                value={stats.totalReferrals}
                color="purple"
              />
              <StatCard
                icon={CheckCircle}
                label="Completed"
                value={stats.completedReferrals}
                color="green"
              />
              <StatCard
                icon={Gift}
                label="Pending Rewards"
                value={stats.pendingRewards}
                color="amber"
              />
              <StatCard
                icon={Trophy}
                label="Top Referrer"
                value={stats.topReferrers[0]?.count || 0}
                subtext={stats.topReferrers[0]?.email?.split('@')[0] || 'None'}
                color="blue"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Leaderboard */}
              <Card className="p-6 md:col-span-1">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Leaderboard
                </h3>
                <div className="space-y-3">
                  {stats.topReferrers.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No referrals yet</p>
                  ) : (
                    stats.topReferrers.map((referrer, idx) => (
                      <div
                        key={referrer.userId}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            idx === 0 ? 'bg-amber-100 text-amber-700' :
                            idx === 1 ? 'bg-gray-200 text-gray-600' :
                            idx === 2 ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white truncate max-w-[140px]">
                            {referrer.email.split('@')[0]}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                          {referrer.count}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* Reward Milestones */}
              <Card className="p-6 md:col-span-2">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Reward Milestones
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {REFERRAL_REWARDS.milestones.map((milestone, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-100 dark:border-purple-800 text-center"
                    >
                      <div className="text-3xl mb-2">{milestone.icon}</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {milestone.count} Referrals
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        {milestone.reward}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                    Per-Referral Rewards
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Referrer Gets:</div>
                      <ul className="list-disc list-inside text-gray-900 dark:text-white mt-1">
                        <li>{REFERRAL_REWARDS.referrer.freeWeeks} week free trial extension</li>
                        <li>{REFERRAL_REWARDS.referrer.xpBonus} XP bonus</li>
                        <li>Special "Recruiter" badge</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">New User Gets:</div>
                      <ul className="list-disc list-inside text-gray-900 dark:text-white mt-1">
                        <li>{REFERRAL_REWARDS.referee.extraTrialDays} extra trial days</li>
                        <li>{REFERRAL_REWARDS.referee.xpBonus} XP welcome bonus</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Referrals Table */}
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Recent Referrals
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Referrer</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">New User</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Status</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Date</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Rewarded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                          No referrals yet. Share the referral link to get started!
                        </td>
                      </tr>
                    ) : (
                      referrals.slice(0, 20).map(ref => (
                        <tr key={ref.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 px-3 text-gray-900 dark:text-white">{ref.referrerEmail}</td>
                          <td className="py-2 px-3 text-gray-900 dark:text-white">{ref.refereeEmail}</td>
                          <td className="py-2 px-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              ref.status === 'rewarded' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                              ref.status === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {ref.status}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                            {ref.createdAt?.seconds
                              ? format(new Date(ref.createdAt.seconds * 1000), 'MMM d, yyyy')
                              : '—'}
                          </td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                            {ref.rewardedAt?.seconds
                              ? format(new Date(ref.rewardedAt.seconds * 1000), 'MMM d')
                              : '—'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// User-Facing Referral Component (for integration in user dashboard)
// ============================================================================

export function UserReferralCard({ userId }: { userId: string }) {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0 });

  // Generate referral code from user ID
  const referralCode = userId.slice(0, 8).toUpperCase();
  const referralUrl = `${window.location.origin}/signup?ref=${referralCode}`;

  useEffect(() => {
    // Load user's referral stats
    const loadStats = async () => {
      try {
        const q = query(
          collection(db, 'referrals'),
          where('referrerId', '==', userId)
        );
        const snap = await getDocs(q);
        const total = snap.size;
        const pending = snap.docs.filter(d => d.data().status === 'pending').length;
        setStats({ total, pending });
      } catch (err) {
        logger.error('Error loading referral stats', err);
      }
    };
    loadStats();
  }, [userId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(referralUrl);
  const shareText = encodeURIComponent('I\'m using VoraPrep to study for my certification exam. Get 7 extra trial days with my link!');

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-100 dark:border-purple-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Gift className="w-5 h-5 text-purple-500" />
          Invite Friends
        </h3>
        {stats.total > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {stats.total} invited
            </span>
            {stats.pending > 0 && (
              <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
                {stats.pending} pending
              </span>
            )}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Give friends <strong>7 extra trial days</strong> and earn <strong>1 week free</strong> + <strong>500 XP</strong> for each signup!
      </p>

      {/* Referral Link */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 truncate">
          {referralUrl}
        </div>
        <Button variant="secondary" onClick={copyToClipboard}>
          {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>

      {/* Share buttons */}
      <div className="flex items-center gap-2">
        <a
          href={`mailto:?subject=Try%20VoraPrep%20for%20exam%20prep&body=${shareText}%20${shareUrl}`}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Twitter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Facebook className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=VoraPrep&summary=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </a>
        <a
          href={`sms:?body=${shareText}%20${shareUrl}`}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </a>
      </div>

      {/* Milestone Progress */}
      {stats.total > 0 && (
        <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Next milestone</span>
            <span className="font-medium text-purple-600 dark:text-purple-400">
              {stats.total < 5 ? `${5 - stats.total} more for 1 Month Free` :
               stats.total < 10 ? `${10 - stats.total} more for 3 Months Free` :
               stats.total < 25 ? `${25 - stats.total} more for Lifetime Access` :
               '🎉 All milestones unlocked!'}
            </span>
          </div>
          <div className="h-2 bg-purple-100 dark:bg-purple-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
              style={{
                width: `${Math.min(100, (stats.total / (stats.total < 5 ? 5 : stats.total < 10 ? 10 : 25)) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}

// ============================================================================
// Subcomponents
// ============================================================================

function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  color,
}: {
  icon: typeof Users;
  label: string;
  value: number | string;
  subtext?: string;
  color: 'purple' | 'green' | 'amber' | 'blue';
}) {
  const colorClasses = {
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  };

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{subtext || label}</div>
        </div>
      </div>
    </Card>
  );
}

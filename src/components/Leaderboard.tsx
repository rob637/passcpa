import React, { useState, useEffect } from 'react';
import { FEATURES } from '../config/featureFlags';
import {
  Users,
  Trophy,
  Flame,
  TrendingUp,
  Target,
  Clock,
  ChevronRight,
  Sparkles,
  Award,
  Zap,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useStudy } from '../hooks/useStudy';
import { useCourse } from '../providers/CourseProvider';
import {
  getUserRanking,
  getCommunityStats,
  getMotivationalMessage,
  recordDailyActivity,
  recordStreak,
  UserRanking,
  CommunityStats,
} from '../services/leaderboardService';
import { ExamSection } from '../types';
import { Card } from './common/Card';
import clsx from 'clsx';
import logger from '../utils/logger';

interface LeaderboardProps {
  compact?: boolean; // For dashboard widget mode
}

// Animated percentile ring
const PercentileRing: React.FC<{
  percentile: number;
  label: string;
  icon: React.ReactNode;
  color: string;
  size?: 'sm' | 'md';
}> = ({ percentile, label, icon, color, size = 'md' }) => {
  const radius = size === 'sm' ? 32 : 40;
  const stroke = size === 'sm' ? 6 : 8;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentile / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width={(radius + stroke) * 2}
          height={(radius + stroke) * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={radius + stroke}
            cy={radius + stroke}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-slate-200 dark:text-slate-700"
          />
          {/* Progress circle */}
          <circle
            cx={radius + stroke}
            cy={radius + stroke}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={clsx('font-bold', size === 'sm' ? 'text-lg' : 'text-2xl')}>
            {percentile}%
          </span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1 text-slate-600 dark:text-slate-400">
        {icon}
        <span className={clsx('font-medium', size === 'sm' ? 'text-xs' : 'text-sm')}>{label}</span>
      </div>
    </div>
  );
};

// Community activity pulse
const ActivityPulse: React.FC<{ count: number; label: string }> = ({ count, label }) => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="w-3 h-3 bg-success-500 rounded-full" />
      <div className="absolute inset-0 w-3 h-3 bg-success-500 rounded-full animate-ping opacity-75" />
    </div>
    <div>
      <div className="font-bold text-slate-900 dark:text-white">{count.toLocaleString()}</div>
      <div className="text-xs text-slate-600 dark:text-slate-400">{label}</div>
    </div>
  </div>
);

const Leaderboard: React.FC<LeaderboardProps> = ({ compact = false }) => {
  const { user } = useAuth();
  const { todayLog, currentStreak } = useStudy();
  const { courseId, course } = useCourse();
  
  const courseName = course?.name || courseId?.toUpperCase() || 'CPA';
  
  const [ranking, setRanking] = useState<UserRanking | null>(null);
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [motivationalMessage, setMotivationalMessage] = useState('');

  const section = (courseId?.toUpperCase() || 'FAR') as ExamSection;

  // Fetch ranking and community stats
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const questionsToday = todayLog?.questionsAttempted || 0;
        const minutesToday = todayLog?.studyTimeMinutes || 0;

        // Record activity for leaderboard (if user has studied)
        if (questionsToday > 0 || minutesToday > 0) {
          await recordDailyActivity(user.uid, section, questionsToday, minutesToday);
        }

        // Record streak
        if (currentStreak > 0) {
          await recordStreak(user.uid, currentStreak);
        }

        // Fetch rankings
        const [userRanking, stats] = await Promise.all([
          getUserRanking(section, questionsToday, minutesToday, currentStreak),
          getCommunityStats(),
        ]);

        setRanking(userRanking);
        setCommunityStats(stats);
        setMotivationalMessage(getMotivationalMessage(userRanking, section));
      } catch (error) {
        logger.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, todayLog, currentStreak, section]);

  if (loading) {
    return (
      <Card className={clsx(
        'p-6',
        compact ? 'animate-pulse' : ''
      )}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-lg" />
      </Card>
    );
  }

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
        <div className="flex items-center gap-3 mb-3">
          <Users className="w-6 h-6 text-primary-600" />
          <h3 className="font-semibold text-slate-900">Join the Community</h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Sign in to see how you compare to other {courseName} candidates and track your progress together!
        </p>
        <a
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Sign In <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  // Compact widget for dashboard
  if (compact) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Your Ranking</h3>
          </div>
          {FEATURES.community && (
            <a
              href="/community"
              className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              View All <ChevronRight className="w-3 h-3" />
            </a>
          )}
        </div>

        {motivationalMessage && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 mb-4 border border-amber-200">
            <p className="text-sm text-amber-800 font-medium">{motivationalMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {ranking?.questionsPercentile || 50}%
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Questions</div>
          </div>
          <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {ranking?.minutesPercentile || 50}%
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Study Time</div>
          </div>
          <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {ranking?.streakPercentile || 50}%
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Streak</div>
          </div>
        </div>

        {communityStats && communityStats.todayActive >= 20 && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="text-slate-600">Studying with you today:</span>
            <span className="font-semibold text-slate-900 flex items-center gap-1">
              <Users className="w-4 h-4 text-primary-500" />
              {communityStats.todayActive.toLocaleString()} candidates
            </span>
          </div>
        )}
      </Card>
    );
  }

  // Full leaderboard view
  return (
    <div className="space-y-6">
      {/* Header with motivational message */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Community Leaderboard</h2>
            <p className="text-primary-200 text-sm">See how you compare to fellow {section} candidates</p>
          </div>
        </div>

        {motivationalMessage && (
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
              <p className="text-lg font-medium">{motivationalMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* Percentile Rankings */}
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary-600" />
          Your Percentile Rankings
        </h3>

        <div className="grid grid-cols-3 gap-6">
          <PercentileRing
            percentile={ranking?.questionsPercentile || 50}
            label="Questions"
            icon={<Target className="w-4 h-4" />}
            color={ranking?.questionsPercentile && ranking.questionsPercentile >= 75 ? '#22c55e' : ranking?.questionsPercentile && ranking.questionsPercentile >= 50 ? '#3b82f6' : '#f59e0b'}
          />
          <PercentileRing
            percentile={ranking?.minutesPercentile || 50}
            label="Study Time"
            icon={<Clock className="w-4 h-4" />}
            color={ranking?.minutesPercentile && ranking.minutesPercentile >= 75 ? '#22c55e' : ranking?.minutesPercentile && ranking.minutesPercentile >= 50 ? '#3b82f6' : '#f59e0b'}
          />
          <PercentileRing
            percentile={ranking?.streakPercentile || 50}
            label="Streak"
            icon={<Flame className="w-4 h-4" />}
            color={ranking?.streakPercentile && ranking.streakPercentile >= 75 ? '#22c55e' : ranking?.streakPercentile && ranking.streakPercentile >= 50 ? '#3b82f6' : '#f59e0b'}
          />
        </div>

        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
            {ranking?.questionsPercentile && ranking.questionsPercentile >= 75 ? (
              <>
                <span className="font-medium text-success-600">Outstanding!</span> You're outperforming most {section} candidates today.
              </>
            ) : ranking?.questionsPercentile && ranking.questionsPercentile >= 50 ? (
              <>
                <span className="font-medium text-primary-600">Great progress!</span> You're ahead of the curve. Keep it up!
              </>
            ) : (
              <>
                <span className="font-medium text-amber-600">Every question counts!</span> Consistency beats intensity.
              </>
            )}
          </p>
        </div>
      </Card>

      {/* Community Activity */}
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-600" />
          Community Activity
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ActivityPulse
            count={communityStats?.todayActive || 0}
            label="Studying Today"
          />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">{communityStats?.avgQuestionsToday || 0}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Avg Questions/Day</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">{communityStats?.avgMinutesToday || 0}m</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Avg Study Time</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">
                {communityStats?.topStreaks?.[0] || 0} days
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Top Streak</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Section Breakdown */}
      {communityStats?.sectionBreakdown && Object.keys(communityStats.sectionBreakdown).length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            Activity by Section
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(communityStats.sectionBreakdown)
              .filter(([, stats]) => stats !== undefined)
              .map(([sec, stats]) => (
              <div
                key={sec}
                className={clsx(
                  'p-4 rounded-lg border-2 transition-all',
                  sec === section
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 dark:text-white">{sec}</span>
                  {sec === section && (
                    <span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">
                      You
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-medium">{stats!.students}</span> students
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {stats!.avgQuestions} avg questions
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Encouragement footer */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">You're Not Alone</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {communityStats?.todayActive || 0} other {courseName} candidates are studying right now.
              Every question you answer brings you closer to passing. The {courseName} journey is tough,
              but you're making progress every day. Keep going! 💪
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

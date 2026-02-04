import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Lock, Flame, Target, Zap, Clock, Star, Gift, LucideIcon, Share2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import {
  ACHIEVEMENTS,
  checkAchievements,
  getAchievementProgress,
  getAchievementsByCategory,
} from '../../services/achievements';
import feedback from '../../services/feedback';
import { celebrateAchievement } from '../../utils/confetti';
import clsx from 'clsx';
import { useTabKeyboard, useModalKeyboard } from '../../hooks/useKeyboardNavigation';
import ShareableAchievementCard from '../ShareableAchievementCard';

// Types
interface CategoryInfo {
  name: string;
  icon: LucideIcon;
  color: 'amber' | 'primary' | 'success' | 'warning' | 'slate' | 'error';
}

const CATEGORY_INFO: Record<string, CategoryInfo> = {
  streak: { name: 'Streaks', icon: Flame, color: 'amber' },
  questions: { name: 'Questions', icon: Target, color: 'primary' },
  accuracy: { name: 'Accuracy', icon: Zap, color: 'success' },
  mastery: { name: 'Mastery', icon: Star, color: 'warning' },
  time: { name: 'Time', icon: Clock, color: 'slate' },
  milestone: { name: 'Milestones', icon: Gift, color: 'error' },
  feature: { name: 'Features', icon: Trophy, color: 'primary' },
};

interface UserStats {
  totalQuestions: number;
  totalCorrect: number;
  accuracy: number;
  currentStreak?: number;
  dailyGoalMet?: boolean;
  topics?: Record<string, any>;
  [key: string]: any;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string | React.ReactNode;
  category: string;
  requirement: any;
  points: number;
}

const Achievements: React.FC = () => {
  const { user, userProfile } = useAuth();
  const { currentStreak, todayLog } = useStudy();
  const [earnedAchievements, setEarnedAchievements] = useState<string[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnlocked, setShowUnlocked] = useState<Achievement | null>(null);
  const [showShareCard, setShowShareCard] = useState<Achievement | null>(null);

  // Load user stats and achievements
  useEffect(() => {
    if (!user?.uid) return;

    // Subscribe to achievements
    const achievementsRef = doc(db, 'users', user.uid, 'achievements', 'earned');
    const unsubAchievements = onSnapshot(achievementsRef, (snapshot) => {
      if (snapshot.exists()) {
        setEarnedAchievements(snapshot.data().list || []);
      }
    });

    // Load user stats
    const loadStats = async () => {
      const progressRef = doc(db, 'users', user.uid, 'progress', 'stats');
      const snap = await getDoc(progressRef);
      if (snap.exists()) {
        setUserStats(snap.data() as UserStats);
      } else {
        setUserStats({
          totalQuestions: 0,
          totalCorrect: 0,
          accuracy: 0,
        });
      }
    };

    loadStats();
    return () => unsubAchievements();
  }, [user?.uid]);

  // Check for new achievements
  useEffect(() => {
    if (!user?.uid || !userStats) return;

    const checkNewAchievements = async () => {
      const stats: UserStats = {
        ...userStats,
        currentStreak,
        dailyGoalMet: (todayLog?.earnedPoints || 0) >= (todayLog?.goalPoints || 100),
      };

      const newlyUnlocked: Achievement[] = checkAchievements(stats, earnedAchievements);

      if (newlyUnlocked.length > 0) {
        // Show celebration
        setShowUnlocked(newlyUnlocked[0]);
        feedback.levelUp();
        celebrateAchievement();

        // Save to Firestore
        const achievementsRef = doc(db, 'users', user.uid, 'achievements', 'earned');
        await setDoc(
          achievementsRef,
          {
            list: [...earnedAchievements, ...newlyUnlocked.map((a) => a.id)],
            lastUnlocked: new Date(),
            totalPoints: (earnedAchievements.length + newlyUnlocked.length) * 100, // simplified
          },
          { merge: true }
        );
      }
    };

    checkNewAchievements();
  }, [user?.uid, userStats, currentStreak, todayLog, earnedAchievements]);

  const categories = Object.keys(CATEGORY_INFO);
  const allTabs = ['all', ...categories];

  // Keyboard navigation for category tabs
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const { tabListProps, getTabProps } = useTabKeyboard(
    allTabs,
    selectedCategory,
    handleCategoryChange
  );

  // Modal keyboard handling
  const handleCloseModal = useCallback(() => {
    setShowUnlocked(null);
  }, []);

  useModalKeyboard({ onClose: handleCloseModal, enabled: !!showUnlocked });

  const filteredAchievements: Achievement[] =
    selectedCategory === 'all'
      ? Object.values(ACHIEVEMENTS)
      : getAchievementsByCategory(selectedCategory);

  const totalEarned = earnedAchievements.length;
  const totalAchievements = Object.keys(ACHIEVEMENTS).length;
  const earnedPoints = earnedAchievements.reduce((sum, id) => {
    return sum + (ACHIEVEMENTS[id as keyof typeof ACHIEVEMENTS]?.points || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-6 pb-16">
        <h1 className="text-2xl font-bold mb-2">Achievements</h1>
        <p className="text-primary-100">Track your learning milestones</p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold">{totalEarned}</div>
            <div className="text-xs text-primary-200">Unlocked</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold">{totalAchievements - totalEarned}</div>
            <div className="text-xs text-primary-200">Remaining</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold">{earnedPoints}</div>
            <div className="text-xs text-primary-200">Points</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 -mt-8 mb-4">
        <div 
          className="bg-white rounded-xl shadow-sm p-2 flex gap-1 overflow-x-auto scrollbar-hide"
          {...tabListProps}
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={clsx(
              'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0',
              selectedCategory === 'all'
                ? 'bg-primary-100 text-primary-700'
                : 'text-slate-600 hover:bg-slate-100'
            )}
            {...getTabProps('all')}
          >
            All
          </button>
          {categories.map((cat) => {
            const info = CATEGORY_INFO[cat];
            if (!info) return null;
            const Icon = info.icon;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={clsx(
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 flex-shrink-0',
                  selectedCategory === cat
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
                {...getTabProps(cat)}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{info.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredAchievements.map((achievement) => {
          const isEarned = earnedAchievements.includes(achievement.id);
          const progress =
            !isEarned && userStats && (currentStreak !== undefined)
              ? getAchievementProgress(achievement.id, { 
                  ...userStats, 
                  currentStreak 
                })
              : null;

          return (
            <div
              key={achievement.id}
              className={clsx(
                'bg-white rounded-xl p-4 flex items-start gap-4 transition-all',
                isEarned
                  ? 'border-2 border-success-200 shadow-sm'
                  : 'border border-slate-200 opacity-70'
              )}
            >
              {/* Icon */}
              <div
                className={clsx(
                  'w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0',
                  isEarned ? 'bg-success-100' : 'bg-slate-100'
                )}
              >
                {isEarned ? achievement.icon : <Lock className="w-5 h-5 text-slate-600" />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={clsx(
                      'font-semibold',
                      isEarned ? 'text-slate-900' : 'text-slate-600'
                    )}
                  >
                    {achievement.name}
                  </h3>
                  <span
                    className={clsx(
                      'text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0',
                      isEarned ? 'bg-success-100 text-success-700' : 'bg-slate-100 text-slate-600'
                    )}
                  >
                    {achievement.points} pts
                  </span>
                </div>
                <p
                  className={clsx('text-sm mt-0.5', isEarned ? 'text-slate-600' : 'text-slate-600')}
                >
                  {achievement.description}
                </p>

                {/* Progress bar for unearned */}
                {progress && progress.target > 1 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>
                        {progress.current} / {progress.target}
                      </span>
                      <span>{Math.round((progress.current / progress.target) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, (progress.current / progress.target) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Share button for earned achievements */}
                {isEarned && (
                  <button
                    onClick={() => setShowShareCard(achievement)}
                    className="mt-2 flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share achievement
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Unlock Celebration Modal */}
      {showUnlocked && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-title"
        >
          <div
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
            onClick={() => setShowUnlocked(null)}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-2xl p-8 text-center max-w-sm w-full animate-bounce-in">
            <div className="w-20 h-20 bg-gradient-to-br from-warning-400 to-warning-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg" aria-hidden="true">
              {showUnlocked.icon}
            </div>
            <h2 id="achievement-title" className="text-xl font-bold text-slate-900 mb-1">Achievement Unlocked!</h2>
            <h3 className="text-lg font-semibold text-primary-600 mb-2">{showUnlocked.name}</h3>
            <p className="text-slate-600 mb-4">{showUnlocked.description}</p>
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm font-medium">
              +{showUnlocked.points} points
            </div>
            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => {
                  setShowShareCard(showUnlocked);
                  setShowUnlocked(null);
                }} 
                className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button 
                onClick={() => setShowUnlocked(null)} 
                className="flex-1 btn-primary py-3"
                autoFocus
              >
                Awesome!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Card Modal */}
      {showShareCard && (
        <ShareableAchievementCard
          achievement={showShareCard}
          userName={userProfile?.displayName?.split(' ')[0]}
          streak={currentStreak}
          onClose={() => setShowShareCard(null)}
        />
      )}
    </div>
  );
};

export default Achievements;

/**
 * ShareNudge - Contextual, non-intrusive share prompts
 * 
 * Shows at natural moments to encourage word-of-mouth sharing:
 * - Dashboard: periodic nudge (every ~5th visit, dismissible with 7-day cooldown)
 * - Practice results: after milestone sessions (100, 250, 500, 1000 questions)
 * - Streak milestones: 7-day, 14-day, 30-day streaks
 * 
 * Each trigger shows at most once — after dismissal or sharing, a 7-day cooldown applies.
 * Never pushy: always a single tap to dismiss.
 */

import { useState, useEffect, useCallback } from 'react';
import { Users, Share2, X, Flame, Target, Award } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../providers/CourseProvider';
import { shareReferralLink, getOrCreateReferralCode } from '../../services/referral';
import clsx from 'clsx';
import logger from '../../utils/logger';

// ============================================================================
// TYPES
// ============================================================================

type NudgeTrigger = 
  | 'dashboard_periodic'
  | 'streak_milestone'
  | 'questions_milestone'
  | 'high_score';

interface ShareNudgeProps {
  /** What triggered this nudge */
  trigger: NudgeTrigger;
  /** For streak nudges: the streak count */
  streak?: number;
  /** For question nudges: total questions answered */
  totalQuestions?: number;
  /** For high score: the score percentage */
  score?: number;
  /** Compact card style (for embedding in lists) */
  compact?: boolean;
}

// ============================================================================
// COOLDOWN LOGIC
// ============================================================================

const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const STORAGE_KEY = 'share_nudge_state';

interface NudgeState {
  lastDismissedAt: number;
  lastSharedAt: number;
  dashboardVisitCount: number;
  triggersShown: string[]; // Track which milestone triggers have been shown
}

function getNudgeState(): NudgeState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { lastDismissedAt: 0, lastSharedAt: 0, dashboardVisitCount: 0, triggersShown: [] };
}

function saveNudgeState(state: NudgeState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

function isOnCooldown(): boolean {
  const state = getNudgeState();
  const lastAction = Math.max(state.lastDismissedAt, state.lastSharedAt);
  return Date.now() - lastAction < COOLDOWN_MS;
}

function markDismissed(): void {
  const state = getNudgeState();
  state.lastDismissedAt = Date.now();
  saveNudgeState(state);
}

function markShared(): void {
  const state = getNudgeState();
  state.lastSharedAt = Date.now();
  saveNudgeState(state);
}

function incrementDashboardVisit(): number {
  const state = getNudgeState();
  state.dashboardVisitCount = (state.dashboardVisitCount || 0) + 1;
  saveNudgeState(state);
  return state.dashboardVisitCount;
}

function hasTriggerBeenShown(triggerId: string): boolean {
  const state = getNudgeState();
  return state.triggersShown?.includes(triggerId) || false;
}

function markTriggerShown(triggerId: string): void {
  const state = getNudgeState();
  if (!state.triggersShown) state.triggersShown = [];
  if (!state.triggersShown.includes(triggerId)) {
    state.triggersShown.push(triggerId);
  }
  saveNudgeState(state);
}

// ============================================================================
// VISIBILITY HOOKS
// ============================================================================

/**
 * Hook to check if a dashboard share nudge should show.
 * Shows every ~5th dashboard visit, with 7-day cooldown after dismiss/share.
 */
export function useDashboardShareNudge(): boolean {
  const [shouldShow, setShouldShow] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    const visitCount = incrementDashboardVisit();
    // Show every 5th visit, but not on first few visits (let users settle in)
    const isEligibleVisit = visitCount >= 5 && visitCount % 5 === 0;
    
    setShouldShow(isEligibleVisit && !isOnCooldown());
  }, [user]);

  return shouldShow;
}

/**
 * Check if a streak milestone nudge should show.
 * Shows once per milestone threshold.
 */
export function shouldShowStreakNudge(streak: number): boolean {
  if (isOnCooldown()) return false;
  
  const milestones = [7, 14, 30, 60, 100];
  const milestone = milestones.find(m => streak === m);
  if (!milestone) return false;
  
  const triggerId = `streak_${milestone}`;
  return !hasTriggerBeenShown(triggerId);
}

/**
 * Check if a questions milestone nudge should show.
 * Shows once per milestone threshold.
 */
export function shouldShowQuestionsMilestone(totalQuestions: number): boolean {
  if (isOnCooldown()) return false;
  
  const milestones = [100, 250, 500, 1000, 2500, 5000];
  // Find the highest milestone the user has reached
  const milestone = [...milestones].reverse().find(m => totalQuestions >= m);
  if (!milestone) return false;
  
  const triggerId = `questions_${milestone}`;
  return !hasTriggerBeenShown(triggerId);
}

/**
 * Check if a high-score nudge should show after a practice session.
 */
export function shouldShowHighScoreNudge(score: number): boolean {
  if (isOnCooldown()) return false;
  // Show on first 90%+ session (rare, shareable achievement)
  if (score < 90) return false;
  
  const triggerId = 'high_score_first';
  return !hasTriggerBeenShown(triggerId);
}

// ============================================================================
// NUDGE CONTENT
// ============================================================================

function getNudgeContent(trigger: NudgeTrigger, props: ShareNudgeProps) {
  switch (trigger) {
    case 'streak_milestone':
      return {
        icon: <Flame className="w-5 h-5 text-orange-500" />,
        iconBg: 'bg-orange-100 dark:bg-orange-900/30',
        title: `${props.streak}-day streak!`,
        subtitle: 'You\'re on fire! Know someone studying for their exam? Share VoraPrep — they get 30 days free.',
        accentColor: 'border-orange-200 dark:border-orange-800 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10',
      };
    case 'questions_milestone':
      return {
        icon: <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        title: `${props.totalQuestions?.toLocaleString()}+ questions answered!`,
        subtitle: 'You\'re putting in the work. Share VoraPrep with a friend — they get 30 days free.',
        accentColor: 'border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10',
      };
    case 'high_score':
      return {
        icon: <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
        title: `${props.score}% — incredible score!`,
        subtitle: 'You crushed it! Know someone who needs a study partner? They get 30 days free with your link.',
        accentColor: 'border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10',
      };
    case 'dashboard_periodic':
    default:
      return {
        icon: <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        title: 'Studying with friends?',
        subtitle: 'Share VoraPrep with a colleague — they get 30 days free to try it.',
        accentColor: 'border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10',
      };
  }
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ShareNudge({ trigger, streak, totalQuestions, score, compact = false }: ShareNudgeProps) {
  const [visible, setVisible] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const { user } = useAuth();
  const { courseId } = useCourse();

  const content = getNudgeContent(trigger, { trigger, streak, totalQuestions, score });

  // Mark the trigger as shown on mount
  useEffect(() => {
    const triggerIds: Record<NudgeTrigger, string> = {
      streak_milestone: `streak_${streak}`,
      questions_milestone: `questions_${totalQuestions}`,
      high_score: 'high_score_first',
      dashboard_periodic: 'dashboard_periodic', // Not tracked per-instance
    };
    if (trigger !== 'dashboard_periodic') {
      markTriggerShown(triggerIds[trigger]);
    }
  }, [trigger, streak, totalQuestions]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    markDismissed();
  }, []);

  const handleShare = useCallback(async () => {
    if (!user?.uid) return;
    
    setIsSharing(true);
    try {
      const code = await getOrCreateReferralCode(user.uid);
      const result = await shareReferralLink(code, courseId);
      if (result.success) {
        setShared(true);
        markShared();
        // Auto-hide after successful share
        setTimeout(() => setVisible(false), 2000);
      }
    } catch (error) {
      logger.error('Share nudge error:', error);
    } finally {
      setIsSharing(false);
    }
  }, [user?.uid, courseId]);

  if (!visible || !user) return null;

  if (compact) {
    return (
      <button
        onClick={handleShare}
        disabled={isSharing}
        className={clsx(
          'flex items-center gap-3 w-full p-3 rounded-xl border transition-all text-left group',
          content.accentColor,
          'hover:shadow-md'
        )}
      >
        <div className={clsx('p-2 rounded-lg flex-shrink-0', content.iconBg)}>
          {content.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
            {content.title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            Tap to share — friends get 30 days free
          </p>
        </div>
        <Share2 className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
      </button>
    );
  }

  return (
    <div className={clsx(
      'relative rounded-xl border p-4 transition-all',
      content.accentColor
    )}>
      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <div className={clsx('p-2 rounded-lg flex-shrink-0', content.iconBg)}>
          {content.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">
            {content.title}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            {content.subtitle}
          </p>
          <button
            onClick={handleShare}
            disabled={isSharing || shared}
            className={clsx(
              'mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              shared
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow',
              (isSharing || shared) && 'cursor-default'
            )}
          >
            {shared ? (
              <>
                <Award className="w-4 h-4" />
                Link shared!
              </>
            ) : isSharing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sharing...
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Share with a friend
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareNudge;

/**
 * MilestonesStrip
 * 
 * Lightweight motivation strip showing progressive achievements
 * based purely on existing study stats — no schema changes required.
 *
 * Surfaces the "psychology of progress" the dashboard otherwise lacks:
 * users see what they've earned and what's next, instead of staring
 * at "0 / 1,658 questions".
 */
import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Award, Flame, Target, Trophy, Zap, Star, type LucideIcon } from 'lucide-react';

interface Milestone {
  id: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  threshold: number;
  /** Tailwind color tokens, e.g. 'amber' / 'emerald' / 'primary' */
  color: 'primary' | 'emerald' | 'amber' | 'purple' | 'rose' | 'sky';
  kind: 'questions' | 'streak';
}

const MILESTONES: Milestone[] = [
  { id: 'q-1',    label: 'First Question',  shortLabel: '1 Q',    icon: Star,   threshold: 1,    color: 'sky',     kind: 'questions' },
  { id: 'q-10',   label: 'Builder',         shortLabel: '10 Qs',  icon: Zap,    threshold: 10,   color: 'primary', kind: 'questions' },
  { id: 'q-50',   label: 'Committed',       shortLabel: '50 Qs',  icon: Target, threshold: 50,   color: 'emerald', kind: 'questions' },
  { id: 'q-100',  label: 'Hundred Club',    shortLabel: '100 Qs', icon: Award,  threshold: 100,  color: 'amber',   kind: 'questions' },
  { id: 'q-500',  label: 'Centurion',       shortLabel: '500 Qs', icon: Trophy, threshold: 500,  color: 'purple',  kind: 'questions' },
  { id: 'q-1000', label: 'Thousand Strong', shortLabel: '1K Qs',  icon: Trophy, threshold: 1000, color: 'rose',    kind: 'questions' },

  { id: 's-3',  label: '3-Day Streak',  shortLabel: '🔥 3',  icon: Flame, threshold: 3,  color: 'amber', kind: 'streak' },
  { id: 's-7',  label: '7-Day Streak',  shortLabel: '🔥 7',  icon: Flame, threshold: 7,  color: 'amber', kind: 'streak' },
  { id: 's-14', label: '14-Day Streak', shortLabel: '🔥 14', icon: Flame, threshold: 14, color: 'rose',  kind: 'streak' },
  { id: 's-30', label: '30-Day Streak', shortLabel: '🔥 30', icon: Flame, threshold: 30, color: 'rose',  kind: 'streak' },
];

const COLOR_CLASSES: Record<Milestone['color'], { bg: string; text: string; ring: string }> = {
  primary: { bg: 'bg-primary-100 dark:bg-primary-900/30',  text: 'text-primary-700 dark:text-primary-300',  ring: 'ring-primary-200 dark:ring-primary-800' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30',  text: 'text-emerald-700 dark:text-emerald-300',  ring: 'ring-emerald-200 dark:ring-emerald-800' },
  amber:   { bg: 'bg-amber-100 dark:bg-amber-900/30',      text: 'text-amber-700 dark:text-amber-300',      ring: 'ring-amber-200 dark:ring-amber-800' },
  purple:  { bg: 'bg-purple-100 dark:bg-purple-900/30',    text: 'text-purple-700 dark:text-purple-300',    ring: 'ring-purple-200 dark:ring-purple-800' },
  rose:    { bg: 'bg-rose-100 dark:bg-rose-900/30',        text: 'text-rose-700 dark:text-rose-300',        ring: 'ring-rose-200 dark:ring-rose-800' },
  sky:     { bg: 'bg-sky-100 dark:bg-sky-900/30',          text: 'text-sky-700 dark:text-sky-300',          ring: 'ring-sky-200 dark:ring-sky-800' },
};

export interface MilestonesStripProps {
  totalQuestions: number;
  currentStreak: number;
  className?: string;
}

interface ResolvedMilestone extends Milestone {
  earned: boolean;
  value: number;
}

export const MilestonesStrip: React.FC<MilestonesStripProps> = ({
  totalQuestions,
  currentStreak,
  className,
}) => {
  const { earned, next } = useMemo(() => {
    const resolved: ResolvedMilestone[] = MILESTONES.map(m => {
      const value = m.kind === 'questions' ? totalQuestions : currentStreak;
      return { ...m, earned: value >= m.threshold, value };
    });
    const earnedList = resolved.filter(m => m.earned);
    const nextQ = resolved.find(m => m.kind === 'questions' && !m.earned) ?? null;
    const nextS = resolved.find(m => m.kind === 'streak' && !m.earned) ?? null;
    return { earned: earnedList, next: { questions: nextQ, streak: nextS } };
  }, [totalQuestions, currentStreak]);

  // If user is brand-new (no questions, no streak), don't show the strip yet —
  // the welcome card handles day-zero motivation.
  if (totalQuestions === 0 && currentStreak === 0) return null;

  // Show the most recent 4 earned + the next question milestone as a "next up" target
  const recentEarned = earned.slice(-4);

  return (
    <div
      className={clsx(
        'rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3',
        className
      )}
      aria-label="Achievements"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          Achievements
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {earned.length}/{MILESTONES.length}
        </span>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1 pb-1">
        {recentEarned.length === 0 && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Answer your first question to earn your first badge.
          </p>
        )}
        {recentEarned.map(m => {
          const c = COLOR_CLASSES[m.color];
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              title={m.label}
              className={clsx(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-full ring-1 flex-shrink-0',
                c.bg,
                c.text,
                c.ring
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="text-xs font-medium whitespace-nowrap">{m.shortLabel}</span>
            </div>
          );
        })}
        {next.questions && (
          <NextChip milestone={next.questions} />
        )}
        {next.streak && next.streak.threshold <= currentStreak + 30 && (
          <NextChip milestone={next.streak} />
        )}
      </div>
    </div>
  );
};

const NextChip: React.FC<{ milestone: ResolvedMilestone }> = ({ milestone }) => {
  const remaining = Math.max(1, milestone.threshold - milestone.value);
  return (
    <div
      title={`${milestone.label} — ${remaining} to go`}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 flex-shrink-0"
    >
      <milestone.icon className="w-3.5 h-3.5 opacity-70" />
      <span className="text-xs font-medium whitespace-nowrap">
        Next: {milestone.shortLabel} <span className="opacity-70">(+{remaining})</span>
      </span>
    </div>
  );
};

export default MilestonesStrip;

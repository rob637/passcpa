/**
 * ScorePredictionTile (CPA)
 *
 * Surface the most-asked-about question in CPA prep:
 *   "What would I score today, and when am I ready to sit?"
 *
 * Reads from cpaScorePredictor (which derives from the local adaptive engine
 * state). Renders an empty/encouraging state when there isn't enough data
 * yet (<20 questions per section).
 *
 * CPA-specific by design: each exam has its own scoring model (75 pass for
 * CPA on a 0-99 scale, etc.), so we keep this targeted rather than generic.
 */
import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import {
  getSectionReadinessOverview,
  getEstimatedExamReadyDate,
} from '../services/cpaScorePredictor';
import type { CPASectionId } from '../services/cpaAdaptiveEngine';

const STATUS_TINT: Record<string, { bar: string; pill: string; text: string }> = {
  Ready:                    { bar: 'bg-emerald-500',  pill: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300', text: 'text-emerald-700 dark:text-emerald-300' },
  'Almost Ready':           { bar: 'bg-lime-500',     pill: 'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300',             text: 'text-lime-700 dark:text-lime-300' },
  'Getting Close':          { bar: 'bg-amber-500',    pill: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',         text: 'text-amber-700 dark:text-amber-300' },
  'Keep Studying':          { bar: 'bg-orange-500',   pill: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',     text: 'text-orange-700 dark:text-orange-300' },
  'More Practice Needed':   { bar: 'bg-rose-500',     pill: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',             text: 'text-rose-700 dark:text-rose-300' },
  'Not enough data':        { bar: 'bg-slate-300',    pill: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',            text: 'text-slate-600 dark:text-slate-300' },
};

interface SectionRow {
  section: CPASectionId;
  shortName: string;
  score: number;
  status: string;
  readyBy: Date | null;
}

const SECTION_SHORT: Record<CPASectionId, string> = {
  FAR: 'FAR', AUD: 'AUD', REG: 'REG', BAR: 'BAR', ISC: 'ISC', TCP: 'TCP',
};

export interface ScorePredictionTileProps {
  className?: string;
  /** Practice path users land on when they tap an actionable row. */
  practicePath?: string;
  /** Hours/week for ready-by date math. Defaults to 15 (close to industry baseline). */
  studyHoursPerWeek?: number;
}

export const ScorePredictionTile: React.FC<ScorePredictionTileProps> = ({
  className,
  practicePath = '/practice',
  studyHoursPerWeek = 15,
}) => {
  const rows = useMemo<SectionRow[]>(() => {
    try {
      const overview = getSectionReadinessOverview();
      return overview.map(o => ({
        section: o.section,
        shortName: SECTION_SHORT[o.section] ?? o.section,
        score: o.score,
        status: o.status,
        readyBy:
          o.score > 0
            ? safeReadyDate(o.section, studyHoursPerWeek)
            : null,
      }));
    } catch {
      return [];
    }
  }, [studyHoursPerWeek]);

  const hasAnyData = rows.some(r => r.score > 0);
  const overallScore = useMemo(() => {
    const scored = rows.filter(r => r.score > 0);
    if (scored.length === 0) return 0;
    return Math.round(scored.reduce((a, r) => a + r.score, 0) / scored.length);
  }, [rows]);

  const earliestReady = useMemo(() => {
    const dates = rows.map(r => r.readyBy).filter((d): d is Date => !!d);
    if (dates.length === 0) return null;
    return new Date(Math.min(...dates.map(d => d.getTime())));
  }, [rows]);

  const overallStatus =
    overallScore >= 82 ? 'Ready' :
    overallScore >= 75 ? 'Almost Ready' :
    overallScore >= 68 ? 'Getting Close' :
    overallScore >= 60 ? 'Keep Studying' :
    overallScore > 0   ? 'More Practice Needed' :
    'Not enough data';
  const overallTint = STATUS_TINT[overallStatus];

  return (
    <div
      className={clsx(
        'rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4',
        className
      )}
      aria-label="Score prediction"
    >
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-500 flex-shrink-0" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Projected Score
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pass mark is 75. Updates as you practice.
          </p>
        </div>
        {hasAnyData && (
          <div className="text-right flex-shrink-0">
            <div className={clsx('text-3xl font-bold leading-none', overallTint.text)}>
              {overallScore}
            </div>
            <div className={clsx('text-[10px] uppercase tracking-wide font-semibold mt-0.5', overallTint.text)}>
              {overallStatus}
            </div>
          </div>
        )}
      </div>

      {!hasAnyData ? (
        <div className="rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-700 p-3 text-center">
          <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
            Answer ~20 questions per section to see your projected score.
          </p>
          <Link
            to={practicePath}
            className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Start practicing
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-1.5">
            {rows.map(r => {
              const tint = STATUS_TINT[r.status] ?? STATUS_TINT['Not enough data'];
              const pct = Math.min(100, Math.max(0, r.score));
              return (
                <li key={r.section} className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-300 w-9 flex-shrink-0">
                    {r.shortName}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    <div
                      className={clsx('h-full transition-[width] duration-500', tint.bar)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className={clsx('w-9 text-right font-semibold tabular-nums', tint.text)}>
                    {r.score > 0 ? r.score : '—'}
                  </span>
                  <span className={clsx('px-1.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap', tint.pill)}>
                    {shortStatus(r.status)}
                  </span>
                </li>
              );
            })}
          </ul>

          {earliestReady && (
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-700">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span>
                Earliest projected readiness:{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  {earliestReady.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </strong>
                {' '}at {studyHoursPerWeek}h/week
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

function safeReadyDate(section: CPASectionId, hoursPerWeek: number): Date | null {
  try {
    return getEstimatedExamReadyDate(section, hoursPerWeek);
  } catch {
    return null;
  }
}

function shortStatus(status: string): string {
  switch (status) {
    case 'More Practice Needed': return 'More practice';
    case 'Not enough data':      return 'No data';
    default:                     return status;
  }
}

export default ScorePredictionTile;

/**
 * InviteFriends - Clean, minimal referral sharing UI
 * 
 * Placed in Settings only - no pushy prompts elsewhere.
 * Users who want to share can find it; users who don't aren't bothered.
 */

import { useState, useEffect } from 'react';
import { Share2, Copy, Check, Users, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../providers/CourseProvider';
import { 
  getReferralStats, 
  shareReferralLink,
  getReferralUrl,
} from '../../services/referral';
import clsx from 'clsx';
import logger from '../../utils/logger';

interface InviteFriendsProps {
  /** Compact mode for embedding in other views */
  compact?: boolean;
}

export function InviteFriends({ compact = false }: InviteFriendsProps) {
  const { user } = useAuth();
  const { courseId } = useCourse();
  const [referralCode, setReferralCode] = useState<string>('');
  const [stats, setStats] = useState({ referralCount: 0, referralRewards: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadReferralData() {
      if (!user?.uid) return;
      
      setIsLoading(true);
      try {
        const data = await getReferralStats(user.uid);
        if (cancelled) return;
        setReferralCode(data.code);
        setStats({ referralCount: data.referralCount, referralRewards: data.referralRewards });
      } catch (error) {
        logger.error('Error loading referral data:', error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadReferralData();
    return () => { cancelled = true; };
  }, [user?.uid]);

  const handleCopyLink = async () => {
    if (!referralCode) return;
    
    const url = getReferralUrl(referralCode, courseId);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!referralCode) return;
    
    setIsSharing(true);
    try {
      const result = await shareReferralLink(referralCode, courseId);
      if (result.method === 'clipboard' && result.success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } finally {
      setIsSharing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  const referralUrl = getReferralUrl(referralCode, courseId);

  if (compact) {
    return (
      <button
        onClick={handleShare}
        disabled={isSharing}
        className="flex items-center gap-3 w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 rounded-xl hover:shadow-md transition-all"
      >
        <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-medium text-slate-900 dark:text-slate-100">
            Invite Friends
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Share VoraPrep with study buddies
          </p>
        </div>
        <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </button>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Invite Friends
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Share VoraPrep with friends studying for their exams
        </p>
      </div>

      {/* Benefit callout */}
      <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex-shrink-0">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="font-medium text-blue-900 dark:text-blue-100">
            Know someone prepping for an exam?
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
            Share VoraPrep with friends studying for their CPA, EA, CMA, CIA, CISA, or CFP. AI-powered practice, adaptive learning, and a fraction of the cost of traditional review courses.
          </p>
        </div>
      </div>

      {/* Referral link */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Your referral link
        </label>
        <div className="flex items-stretch gap-2">
          <div className="flex-1 flex items-center px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 text-sm font-mono overflow-hidden">
            <span className="truncate">{referralUrl}</span>
          </div>
          <button
            onClick={handleCopyLink}
            className={clsx(
              'px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2',
              copied
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            )}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Share button */}
      <button
        onClick={handleShare}
        disabled={isSharing}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSharing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Share2 className="w-5 h-5" />
            Share with Friends
          </>
        )}
      </button>

      {/* Stats (only if they have referrals) */}
      {stats.referralCount > 0 && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <Users className="w-4 h-4" />
            <span>
              <strong className="text-slate-900 dark:text-slate-100">{stats.referralCount}</strong>{' '}
              friend{stats.referralCount === 1 ? '' : 's'} joined using your link
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default InviteFriends;

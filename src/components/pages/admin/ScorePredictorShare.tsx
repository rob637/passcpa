/**
 * Score Predictor Sharing — Viral loop via shareable score cards
 * 
 * Features:
 * - Beautiful, shareable score prediction cards
 * - Download as image (PNG)
 * - Share to social media
 * - Track shares for analytics
 * - Embed referral code in shared links
 */

import { useState, useRef, useCallback } from 'react';
import {
  Share2, Download, Copy, CheckCircle, Twitter, Facebook, Linkedin,
  Target, TrendingUp, Award, Sparkles, X,
} from 'lucide-react';
import { collection, addDoc, serverTimestamp, increment, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import logger from '../../../utils/logger';

// Types
interface ScorePrediction {
  section: string;
  sectionName: string;
  predictedScore: number;
  confidenceInterval: { low: number; high: number };
  passProbability: number;
  questionsAnswered: number;
  accuracy: number;
  studyDays: number;
}

interface ShareableScoreCardProps {
  prediction: ScorePrediction;
  userName?: string;
  examName?: string;
  referralCode?: string;
  onShare?: (platform: string) => void;
}

// ============================================================================
// Shareable Score Card Component
// ============================================================================

export function ShareableScoreCard({
  prediction,
  userName,
  examName = 'CPA',
  referralCode,
  onShare,
}: ShareableScoreCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { user } = useAuth();

  const shareUrl = referralCode
    ? `${window.location.origin}/signup?ref=${referralCode}`
    : window.location.origin;

  // Get color based on predicted score
  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'from-green-500 to-emerald-600', text: 'text-green-600' };
    if (score >= 75) return { bg: 'from-blue-500 to-indigo-600', text: 'text-blue-600' };
    if (score >= 70) return { bg: 'from-amber-500 to-orange-600', text: 'text-amber-600' };
    return { bg: 'from-red-500 to-orange-600', text: 'text-red-600' };
  };

  // Using scoreColor for gradient
  getScoreColor(prediction.predictedScore);

  // Track share event
  const trackShare = useCallback(async (platform: string) => {
    try {
      // Log share to Firestore
      await addDoc(collection(db, 'shareEvents'), {
        userId: user?.uid || 'anonymous',
        platform,
        type: 'score_prediction',
        section: prediction.section,
        score: prediction.predictedScore,
        referralCode,
        timestamp: serverTimestamp(),
      });

      // Update user's share count
      if (user?.uid) {
        await updateDoc(doc(db, 'users', user.uid), {
          'stats.shareCount': increment(1),
        }).catch(() => {}); // Silent fail
      }

      onShare?.(platform);
    } catch (err) {
      logger.error('Error tracking share', err);
    }
  }, [user?.uid, prediction.section, prediction.predictedScore, referralCode, onShare]);

  // Export as image using html2canvas
  const exportAsImage = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      // Dynamic import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#1f2937',
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = `voraprep-${prediction.section.toLowerCase()}-prediction.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      trackShare('download');
    } catch (err) {
      logger.error('Error exporting image', err);
      alert('Could not export image. Try using a screenshot instead.');
    } finally {
      setIsExporting(false);
    }
  };

  // Copy share link
  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackShare('copy_link');
  };

  // Social share URLs
  const shareText = `I'm predicted to score ${prediction.predictedScore} on my ${examName} ${prediction.sectionName} exam with ${Math.round(prediction.passProbability * 100)}% pass probability! 📊 Studying with VoraPrep.`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <div className="space-y-4">
      {/* The shareable card */}
      <div
        ref={cardRef}
        className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden"
        style={{ maxWidth: 400 }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full blur-3xl" />

        {/* Header */}
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-400">VoraPrep Score Predictor</div>
              <div className="text-sm font-semibold">{examName} {prediction.sectionName}</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Score Display */}
        <div className="relative text-center mb-6">
          <div className="text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {prediction.predictedScore}
          </div>
          <div className="text-sm text-gray-400 mt-1">Predicted Score</div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-xs text-gray-500">
              ({prediction.confidenceInterval.low} - {prediction.confidenceInterval.high} range)
            </span>
          </div>
        </div>

        {/* Pass Probability */}
        <div className="relative mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Pass Probability</span>
            <span className={`text-lg font-bold ${
              prediction.passProbability >= 0.75 ? 'text-green-400' :
              prediction.passProbability >= 0.5 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {Math.round(prediction.passProbability * 100)}%
            </span>
          </div>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${
                prediction.passProbability >= 0.75 ? 'from-green-500 to-emerald-400' :
                prediction.passProbability >= 0.5 ? 'from-amber-500 to-yellow-400' : 'from-red-500 to-orange-400'
              }`}
              style={{ width: `${prediction.passProbability * 100}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="relative grid grid-cols-3 gap-4 mb-4">
          <StatItem label="Questions" value={prediction.questionsAnswered.toLocaleString()} icon={TrendingUp} />
          <StatItem label="Accuracy" value={`${Math.round(prediction.accuracy * 100)}%`} icon={Target} />
          <StatItem label="Study Days" value={prediction.studyDays.toString()} icon={Award} />
        </div>

        {/* Footer */}
        <div className="relative flex items-center justify-between pt-4 border-t border-gray-700">
          {userName && (
            <div className="text-xs text-gray-500">
              {userName}
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Sparkles className="w-3 h-3" />
            voraprep.com
          </div>
        </div>
      </div>

      {/* Share Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={exportAsImage}
          disabled={isExporting}
          className="flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Download'}
        </Button>
        <Button
          variant="secondary"
          onClick={copyLink}
          className="flex-1"
        >
          {copied ? <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>

      {/* Social Share */}
      <div className="flex items-center justify-center gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShare('twitter')}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#1DA1F2] hover:text-white transition-colors"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=My%20${examName}%20Score%20Prediction&summary=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShare('linkedin')}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#0077B5] hover:text-white transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShare('facebook')}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#4267B2] hover:text-white transition-colors"
        >
          <Facebook className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

// ============================================================================
// Score Predictor Share Modal
// ============================================================================

export function ScorePredictorShareModal({
  isOpen,
  onClose,
  prediction,
  userName,
  examName,
  referralCode,
}: {
  isOpen: boolean;
  onClose: () => void;
  prediction: ScorePrediction;
  userName?: string;
  examName?: string;
  referralCode?: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
            <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Share Your Progress</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Show off your predicted score and inspire others!
          </p>
        </div>

        <ShareableScoreCard
          prediction={prediction}
          userName={userName}
          examName={examName}
          referralCode={referralCode}
        />
      </div>
    </div>
  );
}

// ============================================================================
// Admin Analytics for Shares
// ============================================================================

export function ShareAnalyticsCard({
  totalShares,
  sharesByPlatform,
  conversionRate,
}: {
  totalShares: number;
  sharesByPlatform: Record<string, number>;
  conversionRate: number;
}) {
  return (
    <Card className="p-6">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
        <Share2 className="w-4 h-4 text-blue-500" />
        Score Sharing Analytics
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalShares}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total Shares</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {sharesByPlatform.twitter || 0}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Twitter</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {(conversionRate * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">→ Signup</div>
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(sharesByPlatform).map(([platform, count]) => (
          <div key={platform} className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400 capitalize">{platform.replace('_', ' ')}</span>
            <span className="font-medium text-gray-900 dark:text-white">{count}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ============================================================================
// Subcomponents
// ============================================================================

function StatItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof TrendingUp;
}) {
  return (
    <div className="text-center">
      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-1">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

// ============================================================================
// Example Integration
// ============================================================================

/**
 * How to integrate into the Score Predictor page:
 * 
 * 1. Import the ShareableScoreCard component:
 *    import { ShareableScoreCard, ScorePredictorShareModal } from './ScorePredictorShare';
 * 
 * 2. Add state for the modal:
 *    const [showShareModal, setShowShareModal] = useState(false);
 * 
 * 3. Create prediction object from your score data:
 *    const prediction: ScorePrediction = {
 *      section: 'FAR',
 *      sectionName: 'Financial Accounting & Reporting',
 *      predictedScore: 78,
 *      confidenceInterval: { low: 73, high: 83 },
 *      passProbability: 0.82,
 *      questionsAnswered: 450,
 *      accuracy: 0.72,
 *      studyDays: 45,
 *    };
 * 
 * 4. Add share button:
 *    <Button onClick={() => setShowShareModal(true)}>
 *      <Share2 className="w-4 h-4 mr-2" /> Share Progress
 *    </Button>
 * 
 * 5. Render modal:
 *    <ScorePredictorShareModal
 *      isOpen={showShareModal}
 *      onClose={() => setShowShareModal(false)}
 *      prediction={prediction}
 *      userName={user?.displayName}
 *      examName="CPA"
 *      referralCode={user?.uid?.slice(0, 8).toUpperCase()}
 *    />
 */

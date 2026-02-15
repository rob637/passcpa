import React, { useRef, useState, useEffect } from 'react';
import { Share2, Download, X, Linkedin, Twitter } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Button } from './common/Button';
import { useCourse } from '../providers/CourseProvider';
import { useAuth } from '../hooks/useAuth';
import { getAchievementDisplayName } from '../services/achievements';
import { getReferralStats } from '../services/referral';
import logger from '../utils/logger';

interface ShareableAchievementCardProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    icon: string | React.ReactNode;
    points: number;
    category: string;
  };
  userName?: string;
  streak?: number;
  onClose: () => void;
}

const ShareableAchievementCard: React.FC<ShareableAchievementCardProps> = ({
  achievement,
  userName,
  streak,
  onClose,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string>('');
  const { courseId, course } = useCourse();
  const { user } = useAuth();
  const courseName = course?.name || courseId?.toUpperCase() || 'CPA';
  const displayName = getAchievementDisplayName(achievement.id, courseId);

  // Load user's referral code for share links
  useEffect(() => {
    async function loadReferralCode() {
      if (!user?.uid) return;
      try {
        const data = await getReferralStats(user.uid);
        setReferralCode(data.code);
      } catch (error) {
        // Silently fail - sharing still works without referral
      }
    }
    loadReferralCode();
  }, [user?.uid]);

  // Build share URL with optional referral code
  const getShareUrl = () => {
    const base = 'https://voraprep.com';
    return referralCode ? `${base}/register?ref=${referralCode}` : base;
  };

  const generateImage = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    
    setIsGenerating(true);
    setShareError(null);
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
      });
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png', 1.0);
      });
    } catch (error) {
      logger.error('Failed to generate image:', error);
      setShareError('Failed to generate image');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    const blob = await generateImage();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voraprep-achievement-${achievement.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNativeShare = async () => {
    const blob = await generateImage();
    if (!blob) return;

    const file = new File([blob], `voraprep-achievement-${achievement.id}.png`, { type: 'image/png' });
    const shareUrl = getShareUrl();
    
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: `I unlocked "${displayName}" on VoraPrep!`,
          text: `🏆 ${achievement.description} - Studying for the ${courseName} exam with VoraPrep\n\n${shareUrl}`,
          files: [file],
        });
      } catch (error) {
        // User cancelled or share failed
        if ((error as Error).name !== 'AbortError') {
          setShareError('Share failed. Try downloading instead.');
        }
      }
    } else {
      // Fallback to download
      handleDownload();
    }
  };

  const handleLinkedInShare = () => {
    const text = `🏆 Just unlocked "${displayName}" while studying for the ${courseName} exam!\n\n${achievement.description}\n\nPreparing with @VoraPrep - the smart way to pass the ${courseName} exam.`;
    const url = getShareUrl();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`,
      '_blank',
      'width=600,height=600'
    );
  };

  const handleTwitterShare = () => {
    const text = `🏆 Just unlocked "${displayName}" on @VoraPrep!\n\n${achievement.description}\n\n#${courseName}Exam #Accounting`;
    const url = getShareUrl();
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Share Your Achievement
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Shareable Card Preview */}
        <div className="p-6">
          <div
            ref={cardRef}
            className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-2xl p-6 text-white shadow-lg"
          >
            {/* VoraPrep Logo/Branding */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold">V</span>
                </div>
                <span className="font-bold text-lg">VoraPrep</span>
              </div>
              <span className="text-xs text-white/70">{courseName} Exam Prep</span>
            </div>

            {/* Achievement */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg">
                {achievement.icon}
              </div>
              
              <div className="bg-white/10 rounded-xl px-4 py-1 inline-block mb-3">
                <span className="text-xs font-medium text-white/90">Achievement Unlocked!</span>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{displayName}</h3>
              <p className="text-sm text-white/80 mb-4">{achievement.description}</p>
              
              {/* Stats Row */}
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="bg-white/10 rounded-lg px-3 py-1.5">
                  <span className="text-white/70">+</span>
                  <span className="font-bold">{achievement.points}</span>
                  <span className="text-white/70 ml-1">pts</span>
                </div>
                {streak && streak > 0 && (
                  <div className="bg-white/10 rounded-lg px-3 py-1.5 flex items-center gap-1">
                    <span className="text-orange-400">🔥</span>
                    <span className="font-bold">{streak}</span>
                    <span className="text-white/70">day streak</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              {userName && (
                <p className="text-sm text-white/60 mb-1">Earned by {userName}</p>
              )}
              <p className="text-xs text-white/40">voraprep.com</p>
            </div>
          </div>
        </div>

        {/* Share Options */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
          {shareError && (
            <p className="text-sm text-red-500 text-center mb-3">{shareError}</p>
          )}
          
          <div className="grid grid-cols-4 gap-3">
            {/* Native Share (mobile) */}
            <Button
              variant="primary"
              onClick={handleNativeShare}
              disabled={isGenerating}
              loading={isGenerating}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-xs font-medium">Share</span>
            </Button>

            {/* Download */}
            <Button
              variant="secondary"
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl"
            >
              <Download className="w-5 h-5" />
              <span className="text-xs font-medium">Save</span>
            </Button>

            {/* LinkedIn */}
            <Button
              onClick={handleLinkedInShare}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-xs font-medium">LinkedIn</span>
            </Button>

            {/* Twitter/X */}
            <Button
              onClick={handleTwitterShare}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white"
            >
              <Twitter className="w-5 h-5" />
              <span className="text-xs font-medium">X</span>
            </Button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 text-center mt-4">
            Share your progress and inspire others on their {courseName} journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareableAchievementCard;

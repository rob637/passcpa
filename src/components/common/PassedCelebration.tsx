/**
 * PassedCelebration - "I Passed!" shareable celebration modal
 * 
 * Clean, celebratory modal when a user reports passing their exam.
 * Includes shareable card with referral link for word-of-mouth growth.
 */

import { useRef, useState, useEffect } from 'react';
import { Share2, Download, X, Linkedin, Twitter, Loader2, PartyPopper } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Button } from './Button';
import { useCourse } from '../../providers/CourseProvider';
import { useAuth } from '../../hooks/useAuth';
import { getReferralStats } from '../../services/referral';

interface PassedCelebrationProps {
  /** Which exam section/part was passed (optional, for multi-section exams) */
  section?: string;
  /** User's display name */
  userName?: string;
  /** Close handler */
  onClose: () => void;
}

export function PassedCelebration({ section, userName, onClose }: PassedCelebrationProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string>('');
  const { courseId, course } = useCourse();
  const { user } = useAuth();
  const courseName = course?.name || courseId?.toUpperCase() || 'CPA';
  
  // For single-exam courses (CISA, CFP), use the course name instead of domain IDs
  // CPA/CMA have meaningful section names (AUD, FAR, Part 1, etc.)
  const singleExamCourses = ['cisa', 'cfp'];
  const isSingleExamCourse = singleExamCourses.includes(courseId || '');
  const displaySection = isSingleExamCourse ? courseName : (section || courseName);

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
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png', 1.0);
      });
    } catch (error) {
      console.error('Failed to generate image:', error);
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
    a.download = `voraprep-i-passed-${displaySection.toLowerCase()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNativeShare = async () => {
    const blob = await generateImage();
    if (!blob) return;

    const file = new File([blob], `voraprep-i-passed-${displaySection.toLowerCase()}.png`, { type: 'image/png' });
    const shareUrl = getShareUrl();
    
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: `I Passed the ${displaySection} Exam!`,
          text: `🎉 I just passed the ${displaySection} exam! Studied with VoraPrep - seriously the best prep tool out there.\n\n${shareUrl}`,
          files: [file],
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setShareError('Share failed. Try downloading instead.');
        }
      }
    } else {
      handleDownload();
    }
  };

  const handleLinkedInShare = () => {
    const text = `🎉 I PASSED the ${displaySection} exam!\n\nBig thank you to VoraPrep for helping me prepare. If you're studying for your ${courseName}, definitely check them out!`;
    const url = getShareUrl();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`,
      '_blank',
      'width=600,height=600'
    );
  };

  const handleTwitterShare = () => {
    const text = `🎉 I PASSED the ${displaySection} exam!\n\nStudied with @VoraPrep and crushed it. Highly recommend for anyone prepping for their ${courseName}!`;
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
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-amber-500" />
            Congratulations!
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
            className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg"
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

            {/* Celebration */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl shadow-lg">
                🎉
              </div>
              
              <div className="bg-white/10 rounded-xl px-4 py-1 inline-block mb-3">
                <span className="text-xs font-medium text-white/90">Official Pass!</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">I Passed!</h3>
              <p className="text-lg text-white/90 mb-1">{displaySection} Exam</p>
              <p className="text-sm text-white/70">Hard work pays off!</p>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              {userName && (
                <p className="text-sm text-white/60 mb-1">{userName}</p>
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
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl"
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
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
            Share your success and inspire others on their {courseName} journey!
          </p>
        </div>
      </div>
    </div>
  );
}

export default PassedCelebration;

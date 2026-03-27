/**
 * WelcomeVideoCard - First-time user video introduction
 * 
 * Shows a welcome video with 4 clear paths forward:
 * 1. Try a Lesson - Learn a topic concept
 * 2. Create Study Plan - Set exam date, get personalized roadmap
 * 3. Practice MCQs - Quick questions with instant feedback
 * 4. Explore Resources - Exam strategy and test day tips
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Play,
  X as XIcon,
  BookOpen,
  Map,
  Target,
  Compass,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import { useCourse } from '../providers/CourseProvider';
import { getCoursePracticePath } from '../utils/courseNavigation';
import clsx from 'clsx';

// Storage key for tracking video watched status
const VIDEO_WATCHED_KEY = 'voraprep_welcome_video_watched';
const VIDEO_DISMISSED_KEY = 'voraprep_welcome_video_dismissed';

interface WelcomeVideoCardProps {
  activeSection: string;
  onDismiss: () => void;
}

// Video URL - replace with actual video once recorded
// Options: YouTube embed, Loom embed, or local /public/videos/welcome.mp4
const WELCOME_VIDEO_URL: string = ''; // Leave empty to show placeholder

interface PathOption {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  to: string;
  color: string;
  bgColor: string;
}

export const WelcomeVideoCard: React.FC<WelcomeVideoCardProps> = ({
  activeSection,
  onDismiss,
}) => {
  const navigate = useNavigate();
  const { courseId, course } = useCourse();
  const [videoWatched, setVideoWatched] = useState(() =>
    localStorage.getItem(VIDEO_WATCHED_KEY) === '1'
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDismiss = () => {
    localStorage.setItem(VIDEO_DISMISSED_KEY, '1');
    onDismiss();
  };

  const handleVideoEnd = () => {
    localStorage.setItem(VIDEO_WATCHED_KEY, '1');
    setVideoWatched(true);
    setIsPlaying(false);
  };

  const handleSkipVideo = () => {
    localStorage.setItem(VIDEO_WATCHED_KEY, '1');
    setVideoWatched(true);
    setIsPlaying(false);
  };

  // 4 paths forward
  const paths: PathOption[] = [
    {
      id: 'lesson',
      icon: BookOpen,
      title: 'Try a Lesson',
      description: 'Learn a concept step-by-step',
      to: activeSection ? `/learn?section=${activeSection}` : '/learn',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    {
      id: 'study-plan',
      icon: Map,
      title: 'Create Study Plan',
      description: 'Set your exam date, get a roadmap',
      to: '/study-plan/setup',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      id: 'practice',
      icon: Target,
      title: 'Practice MCQs',
      description: 'Answer questions, get instant feedback',
      to: getCoursePracticePath(courseId),
      color: 'text-primary-600',
      bgColor: 'bg-primary-100 dark:bg-primary-900/30',
    },
    {
      id: 'resources',
      icon: Compass,
      title: 'Explore Resources',
      description: 'Exam strategy and test day tips',
      to: '/resources',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-indigo-50 to-purple-50 dark:from-primary-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-primary-200 dark:border-primary-800 overflow-hidden">
      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 z-10 p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-white/70 dark:hover:bg-slate-700/70 transition-colors"
        aria-label="Dismiss welcome card"
      >
        <XIcon className="w-4 h-4" />
      </button>

      <div className="p-5">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Welcome to VoraPrep! 🎉
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Here's how to make the most of your {course?.shortName || 'exam'} prep
          </p>
        </div>

        {/* Video Section */}
        {WELCOME_VIDEO_URL ? (
          <div className="mb-5">
            {!isPlaying ? (
              // Video thumbnail with play button
              <div 
                className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                {/* Thumbnail placeholder - replace with actual thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-indigo-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <p className="mt-3 font-medium">Watch: Getting Started (90 sec)</p>
                  </div>
                </div>
              </div>
            ) : (
              // Video player
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                {WELCOME_VIDEO_URL.includes('youtube') || WELCOME_VIDEO_URL.includes('youtu.be') ? (
                  <iframe
                    src={`${WELCOME_VIDEO_URL}?autoplay=1&rel=0`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="VoraPrep Welcome Video"
                  />
                ) : WELCOME_VIDEO_URL.includes('loom') ? (
                  <iframe
                    src={`${WELCOME_VIDEO_URL}?autoplay=1`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                    title="VoraPrep Welcome Video"
                  />
                ) : (
                  <video
                    src={WELCOME_VIDEO_URL}
                    className="absolute inset-0 w-full h-full"
                    autoPlay
                    controls
                    onEnded={handleVideoEnd}
                  />
                )}
                <button
                  onClick={handleSkipVideo}
                  className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 hover:bg-black/90 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  Skip →
                </button>
              </div>
            )}
          </div>
        ) : (
          // No video yet - show compact message
          <div className="mb-5 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Choose how you'd like to start studying:
            </p>
          </div>
        )}

        {/* 4 Paths Grid - 48dp minimum touch targets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paths.map((path) => {
            const Icon = path.icon;
            return (
              <Link
                key={path.id}
                to={path.to}
                className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all active:scale-[0.98] group"
              >
                <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', path.bgColor)}>
                  <Icon className={clsx('w-6 h-6', path.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {path.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {path.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pro tip */}
        <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
          💡 Not sure? Start with <strong>Practice MCQs</strong> — you'll see results after just 10 questions.
        </p>
      </div>
    </div>
  );
};

/**
 * Check if the welcome video card should be shown
 * Returns true for first-time users who haven't dismissed it
 */
export const shouldShowWelcomeVideo = (): boolean => {
  return localStorage.getItem(VIDEO_DISMISSED_KEY) !== '1';
};

export default WelcomeVideoCard;

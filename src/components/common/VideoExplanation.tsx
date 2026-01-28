// VideoExplanation Component
// Displays video explanations for questions with placeholder support

import React, { useState, useCallback } from 'react';
import { Question } from '../../types';
import { useMediaPreferences } from '../../hooks/useAccessibility';

interface VideoExplanationProps {
  question: Question;
  isVisible?: boolean;
  onRequestVideo?: (questionId: string) => void;
}

/**
 * Video Explanation Component
 * Shows video explanations when available, or placeholder with request option
 */
export const VideoExplanation: React.FC<VideoExplanationProps> = ({
  question,
  isVisible = true,
  onRequestVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const { prefersReducedMotion } = useMediaPreferences();
  
  const hasVideo = question.videoExplanation?.url;
  const isPlaceholder = !hasVideo || question.videoExplanation?.provider === 'placeholder';

  const handleRequestVideo = useCallback(() => {
    if (onRequestVideo) {
      onRequestVideo(question.id);
      setHasRequested(true);
    }
  }, [onRequestVideo, question.id]);

  const formatDuration = (seconds: number | undefined): string => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getYouTubeEmbedUrl = (url: string): string => {
    // Extract video ID from various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?#]+)/,
      /youtube\.com\/v\/([^&?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        const params = new URLSearchParams({
          rel: '0',
          modestbranding: '1',
          ...(prefersReducedMotion ? { autoplay: '0' } : {}),
        });
        return `https://www.youtube-nocookie.com/embed/${match[1]}?${params}`;
      }
    }
    return url;
  };

  const getVimeoEmbedUrl = (url: string): string => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match) {
      return `https://player.vimeo.com/video/${match[1]}?title=0&byline=0&portrait=0`;
    }
    return url;
  };

  const getEmbedUrl = (): string => {
    const video = question.videoExplanation;
    if (!video?.url) return '';

    switch (video.provider) {
      case 'youtube':
        return getYouTubeEmbedUrl(video.url);
      case 'vimeo':
        return getVimeoEmbedUrl(video.url);
      default:
        return video.url;
    }
  };

  if (!isVisible) return null;

  // Placeholder state - no video available
  if (isPlaceholder) {
    return (
      <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-slate-400 dark:text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          
          <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Video Explanation Coming Soon
          </h4>
          
          <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-md mx-auto">
            We're working on adding video explanations for this topic. 
            Expert instructors will walk you through the solution step-by-step.
          </p>

          {onRequestVideo && (
            <button
              onClick={handleRequestVideo}
              disabled={hasRequested}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                hasRequested
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-default'
                  : 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              }`}
              aria-live="polite"
            >
              {hasRequested ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Request Submitted
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Request Video for This Question
                </>
              )}
            </button>
          )}

          <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
            The written explanation above covers all key concepts
          </p>
        </div>
      </div>
    );
  }

  // Video available state
  const video = question.videoExplanation!;

  return (
    <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-primary-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Video Explanation
          {video.duration && (
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
              ({formatDuration(video.duration)})
            </span>
          )}
        </h4>

        {video.transcriptUrl && (
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 flex items-center gap-1"
            aria-expanded={showTranscript}
            aria-controls="video-transcript"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {showTranscript ? 'Hide' : 'Show'} Transcript
          </button>
        )}
      </div>

      {video.title && (
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          {video.title}
        </p>
      )}

      <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
        {!isPlaying ? (
          // Thumbnail with play button
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full group focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2 rounded-xl"
            aria-label={`Play video: ${video.title || 'Video Explanation'}`}
          >
            {video.thumbnail ? (
              <img
                src={video.thumbnail}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <svg className="w-20 h-20 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </div>
            )}
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <div className="w-20 h-20 bg-white/90 group-hover:bg-white group-hover:scale-110 rounded-full flex items-center justify-center transition-all shadow-xl">
                <svg className="w-10 h-10 text-slate-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        ) : (
          // Embedded video player
          video.provider === 'direct' ? (
            <video
              src={video.url}
              controls
              autoPlay={!prefersReducedMotion}
              className="w-full h-full"
              aria-label={video.title || 'Video explanation'}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={getEmbedUrl()}
              title={video.title || 'Video explanation'}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          )
        )}
      </div>

      {/* Transcript section */}
      {showTranscript && video.transcriptUrl && (
        <div
          id="video-transcript"
          className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg max-h-64 overflow-y-auto"
          role="region"
          aria-label="Video transcript"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {/* Transcript would be loaded from transcriptUrl */}
            Loading transcript...
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * AI Explanation Button
 * For questions that support AI-powered explanations
 */
export const AIExplanationButton: React.FC<{
  questionId: string;
  onRequestAI?: (questionId: string) => void;
}> = ({ questionId, onRequestAI }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (onRequestAI) {
      setIsLoading(true);
      await onRequestAI(questionId);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
    >
      {isLoading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Generating...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Get AI Explanation
        </>
      )}
    </button>
  );
};

export default VideoExplanation;

import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from './NavigationProvider';
import clsx from 'clsx';

export interface BackButtonProps {
  /** Override the default destination */
  to?: string;
  /** Override the label (default shows context-aware label) */
  label?: string;
  /** Fallback if no history and no session */
  fallback?: string;
  /** Additional className */
  className?: string;
  /** Callback before navigation */
  onBeforeNavigate?: () => boolean | void;
  /** Show only icon on mobile */
  iconOnlyMobile?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

// Fallback destinations based on current path patterns
const getFallbackDestination = (pathname: string): { path: string; label: string } => {
  // Admin pages
  if (pathname.startsWith('/admin')) {
    if (pathname.includes('/edit') || pathname.includes('/new')) {
      return { path: '/admin/cms', label: 'CMS' };
    }
    return { path: '/admin', label: 'Admin' };
  }
  
  // Lesson viewer → Lessons
  if (pathname.startsWith('/lessons/')) {
    return { path: '/lessons', label: 'Lessons' };
  }
  
  // Study activities → Home
  if (pathname.startsWith('/practice') || 
      pathname.startsWith('/flashcards') || 
      pathname.startsWith('/tbs') ||
      pathname.startsWith('/quiz')) {
    return { path: '/home', label: 'Home' };
  }
  
  // AI Tutor → Home (or session origin)
  if (pathname.startsWith('/tutor') || pathname.startsWith('/ask-vory')) {
    return { path: '/home', label: 'Home' };
  }
  
  // Settings sub-pages → Settings
  if (pathname.startsWith('/settings/')) {
    return { path: '/settings', label: 'Settings' };
  }
  
  // Social pages → Home
  if (pathname.startsWith('/community') || 
      pathname.startsWith('/achievements') || 
      pathname.startsWith('/leaderboard')) {
    return { path: '/home', label: 'Home' };
  }
  
  // Progress → Home
  if (pathname.startsWith('/progress')) {
    return { path: '/home', label: 'Home' };
  }
  
  // Default
  return { path: '/home', label: 'Home' };
};

export const BackButton: React.FC<BackButtonProps> = ({
  to,
  label,
  fallback,
  className,
  onBeforeNavigate,
  iconOnlyMobile = false,
  size = 'md',
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, isInSession, endSession } = useNavigation();
  
  // Determine destination and label
  const getDestination = useCallback((): { path: string; label: string } => {
    // Explicit override
    if (to) {
      return { path: to, label: label || 'Back' };
    }
    
    // Daily plan session - always return to home/plan
    if (session.mode === 'daily-plan') {
      return { 
        path: '/home', 
        label: label || 'Daily Plan' 
      };
    }
    
    // Timed session - show warning (handled separately)
    if (session.mode === 'timed-quiz' || session.mode === 'exam') {
      return { 
        path: session.origin, 
        label: label || (session.mode === 'exam' ? 'Exit Exam' : 'Exit Quiz')
      };
    }
    
    // Explicit fallback
    if (fallback) {
      return { path: fallback, label: label || 'Back' };
    }
    
    // Smart fallback based on current page
    const dest = getFallbackDestination(location.pathname);
    return { path: dest.path, label: label || dest.label };
  }, [to, label, fallback, session, location.pathname]);
  
  const { path: destinationPath, label: destinationLabel } = getDestination();
  
  const handleClick = useCallback(() => {
    // Call beforeNavigate hook
    if (onBeforeNavigate) {
      const shouldContinue = onBeforeNavigate();
      if (shouldContinue === false) {
        return;
      }
    }
    
    // If going to session origin, end the session
    if (isInSession() && destinationPath === session.origin) {
      endSession();
    }
    
    // Navigate
    navigate(destinationPath);
  }, [onBeforeNavigate, isInSession, destinationPath, session.origin, endSession, navigate]);
  
  const sizeClasses = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-1.5',
    lg: 'text-base gap-2',
  };
  
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  
  return (
    <button
      onClick={handleClick}
      className={clsx(
        'inline-flex items-center font-medium transition-colors',
        'text-slate-600 dark:text-slate-300',
        'hover:text-slate-900 dark:hover:text-white',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'rounded-lg py-1.5 px-2 -ml-2',
        'hover:bg-slate-100 dark:hover:bg-slate-800',
        sizeClasses[size],
        className
      )}
      aria-label={`Go back to ${destinationLabel}`}
    >
      <ArrowLeft className={iconSizes[size]} />
      <span className={clsx(iconOnlyMobile && 'hidden sm:inline')}>
        {destinationLabel}
      </span>
    </button>
  );
};

export default BackButton;

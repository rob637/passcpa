import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to set document title based on current route
 * @param {string} title - Page-specific title
 * @param {boolean} announceToScreenReader - Whether to announce route change
 */
export const useDocumentTitle = (title: string, announceToScreenReader = true) => {
  useEffect(() => {
    const baseTitle = 'VoraPrep';
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    // Announce to screen readers on route change
    if (announceToScreenReader) {
      const announcement = document.getElementById('route-announcement');
      if (announcement) {
        announcement.textContent = `Navigated to ${title || 'page'}`;
      }
    }

    return () => {
      document.title = baseTitle;
    };
  }, [title, announceToScreenReader]);
};

/**
 * Route title mapping
 */
export const ROUTE_TITLES: Record<string, string> = {
  '/': 'CPA Exam Prep | Pass Your CPA on the First Try',
  '/home': 'Home',
  '/learn': 'Learn',
  '/you': 'You',
  '/dashboard': 'Home', // Redirect alias
  '/study': 'Learn', // Redirect alias
  '/practice': 'Practice Questions',
  '/flashcards': 'Flashcards',
  '/quiz': 'Timed Quiz',
  '/exam': 'Exam Simulator',
  '/tbs': 'Task-Based Simulations',
  '/written-communication': 'Written Communication',
  '/lessons': 'Lessons',
  '/progress': 'Progress',
  '/achievements': 'Achievements',
  '/tutor': 'Vory - AI Study Companion',
  '/ai-tutor': 'Vory - AI Study Companion',
  '/settings': 'Settings',
  '/pricing': 'Pricing',
  '/onboarding': 'Get Started',
  '/login': 'Sign In',
  '/register': 'Create Account',
  '/forgot-password': 'Reset Password',
  '/verify-email': 'Verify Email',
  '/admin/cms': 'Admin CMS',
  '/admin/seed': 'Admin Seed',
};

/**
 * Hook that automatically sets title based on current route
 * Returns the current page title for use in mobile headers
 */
export const useRouteTitle = (): string => {
  const location = useLocation();

  const title = getPageTitle(location.pathname);
  
  useEffect(() => {
    const baseTitle = 'VoraPrep';
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;
  }, [title]);
  
  return title;
};

/**
 * Get page title from pathname (extracted for reuse)
 */
export const getPageTitle = (pathname: string): string => {
  // Check for exact match first
  let title = ROUTE_TITLES[pathname];

  // Check for dynamic routes
  if (!title) {
    if (pathname.startsWith('/lessons/')) {
      title = 'Lesson';
    } else if (pathname.startsWith('/practice')) {
      title = 'Practice';
    } else if (pathname.startsWith('/flashcards')) {
      title = 'Flashcards';
    } else if (pathname.startsWith('/tbs')) {
      title = 'TBS';
    } else if (pathname.startsWith('/study-plan')) {
      title = 'Study Plan';
    } else if (pathname.startsWith('/resources')) {
      title = 'Resources';
    } else if (pathname.startsWith('/admin')) {
      title = 'Admin';
    }
  }

  return title || '';
};

export default useDocumentTitle;

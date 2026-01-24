import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to set document title based on current route
 * @param {string} title - Page-specific title
 * @param {boolean} announceToScreenReader - Whether to announce route change
 */
export const useDocumentTitle = (title, announceToScreenReader = true) => {
  useEffect(() => {
    const baseTitle = 'PassCPA';
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
export const ROUTE_TITLES = {
  '/dashboard': 'Dashboard',
  '/study': 'Study',
  '/practice': 'Practice Questions',
  '/flashcards': 'Flashcards',
  '/quiz': 'Timed Quiz',
  '/exam': 'Exam Simulator',
  '/tbs': 'Task-Based Simulations',
  '/written-communication': 'Written Communication',
  '/lessons': 'Lessons',
  '/progress': 'Progress',
  '/achievements': 'Achievements',
  '/tutor': 'AI Tutor',
  '/ai-tutor': 'AI Tutor',
  '/settings': 'Settings',
  '/onboarding': 'Get Started',
  '/login': 'Sign In',
  '/register': 'Create Account',
  '/forgot-password': 'Reset Password',
  '/admin/cms': 'Admin CMS',
  '/admin/seed': 'Admin Seed',
};

/**
 * Hook that automatically sets title based on current route
 */
export const useRouteTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const baseTitle = 'PassCPA';
    const path = location.pathname;

    // Check for exact match first
    let title = ROUTE_TITLES[path];

    // Check for dynamic routes
    if (!title) {
      if (path.startsWith('/lessons/')) {
        title = 'Lesson';
      }
    }

    document.title = title ? `${title} | ${baseTitle}` : baseTitle;
  }, [location.pathname]);
};

export default useDocumentTitle;

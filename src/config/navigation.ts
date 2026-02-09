/**
 * Navigation Configuration
 * 
 * Centralized configuration for app navigation that is course-agnostic.
 * The MainLayout and other navigation components consume this config
 * without needing to know about specific courses.
 */

import { Home, BookOpen, User, Compass, Target, LucideIcon } from 'lucide-react';
import { CourseId } from '../types/course';

export interface NavItem {
  /** URL path for navigation */
  path: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Display label */
  label: string;
  /** Onboarding tour ID */
  tourId: string;
  /** Navigation type for active state detection */
  navType: 'home' | 'learn' | 'practice' | 'you' | 'strategy';
}

export interface CourseNavConfig {
  /** Primary navigation paths */
  paths: {
    home: string;
    learn: string;
    practice: string;
    you: string;
    strategy: string;
  };
  /** Paths that should be considered "active" for each nav type */
  activePaths: {
    home: string[];
    learn: string[];
    practice: string[];
    you: string[];
    strategy: string[];
  };
  /** Whether to show the Strategy nav item */
  showStrategy: boolean;
  /** Whether Strategy is a link or just highlighter for certain routes */
  strategyIsQueryParam?: { path: string; param: string; value: string };
}

/**
 * Navigation configuration per course.
 * Adding a new course requires only adding an entry here.
 */
export const COURSE_NAV_CONFIG: Record<CourseId, CourseNavConfig> = {
  cpa: {
    paths: {
      home: '/home',
      learn: '/learn',
      practice: '/practice',
      you: '/you',
      strategy: '/exam-guide',
    },
    activePaths: {
      home: ['/home', '/flashcards', '/quiz', '/exam', '/tbs', '/written-communication', '/ai-tutor', '/tutor'],
      learn: ['/learn', '/lessons'],
      practice: ['/practice'],
      you: ['/you', '/progress', '/settings', '/achievements', '/community'],
      strategy: ['/exam-guide'],
    },
    showStrategy: true,
  },
  ea: {
    paths: {
      home: '/ea',
      learn: '/learn',
      practice: '/practice',
      you: '/you',
      strategy: '/exam-guide',
    },
    activePaths: {
      home: ['/ea'],
      learn: ['/learn', '/lessons'],
      practice: ['/practice'],
      you: ['/you', '/progress', '/settings', '/achievements'],
      strategy: ['/exam-guide'],
    },
    showStrategy: true,
  },
  cma: {
    paths: {
      home: '/cma/dashboard',
      learn: '/learn',
      practice: '/practice',
      you: '/you',
      strategy: '/exam-guide',
    },
    activePaths: {
      home: ['/cma/dashboard', '/cma/essay-simulator'],
      learn: ['/learn', '/lessons'],
      practice: ['/practice', '/cma/practice'],
      you: ['/you', '/progress', '/settings', '/achievements'],
      strategy: ['/exam-guide'],
    },
    showStrategy: true,
  },
  cia: {
    paths: {
      home: '/cia/dashboard',
      learn: '/learn',
      practice: '/practice',
      you: '/you',
      strategy: '/exam-guide',
    },
    activePaths: {
      home: ['/cia/dashboard'],
      learn: ['/learn', '/lessons'],
      practice: ['/practice', '/cia/practice'],
      you: ['/you', '/progress', '/settings', '/achievements'],
      strategy: ['/exam-guide'],
    },
    showStrategy: true,
  },
  cfp: {
    paths: {
      home: '/cfp/dashboard',
      learn: '/learn',
      practice: '/practice',
      you: '/you',
      strategy: '/exam-guide',
    },
    activePaths: {
      home: ['/cfp/dashboard', '/cfp/case-study'],
      learn: ['/learn', '/lessons'],
      practice: ['/practice', '/cfp/practice'],
      you: ['/you', '/progress', '/settings', '/achievements'],
      strategy: ['/exam-guide'],
    },
    showStrategy: true,
  },
  cisa: {
    paths: {
      home: '/cisa/dashboard',
      learn: '/learn',
      practice: '/practice',
      you: '/you',
      strategy: '/exam-guide',
    },
    activePaths: {
      home: ['/cisa/dashboard'],
      learn: ['/learn', '/lessons'],
      practice: ['/practice', '/cisa/practice'],
      you: ['/you', '/progress', '/settings', '/achievements'],
      strategy: ['/exam-guide'],
    },
    showStrategy: true,
  },
};

/**
 * Get the base navigation items for a course.
 */
export function getNavItems(courseId: CourseId): NavItem[] {
  const config = COURSE_NAV_CONFIG[courseId];
  
  const items: NavItem[] = [
    { path: config.paths.home, icon: Home, label: 'Home', tourId: 'home', navType: 'home' },
    { path: config.paths.learn, icon: BookOpen, label: 'Learn', tourId: 'learn', navType: 'learn' },
    { path: config.paths.practice, icon: Target, label: 'Practice', tourId: 'practice', navType: 'practice' },
    { path: config.paths.you, icon: User, label: 'You', tourId: 'you', navType: 'you' },
  ];
  
  if (config.showStrategy) {
    items.push({
      path: config.paths.strategy,
      icon: Compass,
      label: 'Exam Guide',
      tourId: 'strategy',
      navType: 'strategy',
    });
  }
  
  return items;
}

/**
 * Check if a navigation item is active for the current path.
 */
export function isNavActive(
  navType: 'home' | 'learn' | 'practice' | 'you' | 'strategy',
  pathname: string,
  searchParams: URLSearchParams,
  courseId: CourseId
): boolean {
  const config = COURSE_NAV_CONFIG[courseId];
  
  // Special handling for strategy query param
  if (navType === 'strategy' && config.strategyIsQueryParam) {
    const { path, param, value } = config.strategyIsQueryParam;
    return pathname === path && searchParams.get(param) === value;
  }
  
  // Check if pathname matches or starts with any of the active paths
  const activePaths = config.activePaths[navType];
  return activePaths.some(p => pathname === p || pathname.startsWith(p + '/'));
}

/**
 * Get the navigation config for a course.
 */
export function getNavConfig(courseId: CourseId): CourseNavConfig {
  return COURSE_NAV_CONFIG[courseId];
}

/**
 * Navigation Configuration
 * 
 * Centralized configuration for app navigation that is course-agnostic.
 * The MainLayout and other navigation components consume this config
 * without needing to know about specific courses.
 */

import { Home, BookOpen, User, Compass, LucideIcon } from 'lucide-react';
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
  navType: 'home' | 'learn' | 'you' | 'strategy';
}

export interface CourseNavConfig {
  /** Primary navigation paths */
  paths: {
    home: string;
    learn: string;
    you: string;
    strategy: string;
  };
  /** Paths that should be considered "active" for each nav type */
  activePaths: {
    home: string[];
    learn: string[];
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
      you: '/you',
      strategy: '/lessons?section=PREP',
    },
    activePaths: {
      home: ['/home', '/practice', '/flashcards', '/quiz', '/exam', '/tbs', '/written-communication', '/ai-tutor', '/tutor'],
      learn: ['/learn', '/lessons'],
      you: ['/you', '/progress', '/settings', '/achievements', '/community'],
      strategy: [],
    },
    showStrategy: true,
    strategyIsQueryParam: { path: '/lessons', param: 'section', value: 'PREP' },
  },
  ea: {
    paths: {
      home: '/ea',
      learn: '/ea/section/SEE1',
      you: '/you',
      strategy: '/ea',
    },
    activePaths: {
      home: ['/ea'],
      learn: ['/ea/section', '/ea/lessons', '/lessons'],
      you: ['/you', '/progress', '/settings', '/achievements'],
      strategy: [],
    },
    showStrategy: false,
  },
  cma: {
    paths: {
      home: '/cma/dashboard',
      learn: '/cma/section/CMA1',
      you: '/you',
      strategy: '/cma/dashboard',
    },
    activePaths: {
      home: ['/cma/dashboard', '/cma/practice', '/cma/essay-simulator'],
      learn: ['/cma/section', '/cma/lessons', '/lessons'],
      you: ['/you', '/progress', '/settings', '/achievements'],
      strategy: [],
    },
    showStrategy: false,
  },
  cia: {
    paths: {
      home: '/cia/dashboard',
      learn: '/cia/section/CIA1',
      you: '/you',
      strategy: '/cia/dashboard',
    },
    activePaths: {
      home: ['/cia/dashboard', '/cia/practice'],
      learn: ['/cia/section', '/cia/lessons', '/lessons'],
      you: ['/you', '/progress', '/settings', '/achievements'],
      strategy: [],
    },
    showStrategy: false,
  },
  cfp: {
    paths: {
      home: '/cfp/dashboard',
      learn: '/cfp/domain/CFP-GEN',
      you: '/you',
      strategy: '/cfp/dashboard',
    },
    activePaths: {
      home: ['/cfp/dashboard', '/cfp/practice', '/cfp/case-study'],
      learn: ['/cfp/domain', '/cfp/lessons', '/lessons'],
      you: ['/you', '/progress', '/settings', '/achievements'],
      strategy: [],
    },
    showStrategy: false,
  },
  cisa: {
    paths: {
      home: '/cisa/dashboard',
      learn: '/cisa/section/CISA1',
      you: '/you',
      strategy: '/cisa/dashboard',
    },
    activePaths: {
      home: ['/cisa/dashboard', '/cisa/practice'],
      learn: ['/cisa/section', '/cisa/lessons', '/lessons'],
      you: ['/you', '/progress', '/settings', '/achievements'],
      strategy: [],
    },
    showStrategy: false,
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
    { path: config.paths.you, icon: User, label: 'You', tourId: 'you', navType: 'you' },
  ];
  
  if (config.showStrategy) {
    items.push({
      path: config.paths.strategy,
      icon: Compass,
      label: 'Strategy',
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
  navType: 'home' | 'learn' | 'you' | 'strategy',
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

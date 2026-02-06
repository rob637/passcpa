/**
 * Course-aware navigation utilities
 * Provides centralized course-specific path resolution to prevent course bleeding
 */

import { CourseId } from '../types/course';

// Course-specific navigation paths
export const COURSE_HOME_PATHS: Record<CourseId, string> = {
  cpa: '/home',
  ea: '/ea',
  cma: '/cma/dashboard',
  cia: '/cia/dashboard',
  cfp: '/cfp/dashboard',
  cisa: '/cisa/dashboard',
};

export const COURSE_DASHBOARD_PATHS: Record<CourseId, string> = {
  cpa: '/home',
  ea: '/ea',
  cma: '/cma/dashboard',
  cia: '/cia/dashboard',
  cfp: '/cfp/dashboard',
  cisa: '/cisa/dashboard',
};

// Get the home path for a specific course
export function getCourseHomePath(courseId: CourseId): string {
  return COURSE_HOME_PATHS[courseId] || '/home';
}

// Detect course from pathname
export function detectCourseFromPath(pathname: string): CourseId {
  if (pathname.startsWith('/ea')) return 'ea';
  if (pathname.startsWith('/cma')) return 'cma';
  if (pathname.startsWith('/cia')) return 'cia';
  if (pathname.startsWith('/cfp')) return 'cfp';
  if (pathname.startsWith('/cisa')) return 'cisa';
  return 'cpa'; // Default to CPA for /home, /learn, /you, etc.
}

// Get the home path based on current pathname
export function getHomePathFromLocation(pathname: string): string {
  const courseId = detectCourseFromPath(pathname);
  return getCourseHomePath(courseId);
}

// Hook helper - for use in components (they should use the hook below)
export function getCoursePath(courseId: CourseId, path: 'home' | 'dashboard'): string {
  switch (path) {
    case 'home':
    case 'dashboard':
      return COURSE_HOME_PATHS[courseId];
    default:
      return COURSE_HOME_PATHS[courseId];
  }
}

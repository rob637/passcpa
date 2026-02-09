/**
 * Course Detection Utility
 * 
 * Determines the active course based on URL, user preferences, or defaults.
 * Supports multiple detection strategies for flexibility.
 */

import { CourseId, isValidCourseId, DEFAULT_COURSE_ID } from '../types/course';

export type CourseDetectionSource = 
  | 'domain' 
  | 'subdomain' 
  | 'path' 
  | 'query-param'
  | 'user-preference' 
  | 'default';

export interface CourseDetectionResult {
  courseId: CourseId;
  source: CourseDetectionSource;
}

/**
 * Domain to course mapping for dedicated course domains
 */
const DOMAIN_COURSE_MAP: Record<string, CourseId> = {
  'voraprepcpa.com': 'cpa',
  'www.voraprepcpa.com': 'cpa',
  'voraprepcma.com': 'cma',
  'www.voraprepcma.com': 'cma',
  'voraprepea.com': 'ea',
  'www.voraprepea.com': 'ea',
};

/**
 * Local storage key for user's course preference
 */
const COURSE_PREFERENCE_KEY = 'voraprep_active_course';

/**
 * Detect the current course from various sources
 * 
 * Priority order:
 * 1. Domain-based routing (e.g., voraprepcpa.com)
 * 2. Subdomain routing (e.g., cpa.voraprep.com)
 * 3. Path-based routing (e.g., /cpa/lessons)
 * 4. Query parameter (e.g., ?course=cpa)
 * 5. User preference (localStorage)
 * 6. Default (cpa)
 */
export const detectCourse = (): CourseDetectionResult => {
  // Only run in browser
  if (typeof window === 'undefined') {
    return { courseId: DEFAULT_COURSE_ID, source: 'default' };
  }

  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  
  // 1. Check domain-based routing
  if (DOMAIN_COURSE_MAP[hostname]) {
    return { 
      courseId: DOMAIN_COURSE_MAP[hostname], 
      source: 'domain' 
    };
  }
  
  // 2. Check subdomain-based routing (e.g., cpa.voraprep.com)
  const subdomainMatch = hostname.match(/^(cpa|cma|ea|cia|cisa|cfp)\.voraprep\.com$/);
  if (subdomainMatch && isValidCourseId(subdomainMatch[1])) {
    return { 
      courseId: subdomainMatch[1] as CourseId, 
      source: 'subdomain' 
    };
  }
  
  // 3. Check path-based routing (e.g., /cpa/lessons)
  const pathMatch = pathname.match(/^\/(cpa|cma|ea|cia|cisa|cfp)(?:\/|$)/);
  if (pathMatch && isValidCourseId(pathMatch[1])) {
    return { 
      courseId: pathMatch[1] as CourseId, 
      source: 'path' 
    };
  }
  
  // 4. Check query parameter (e.g., ?course=cpa)
  const courseParam = searchParams.get('course');
  if (courseParam && isValidCourseId(courseParam)) {
    return { 
      courseId: courseParam as CourseId, 
      source: 'query-param' 
    };
  }
  
  // 5. Check user preference (localStorage)
  try {
    const savedCourse = localStorage.getItem(COURSE_PREFERENCE_KEY);
    if (savedCourse && isValidCourseId(savedCourse)) {
      return { 
        courseId: savedCourse as CourseId, 
        source: 'user-preference' 
      };
    }
  } catch {
    // localStorage not available (SSR, private browsing, etc.)
  }
  
  // 6. Default to CPA
  return { 
    courseId: DEFAULT_COURSE_ID, 
    source: 'default' 
  };
};

/**
 * Save user's course preference
 */
export const saveCoursePreference = (courseId: CourseId): void => {
  try {
    localStorage.setItem(COURSE_PREFERENCE_KEY, courseId);
  } catch {
    // localStorage not available
  }
};

/**
 * Clear user's course preference
 */
export const clearCoursePreference = (): void => {
  try {
    localStorage.removeItem(COURSE_PREFERENCE_KEY);
  } catch {
    // localStorage not available
  }
};

/**
 * Get the course preference from localStorage (if any)
 */
export const getCoursePreference = (): CourseId | null => {
  try {
    const saved = localStorage.getItem(COURSE_PREFERENCE_KEY);
    if (saved && isValidCourseId(saved)) {
      return saved as CourseId;
    }
  } catch {
    // localStorage not available
  }
  return null;
};

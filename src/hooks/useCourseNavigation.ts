/**
 * Hook for course-aware navigation
 * Provides course-specific path resolution based on current location
 */

import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { detectCourseFromPath, getCourseHomePath, COURSE_HOME_PATHS } from '../utils/courseNavigation';
import { CourseId } from '../types/course';

export interface CourseNavigationPaths {
  home: string;
  courseId: CourseId;
}

/**
 * Returns course-aware navigation paths based on current location
 * Use this hook to get the correct home path for the current course context
 */
export function useCourseNavigation(): CourseNavigationPaths {
  const location = useLocation();
  
  return useMemo(() => {
    const courseId = detectCourseFromPath(location.pathname);
    return {
      home: getCourseHomePath(courseId),
      courseId,
    };
  }, [location.pathname]);
}

/**
 * Returns just the home path for the current course
 */
export function useCourseHome(): string {
  const location = useLocation();
  return useMemo(() => {
    const courseId = detectCourseFromPath(location.pathname);
    return COURSE_HOME_PATHS[courseId];
  }, [location.pathname]);
}

/**
 * Course Registry
 * 
 * Central registry for all available courses. This is the single source of truth
 * for course configurations across the platform.
 */

import { Course, CourseId, DEFAULT_COURSE_ID } from '../types/course';
import { CPA_COURSE } from './cpa';
import { EA_COURSE } from './ea';
import { CMA_COURSE } from './cma';
import { CIA_COURSE } from './cia';
import { ENABLE_EA_COURSE, ENABLE_CMA_COURSE } from '../config/featureFlags';

/**
 * All registered courses
 */
export const COURSES: Record<CourseId, Course> = {
  cpa: CPA_COURSE,
  ea: EA_COURSE,
  cma: CMA_COURSE,
  cia: CIA_COURSE,
} as Record<CourseId, Course>;

/**
 * Courses that are currently active/available to users
 */
export const ACTIVE_COURSES: CourseId[] = [
  'cpa',
  ...(ENABLE_EA_COURSE ? ['ea'] : []),
  ...(ENABLE_CMA_COURSE ? ['cma'] : []),
] as CourseId[];

/**
 * Get a course by ID
 */
export const getCourse = (id: CourseId): Course | undefined => COURSES[id];

/**
 * Get the default course (CPA for backwards compatibility)
 */
export const getDefaultCourse = (): Course => COURSES[DEFAULT_COURSE_ID];

/**
 * Get the default course ID
 */
export const getDefaultCourseId = (): CourseId => DEFAULT_COURSE_ID;

/**
 * Check if a course is active
 */
export const isCourseActive = (id: CourseId): boolean => ACTIVE_COURSES.includes(id);

/**
 * Get all active courses
 */
export const getActiveCourses = (): Course[] => 
  ACTIVE_COURSES.map(id => COURSES[id]).filter(Boolean);

/**
 * Get course section by ID
 */
export const getCourseSection = (courseId: CourseId, sectionId: string) => {
  const course = getCourse(courseId);
  return course?.sections.find(s => s.id === sectionId);
};

// Re-export for convenience
export { CPA_COURSE } from './cpa';
export { isValidCourseId, DEFAULT_COURSE_ID } from '../types/course';
export type { Course, CourseId } from '../types/course';

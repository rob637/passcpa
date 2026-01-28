/**
 * useCourse Hook
 * 
 * Provides access to the current course context throughout the application.
 * Re-exports from CourseProvider for convenience.
 */

export { useCourse, useCourseOptional } from '../providers/CourseProvider';
export type { CourseContextType } from '../providers/CourseProvider';

/**
 * Course Provider
 * 
 * Provides course context to the entire application. Handles course detection,
 * switching, and persistence of user preferences.
 */

import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback,
  ReactNode,
  useMemo,
} from 'react';
import { CourseId, Course } from '../types/course';
import { getCourse, getDefaultCourseId, ACTIVE_COURSES } from '../courses';
import { detectCourse, saveCoursePreference } from '../utils/courseDetection';

export interface CourseContextType {
  /** Current course ID */
  courseId: CourseId;
  
  /** Current course configuration */
  course: Course;
  
  /** Change the active course */
  setCourse: (id: CourseId) => void;
  
  /** All courses the user can access (based on subscription) */
  availableCourses: CourseId[];
  
  /** All courses the user has purchased */
  userCourses: CourseId[];
  
  /** Whether the course context is still initializing */
  isLoading: boolean;
  
  /** How the current course was detected */
  detectionSource: string;
}

const CourseContext = createContext<CourseContextType | null>(null);

export interface CourseProviderProps {
  children: ReactNode;
  
  /** Override the initial course (useful for testing or SSR) */
  initialCourseId?: CourseId;
  
  /** Courses the user has access to (from subscription) */
  userCourses?: CourseId[];
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ 
  children, 
  initialCourseId,
  userCourses: propUserCourses,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [detectionSource, setDetectionSource] = useState<string>('initializing');
  
  // Initialize course from detection or prop
  const [courseId, setCourseId] = useState<CourseId>(() => {
    if (initialCourseId) {
      return initialCourseId;
    }
    const detected = detectCourse();
    return detected.courseId;
  });
  
  // User's accessible courses (from subscription)
  // Default to all active courses during beta
  const [userCourses, setUserCourses] = useState<CourseId[]>(
    propUserCourses || ACTIVE_COURSES
  );
  
  // Get the course configuration
  const course = useMemo(() => {
    const c = getCourse(courseId);
    // Fallback to default if course not found
    return c || getCourse(getDefaultCourseId())!;
  }, [courseId]);
  
  // Initialize detection source on mount
  useEffect(() => {
    if (!initialCourseId) {
      const detected = detectCourse();
      setDetectionSource(detected.source);
      // Only update if different (avoid unnecessary re-renders)
      if (detected.courseId !== courseId) {
        setCourseId(detected.courseId);
      }
    } else {
      setDetectionSource('prop');
    }
    setIsLoading(false);
  }, [initialCourseId]);
  
  // Update user courses if prop changes
  useEffect(() => {
    if (propUserCourses) {
      setUserCourses(propUserCourses);
    }
  }, [propUserCourses]);
  
  /**
   * Change the active course
   */
  const setCourse = useCallback((id: CourseId) => {
    setCourseId(id);
    saveCoursePreference(id);
    setDetectionSource('user-preference');
  }, []);
  
  const contextValue = useMemo<CourseContextType>(() => ({
    courseId,
    course,
    setCourse,
    availableCourses: ACTIVE_COURSES,
    userCourses,
    isLoading,
    detectionSource,
  }), [courseId, course, setCourse, userCourses, isLoading, detectionSource]);
  
  return (
    <CourseContext.Provider value={contextValue}>
      {children}
    </CourseContext.Provider>
  );
};

/**
 * Hook to access course context
 * 
 * @throws Error if used outside of CourseProvider
 */
export const useCourse = (): CourseContextType => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

/**
 * Hook to access course context with optional fallback
 * 
 * @returns Course context or null if not in provider
 */
export const useCourseOptional = (): CourseContextType | null => {
  return useContext(CourseContext);
};

export default CourseProvider;

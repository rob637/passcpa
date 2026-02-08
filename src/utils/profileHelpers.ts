/**
 * Profile Helpers
 * 
 * Utility functions for accessing multi-course user profile data
 * with backwards compatibility for legacy single-course fields.
 */

import { UserProfile, CourseIdType } from '../types';

/**
 * Get the exam date for a specific section.
 * Falls back to legacy examDate if examDates is not set.
 * 
 * @param profile - User profile object
 * @param sectionId - Exam section ID (e.g., 'FAR', 'SEE1')
 * @returns Date object or null
 */
export function getExamDate(
  profile: UserProfile | null | undefined,
  sectionId?: string | null
): Date | null {
  if (!profile) return null;

  // Try new multi-section examDates first
  if (sectionId && profile.examDates?.[sectionId]) {
    const dateValue = profile.examDates[sectionId];
    if (dateValue) {
      return normalizeDate(dateValue);
    }
  }

  // Fall back to legacy examDate
  if (profile.examDate) {
    return normalizeDate(profile.examDate);
  }

  return null;
}

/**
 * Get the study plan ID for a specific course.
 * Falls back to legacy studyPlanId if studyPlans is not set.
 * 
 * @param profile - User profile object
 * @param courseId - Course ID (e.g., 'cpa', 'ea')
 * @returns Study plan ID or null
 */
export function getStudyPlanId(
  profile: UserProfile | null | undefined,
  courseId?: CourseIdType | null
): string | null {
  if (!profile) return null;

  // Try new multi-course studyPlans first
  if (courseId && profile.studyPlans?.[courseId]) {
    return profile.studyPlans[courseId] ?? null;
  }

  // Fall back to legacy studyPlanId
  return profile.studyPlanId ?? null;
}

/**
 * Normalize a date value from Firestore (may be Date or Timestamp-like object)
 */
function normalizeDate(
  value: Date | { seconds: number; nanoseconds: number } | { toDate?: () => Date } | null | undefined
): Date | null {
  if (!value) return null;
  
  // Already a Date
  if (value instanceof Date) return value;
  
  // Firestore Timestamp (has toDate method)
  if (typeof (value as { toDate?: () => Date }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate();
  }
  
  // Plain object with seconds (serialized Timestamp)
  if ('seconds' in value && typeof value.seconds === 'number') {
    return new Date(value.seconds * 1000);
  }
  
  return null;
}

/**
 * Create an update object for setting an exam date for a specific section.
 * This preserves existing dates for other sections.
 * 
 * @param currentProfile - Current user profile
 * @param sectionId - Section to update
 * @param newDate - New date value (or null to clear)
 * @returns Partial profile update object
 */
export function createExamDateUpdate(
  currentProfile: UserProfile | null | undefined,
  sectionId: string,
  newDate: Date | string | null
): Partial<UserProfile> {
  const examDates = { ...(currentProfile?.examDates || {}) };
  
  if (newDate === null) {
    delete examDates[sectionId];
  } else {
    examDates[sectionId] = typeof newDate === 'string' ? new Date(newDate) : newDate;
  }
  
  return {
    examDates,
    // Also update legacy field for backwards compatibility
    examDate: newDate ? (typeof newDate === 'string' ? new Date(newDate) : newDate) : null,
  };
}

/**
 * Create an update object for setting a study plan for a specific course.
 * This preserves existing plans for other courses.
 * 
 * @param currentProfile - Current user profile
 * @param courseId - Course to update
 * @param planId - New study plan ID (or null to clear)
 * @returns Partial profile update object
 */
export function createStudyPlanUpdate(
  currentProfile: UserProfile | null | undefined,
  courseId: CourseIdType,
  planId: string | null
): Partial<UserProfile> {
  const studyPlans = { ...(currentProfile?.studyPlans || {}) } as Record<CourseIdType, string | null>;
  
  if (planId === null) {
    delete studyPlans[courseId];
  } else {
    studyPlans[courseId] = planId;
  }
  
  return {
    studyPlans,
    // Also update legacy field for backwards compatibility
    studyPlanId: planId,
  };
}

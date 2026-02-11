/**
 * Profile Helpers
 * 
 * Utility functions for accessing multi-course user profile data
 * with backwards compatibility for legacy single-course fields.
 */

import { UserProfile, CourseIdType } from '../types';

// Single-exam courses store dates by course ID (uppercase), not section
const SINGLE_EXAM_COURSES = ['cfp', 'cisa'];

/**
 * Get the exam date for a specific section/course.
 * 
 * Lookup order:
 * 1. Section-specific: examDates[sectionId] (e.g., 'FAR', 'SEE1')
 * 2. Course-specific: examDates[COURSE] (e.g., 'CFP', 'CISA') - for single-exam courses
 * 3. Legacy fallback: examDate (only if examDates has no entries at all)
 * 
 * @param profile - User profile object
 * @param sectionId - Exam section ID (e.g., 'FAR', 'SEE1', 'CFP-PCR')
 * @param courseId - Optional course ID for single-exam course lookup
 * @returns Date object or null
 */
export function getExamDate(
  profile: UserProfile | null | undefined,
  sectionId?: string | null,
  courseId?: CourseIdType | null
): Date | null {
  if (!profile) return null;

  // 1. Try section-specific lookup first
  if (sectionId && profile.examDates?.[sectionId]) {
    const dateValue = profile.examDates[sectionId];
    if (dateValue) {
      return normalizeDate(dateValue);
    }
  }

  // 2. For single-exam courses, also try course ID (uppercase)
  // These courses save dates by 'CFP', 'CISA' etc.
  if (courseId && SINGLE_EXAM_COURSES.includes(courseId.toLowerCase())) {
    const courseKey = courseId.toUpperCase();
    if (profile.examDates?.[courseKey]) {
      return normalizeDate(profile.examDates[courseKey]);
    }
  }
  
  // 3. Auto-detect course from section prefix (e.g., 'CFP-PCR' → 'CFP')
  if (sectionId) {
    const sectionPrefix = sectionId.split('-')[0]?.toUpperCase();
    if (sectionPrefix && SINGLE_EXAM_COURSES.includes(sectionPrefix.toLowerCase())) {
      if (profile.examDates?.[sectionPrefix]) {
        return normalizeDate(profile.examDates[sectionPrefix]);
      }
    }
  }

  // 4. Legacy fallback - ONLY if examDates has no entries
  // This prevents cross-contamination between courses
  if (!profile.examDates || Object.keys(profile.examDates).length === 0) {
    if (profile.examDate) {
      return normalizeDate(profile.examDate);
    }
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

/**
 * Get the current exam section for a user based on the course.
 * Returns the stored examSection only if it belongs to the current course,
 * otherwise returns the default section for that course.
 * 
 * @param profile - User profile object  
 * @param courseId - Current course ID
 * @param getDefaultSectionFn - Function to get default section for a course
 * @returns Section ID appropriate for the current course
 */
export function getCurrentSection(
  profile: UserProfile | null | undefined,
  courseId: CourseIdType,
  getDefaultSectionFn: (courseId: string) => string
): string {
  const storedSection = profile?.examSection as string | undefined;
  
  // If no stored section, return default for course
  if (!storedSection) {
    return getDefaultSectionFn(courseId);
  }
  
  // Check if stored section belongs to current course
  // Use section prefix patterns to determine course membership
  const sectionCourseMapping: Record<string, RegExp> = {
    cpa: /^(FAR|AUD|REG|BAR|ISC|TCP)$/,
    ea: /^SEE[123]$/,
    cma: /^CMA[12]$/,
    cia: /^(part[123]|CIA[123])$/,
    cisa: /^(domain[1-5]|CISA[1-5])$/,
    cfp: /^(FPF|INV|TAX|RIS|EST|PSY|PRO|CFP-)/,
  };
  
  const coursePattern = sectionCourseMapping[courseId];
  if (coursePattern && coursePattern.test(storedSection)) {
    return storedSection;
  }
  
  // Stored section doesn't match current course, return default
  return getDefaultSectionFn(courseId);
}

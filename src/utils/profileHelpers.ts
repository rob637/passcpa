/**
 * Profile Helpers
 * 
 * Utility functions for accessing multi-course user profile data
 * with backwards compatibility for legacy single-course fields.
 */

import { UserProfile, CourseIdType } from '../types';

// All courses now store dates by course ID (uppercase) for simplicity
// This provides one exam date per course instead of per-section
const ALL_COURSE_IDS = ['cpa', 'ea', 'cma', 'cfp', 'cisa'];

// Legacy section-specific keys that may have been used to store exam dates
// Maps course -> array of possible legacy keys to check (for migration)
const LEGACY_SECTION_KEYS: Record<string, string[]> = {
  cpa: ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP', 'BEC'],
  ea: ['SEE1', 'SEE2', 'SEE3'],
  cma: ['CMA1', 'CMA2'],
  cisa: ['Audit', 'Gov', 'Dev', 'Ops', 'Sec', 'CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'],
  cfp: ['Ethics', 'Gen', 'Risk', 'Inv', 'Tax', 'Ret', 'Est', 'Psy', 'CFP-PCR', 'CFP-GEN', 'CFP-RISK', 'CFP-INV', 'CFP-TAX', 'CFP-RET', 'CFP-EST', 'CFP-PSY'],
};

/**
 * Get the exam date for a course.
 * 
 * Lookup order (simplified to one date per course):
 * 1. Course-specific: examDates[COURSE] (e.g., 'CPA', 'EA', 'CFP')
 * 2. Legacy section fallback: examDates[sectionId] for migration
 * 3. Legacy fallback: examDate (only if examDates has no entries at all)
 * 
 * @param profile - User profile object
 * @param sectionId - Optional section ID for legacy fallback lookup
 * @param courseId - Course ID (e.g., 'cpa', 'ea')
 * @returns Date object or null
 */
export function getExamDate(
  profile: UserProfile | null | undefined,
  sectionId?: string | null,
  courseId?: CourseIdType | null
): Date | null {
  if (!profile) return null;

  // 1. Try course-level lookup first (the new standard)
  if (courseId) {
    const courseKey = courseId.toUpperCase();
    if (profile.examDates?.[courseKey]) {
      return normalizeDate(profile.examDates[courseKey]);
    }
  }

  // 2. Legacy section-specific fallback (for users with old data)
  if (sectionId && profile.examDates?.[sectionId]) {
    const dateValue = profile.examDates[sectionId];
    if (dateValue) {
      return normalizeDate(dateValue);
    }
  }
  
  // 2b. Check legacy section keys for this course (for migration)
  if (courseId) {
    const legacyKeys = LEGACY_SECTION_KEYS[courseId.toLowerCase()];
    if (legacyKeys) {
      for (const key of legacyKeys) {
        if (profile.examDates?.[key]) {
          return normalizeDate(profile.examDates[key]);
        }
      }
    }
  }
  
  // 3. Auto-detect course from section prefix (e.g., 'CFP-PCR' → 'CFP')
  if (sectionId && !courseId) {
    const sectionPrefix = sectionId.split('-')[0]?.toUpperCase();
    if (sectionPrefix && ALL_COURSE_IDS.includes(sectionPrefix.toLowerCase())) {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): Date | null {
  if (!value) return null;
  
  // Already a Date
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }
  
  // Firestore Timestamp (has toDate method)
  if (typeof value.toDate === 'function') {
    const d = value.toDate();
    return isNaN(d.getTime()) ? null : d;
  }
  
  // Plain object with seconds (serialized Timestamp)
  if (typeof value === 'object' && 'seconds' in value && typeof value.seconds === 'number') {
    return new Date(value.seconds * 1000);
  }
  
  // String dates (ISO strings, YYYY-MM-DD, etc.)
  if (typeof value === 'string') {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  
  // Number (epoch milliseconds)
  if (typeof value === 'number') {
    return new Date(value);
  }
  
  return null;
}

/**
 * Create an update object for setting an exam date for a course.
 * Uses course ID (uppercase) as the key for all courses.
 * 
 * This simplified approach stores one exam date per course instead of
 * per-section, matching how most users study (one exam at a time).
 * 
 * @param currentProfile - Current user profile
 * @param _sectionId - Deprecated: kept for backwards compatibility but ignored
 * @param newDate - New date value (or null to clear)
 * @param courseId - Course ID - uses this as the storage key
 * @returns Partial profile update object
 */
export function createExamDateUpdate(
  currentProfile: UserProfile | null | undefined,
  _sectionId: string,
  newDate: Date | string | null,
  courseId?: CourseIdType | null
): Partial<UserProfile> {
  const examDates = { ...(currentProfile?.examDates || {}) };
  
  // Always use course ID (uppercase) as the key for all courses
  // This provides one exam date per course, not per-section
  const dateKey = courseId ? courseId.toUpperCase() : _sectionId;
  
  if (newDate === null) {
    delete examDates[dateKey];
  } else {
    examDates[dateKey] = typeof newDate === 'string' ? new Date(newDate) : newDate;
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
    cisa: /^(domain[1-5]|CISA[1-5]|CISA)$/,   // Accept 'CISA' for single-exam course
    cfp: /^(CFP-.+|CFP)$/,  // CFP-PCR, CFP-GEN, etc. or 'CFP' for single-exam course
  };
  
  const coursePattern = sectionCourseMapping[courseId];
  if (coursePattern && coursePattern.test(storedSection)) {
    return storedSection;
  }
  
  // Stored section doesn't match current course, return default
  return getDefaultSectionFn(courseId);
}

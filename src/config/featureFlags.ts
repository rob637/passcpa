export const FEATURES = {
  aiTutor: true, // Vory - AI Study Companion - add VITE_GEMINI_API_KEY for full AI
  examSimulator: true,
  flashcards: true,
  tbs: true, // Task-Based Simulations
  writtenCommunication: true, // Legacy - WC was removed when BEC retired Dec 2023
  adminTools: true,
  blueprint2026Preview: true, // Allow users to toggle 2026 content preview
  offlineMode: true,
  gamification: true, // Streaks, points
};

/**
 * Check if a specific feature is enabled
 */
export const isFeatureEnabled = (feature: keyof typeof FEATURES) => FEATURES[feature];

/**
 * Course Availability Flags
 * Reads from VITE_ENABLE_{COURSE}_COURSE env vars.
 * Defaults to true when the env var is unset (all courses enabled unless explicitly disabled).
 * Set VITE_ENABLE_CPA_COURSE=false in your .env to disable a course.
 */
const envFlag = (key: string): boolean => {
  const val = import.meta.env[key];
  // Unset or empty → true (enabled by default). Only explicit "false" disables.
  if (val === undefined || val === '') return true;
  return val !== 'false';
};

export const ENABLE_CPA_COURSE = envFlag('VITE_ENABLE_CPA_COURSE');
export const ENABLE_EA_COURSE = envFlag('VITE_ENABLE_EA_COURSE');
export const ENABLE_CMA_COURSE = envFlag('VITE_ENABLE_CMA_COURSE');
export const ENABLE_CIA_COURSE = envFlag('VITE_ENABLE_CIA_COURSE');
export const ENABLE_CFP_COURSE = envFlag('VITE_ENABLE_CFP_COURSE');
export const ENABLE_CISA_COURSE = envFlag('VITE_ENABLE_CISA_COURSE');

/**
 * Map from CourseId → enabled flag for programmatic lookup
 */
const COURSE_FLAGS: Record<string, boolean> = {
  cpa: ENABLE_CPA_COURSE,
  ea: ENABLE_EA_COURSE,
  cma: ENABLE_CMA_COURSE,
  cia: ENABLE_CIA_COURSE,
  cfp: ENABLE_CFP_COURSE,
  cisa: ENABLE_CISA_COURSE,
};

/**
 * Check if a specific course is enabled by its CourseId
 */
export const isCourseEnabled = (courseId: string): boolean =>
  COURSE_FLAGS[courseId] ?? false;

// Log status on startup for verification
if (import.meta.env.DEV) {
  console.log('[FeatureFlags] Course flags:', COURSE_FLAGS);
}

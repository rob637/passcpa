export const FEATURES = {
  aiTutor: true, // Vory - AI Study Companion - add VITE_GEMINI_API_KEY for full AI
  examSimulator: true,
  flashcards: true,
  tbs: true, // Task-Based Simulations
  writtenCommunication: false, // WC was removed when BEC retired Dec 2023
  adminTools: true,
  blueprint2026Preview: true, // Allow users to toggle 2026 content preview
  offlineMode: true,
  gamification: true, // Streaks, points
  community: false, // Community leaderboard - enable when user base is larger
  fastTrackOnboarding: true, // Abbreviated onboarding: skips Welcome + Daily Goal steps (uses 50 pts/day default)
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
 *
 * This is fully dynamic — adding a new CourseId requires ZERO changes here.
 */
const envFlag = (key: string): boolean => {
  const val = import.meta.env[key];
  // Unset or empty → true (enabled by default). Only explicit "false" disables.
  if (val === undefined || val === '') return true;
  return val !== 'false';
};

/**
 * Check if a specific course is enabled by its CourseId.
 * Derives the env var name automatically: 'cpa' → VITE_ENABLE_CPA_COURSE.
 * No manual entries needed when adding new courses.
 */
export const isCourseEnabled = (courseId: string): boolean =>
  envFlag(`VITE_ENABLE_${courseId.toUpperCase()}_COURSE`);

// Legacy individual exports — used in App.tsx route guards.
// Derived from isCourseEnabled; no manual record to maintain.
export const ENABLE_CPA_COURSE = isCourseEnabled('cpa');
export const ENABLE_EA_COURSE = isCourseEnabled('ea');
export const ENABLE_CMA_COURSE = isCourseEnabled('cma');
export const ENABLE_CIA_COURSE = isCourseEnabled('cia');
export const ENABLE_CFP_COURSE = isCourseEnabled('cfp');
export const ENABLE_CISA_COURSE = isCourseEnabled('cisa');

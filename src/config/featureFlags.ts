export const FEATURES = {
  aiTutor: true, // Vory - AI Study Companion - add VITE_GEMINI_API_KEY for full AI
  examSimulator: true,
  flashcards: true,
  tbs: true, // Task-Based Simulations
  writtenCommunication: true, // Required for BEC section
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
 * Controlled via environment variables for safe deployment
 */
export const ENABLE_EA_COURSE = import.meta.env.VITE_ENABLE_EA_COURSE === 'true' || import.meta.env.DEV;
export const ENABLE_CMA_COURSE = import.meta.env.VITE_ENABLE_CMA_COURSE === 'true';

// Log status on startup for verification
if (import.meta.env.DEV) {
  console.log('[FeatureFlags] EA Course Enabled:', ENABLE_EA_COURSE);
}

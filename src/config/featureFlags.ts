export const FEATURES = {
  aiTutor: true, // Enabled with smart fallback responses - add VITE_GEMINI_API_KEY for full AI
  examSimulator: true,
  flashcards: true,
  tbs: true, // Task-Based Simulations
  writtenCommunication: false, // Removed in 2024 Evolution, retained for legacy
  adminTools: true,
  blueprint2026Preview: true, // Allow users to toggle 2026 content preview
  offlineMode: true,
  gamification: true, // Streaks, points
};

export const isFeatureEnabled = (feature: keyof typeof FEATURES) => FEATURES[feature];

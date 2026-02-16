/**
 * Admin configuration — single source of truth for admin email whitelist.
 *
 * Used by:
 *  - AuthProvider (auto-sync isAdmin flag to Firestore on login)
 *  - AdminCMS, TBSEditor, LessonEditor, WCEditor, QuestionEditor (access guards)
 *  - App.tsx (route-level admin guard)
 *
 * Important: Firestore security rules have their OWN admin check
 * (`users/{uid}.isAdmin == true`). The AuthProvider auto-sync ensures
 * that any email listed here gets `isAdmin: true` written to their
 * Firestore user document on login, so the rules work correctly.
 */
export const ADMIN_EMAILS: string[] = [
  'admin@voraprep.com',
  'rob@sagecg.com',
  'rob@voraprep.com',
];

/**
 * Check if an email is in the admin whitelist.
 */
export const isAdminEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
};

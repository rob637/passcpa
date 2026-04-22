/**
 * useDailyCpaVisible — Determines whether Daily CPA promo UI should be visible.
 *
 * Daily CPA is gated until Telnyx SMS is live. This hook controls visibility of
 * the announcement bar, navigation links, hero promo cards, and footer links
 * that link to /daily-cpa. Mirrors the route gate in DailyCpaPreviewGate.
 *
 * Visible when:
 *   - User is signed in as an admin
 *   - localStorage.daily_cpa_preview === '1' (set by ?preview=1 URL param)
 */
import { useAuth } from './useAuth';
import { isAdminEmail } from '../config/adminConfig';

export function useDailyCpaVisible(): boolean {
  const { user, userProfile } = useAuth();

  const previewFlag = (() => {
    try { return localStorage.getItem('daily_cpa_preview') === '1'; } catch { return false; }
  })();

  const isAdmin = !!user && (userProfile?.isAdmin || isAdminEmail(user.email || ''));

  return previewFlag || isAdmin;
}

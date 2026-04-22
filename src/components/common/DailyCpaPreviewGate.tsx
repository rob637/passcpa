import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isAdminEmail } from '../../config/adminConfig';

/**
 * Gate the Daily CPA pages while the SMS backend (Telnyx) isn't live yet.
 *
 * Allows access if any of:
 *   - URL contains ?preview=1 (also persists to localStorage for follow-up nav)
 *   - localStorage.daily_cpa_preview === '1'
 *   - User is signed in as an admin
 *
 * Otherwise redirects to /home (or / if signed out).
 */
export const DailyCpaPreviewGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();

  // Check & persist preview flag
  const params = new URLSearchParams(location.search);
  if (params.get('preview') === '1') {
    try { localStorage.setItem('daily_cpa_preview', '1'); } catch { /* ignore */ }
  }

  if (loading) return null;

  const previewFlag = (() => {
    try { return localStorage.getItem('daily_cpa_preview') === '1'; } catch { return false; }
  })();
  const isAdmin = !!user && (userProfile?.isAdmin || isAdminEmail(user.email || ''));

  if (previewFlag || isAdmin) {
    return <>{children}</>;
  }

  return <Navigate to={user ? '/home' : '/'} replace />;
};

export default DailyCpaPreviewGate;

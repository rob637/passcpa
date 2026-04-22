/**
 * SubscriptionGate - Gates premium content behind subscription/trial
 * 
 * Shows content to users with:
 * - Active paid subscription
 * - Active trial (14 days)
 * 
 * Shows upgrade prompt when trial expires.
 * 
 * Analytics tracked:
 * - subscription_gate_loading_slow: User waiting >3s for subscription check
 * - subscription_gate_shown: User sees paywall (no access)
 * - subscription_gate_trial_started: User started trial from gate
 * - subscription_gate_passed: User has access, content shown
 */

import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSubscription, isFounderPricingActive, EXAM_PRICING } from '../../services/subscription';
import { useCourse } from '../../providers/CourseProvider';
import { useAuth } from '../../hooks/useAuth';
import { trackEvent } from '../../services/analytics';
import { Lock, Clock, Sparkles, ArrowRight, X, Loader2 } from 'lucide-react';
import logger from '../../utils/logger';

interface SubscriptionGateProps {
  children: React.ReactNode;
  /** Custom message when gated */
  message?: string;
  /** Show inline banner instead of full overlay */
  inline?: boolean;
}

export function SubscriptionGate({ 
  children, 
  message,
  inline = false,
}: SubscriptionGateProps) {
  const { hasFullAccess, trialDaysRemaining, trialExpired, loading, getExamAccess, startExamTrial, refreshSubscription } = useSubscription();
  const { courseId, course } = useCourse();
  const { user } = useAuth();
  const location = useLocation();
  const [startingTrial, setStartingTrial] = React.useState(false);
  const [loadingTooLong, setLoadingTooLong] = React.useState(false);
  
  // Track if we've already logged analytics for this render cycle
  const hasTrackedRef = useRef<string | null>(null);
  const loadingStartRef = useRef<number>(Date.now());
  
  // Check if user can start a trial (safety net for users who slipped through signup)
  const examAccess = getExamAccess(courseId);
  const canStartTrial = examAccess.canStartTrial && !trialExpired;
  
  // Track loading duration and show retry after 3 seconds
  useEffect(() => {
    if (loading) {
      loadingStartRef.current = Date.now();
      const timeout = setTimeout(() => {
        setLoadingTooLong(true);
        trackEvent('subscription_gate_loading_slow', {
          page: location.pathname,
          courseId,
          userId: user?.uid,
          loadingMs: Date.now() - loadingStartRef.current,
        });
        logger.warn('[SubscriptionGate] Loading taking too long', { page: location.pathname });
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      setLoadingTooLong(false);
    }
  }, [loading, location.pathname, courseId, user?.uid]);
  
  // Track when gate is shown vs passed
  useEffect(() => {
    if (loading) return;
    
    const trackKey = `${location.pathname}-${hasFullAccess}-${courseId}`;
    if (hasTrackedRef.current === trackKey) return;
    hasTrackedRef.current = trackKey;
    
    if (hasFullAccess) {
      trackEvent('subscription_gate_passed', {
        page: location.pathname,
        courseId,
        trialDaysRemaining,
        loadingMs: Date.now() - loadingStartRef.current,
      });
    } else {
      // User is seeing the paywall - this is critical to track!
      trackEvent('subscription_gate_shown', {
        page: location.pathname,
        courseId,
        trialExpired,
        canStartTrial,
        userId: user?.uid,
        loadingMs: Date.now() - loadingStartRef.current,
      });
      logger.info('[SubscriptionGate] Paywall shown', { 
        page: location.pathname, 
        courseId, 
        trialExpired, 
        canStartTrial,
        userId: user?.uid,
      });
    }
  }, [loading, hasFullAccess, location.pathname, courseId, trialExpired, canStartTrial, trialDaysRemaining, user?.uid]);
  
  const handleStartTrial = async () => {
    setStartingTrial(true);
    trackEvent('subscription_gate_trial_click', {
      page: location.pathname,
      courseId,
    });
    try {
      const success = await startExamTrial(courseId);
      if (success) {
        trackEvent('subscription_gate_trial_started', {
          page: location.pathname,
          courseId,
        });
        // Trial started - the hook will re-render with hasFullAccess = true
        window.location.reload(); // Force reload to ensure clean state
      } else {
        trackEvent('subscription_gate_trial_failed', {
          page: location.pathname,
          courseId,
          reason: 'startExamTrial returned false',
        });
      }
    } catch (error) {
      logger.error('Failed to start trial:', error);
      trackEvent('subscription_gate_trial_error', {
        page: location.pathname,
        courseId,
        error: String(error),
      });
    } finally {
      setStartingTrial(false);
    }
  };
  
  const handleRetryLoading = () => {
    trackEvent('subscription_gate_retry_click', {
      page: location.pathname,
      courseId,
    });
    refreshSubscription();
    setLoadingTooLong(false);
    loadingStartRef.current = Date.now();
  };

  // Show loading state with retry option if taking too long
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {loadingTooLong ? 'Still loading...' : 'Checking access...'}
        </p>
        {loadingTooLong && (
          <button
            onClick={handleRetryLoading}
            className="mt-4 px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  // User has access (paid or active trial for THIS exam) - show content
  if (hasFullAccess) {
    return <>{children}</>;
  }

  // Trial expired or not subscribed for THIS exam - show gate
  const courseName = course?.name || courseId.toUpperCase();
  const pricing = EXAM_PRICING[courseId as keyof typeof EXAM_PRICING] || EXAM_PRICING.cpa;
  const isFounder = isFounderPricingActive();
  
  const displayPrice = isFounder ? pricing.founderAnnual : pricing.annual;
  const originalPrice = pricing.annual;

  // Logged-in users go directly to checkout, others see landing page pricing
  const upgradeUrl = user 
    ? `/start-checkout?course=${courseId}&interval=annual`
    : `/${courseId}?scroll=pricing`;

  if (inline) {
    // Inline banner style
    return (
      <div className="relative">
        {/* Blurred content preview */}
        <div className="blur-sm pointer-events-none select-none opacity-50">
          {children}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg">
          <div className="text-center p-6 max-w-md">
            <Lock className="w-8 h-8 text-primary-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {trialExpired ? `Your ${courseName} trial has ended` : `${courseName} Subscription Required`}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {message || (canStartTrial 
                ? `Start your free 14-day trial to access ${courseName} content.`
                : `Subscribe to continue studying for the ${courseName} exam.`
              )}
            </p>
            {canStartTrial ? (
              <button
                onClick={handleStartTrial}
                disabled={startingTrial}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {startingTrial ? 'Starting...' : 'Start Free Trial'}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to={upgradeUrl}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {isFounder ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Subscribe for ${displayPrice}/yr
                  </>
                ) : (
                  <>
                    Subscribe Now
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Link>
            )}
            {isFounder && displayPrice < originalPrice && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                Founder pricing: Save ${originalPrice - displayPrice}/yr for 2 years!
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Full page overlay style
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          {trialExpired ? (
            <Clock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          ) : (
            <Lock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          {trialExpired 
            ? `Your ${courseName} Trial Has Ended`
            : canStartTrial
              ? `Start Your Free Trial`
              : `Subscribe to ${courseName}`
          }
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {message || (
            trialExpired
              ? `Your 14-day free trial of VoraPrep ${courseName} has ended. Subscribe now to continue your exam preparation.`
              : canStartTrial
                ? `Get 14 days of full access to ${courseName} exam prep — no credit card required.`
                : `Access to ${courseName} content requires an active subscription.`
          )}
        </p>

        {/* Show Start Trial button if eligible */}
        {canStartTrial && (
          <button
            onClick={handleStartTrial}
            disabled={startingTrial}
            className="block w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors mb-4 disabled:opacity-50"
          >
            {startingTrial ? 'Starting Trial...' : 'Start Free 14-Day Trial'}
          </button>
        )}

        {/* Show pricing/subscribe for non-trial-eligible users */}
        {!canStartTrial && (
          <>
            {isFounder && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-4 mb-6 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center justify-center gap-2 text-amber-800 dark:text-amber-300 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">Founding Member Pricing</span>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  Lock in your founder rate through April 2028. Subscribe before April 30, 2026.
                </p>
              </div>
            )}

            <div className="mb-6">
              <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                ${displayPrice}
                <span className="text-lg font-normal text-gray-500">/year</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Just ${isFounder ? pricing.founderMonthly : pricing.monthly}/month
              </div>
              {isFounder && displayPrice < originalPrice && (
                <div className="text-gray-500 line-through mt-1">${originalPrice}/year</div>
              )}
            </div>

            <Link
              to={upgradeUrl}
              className="block w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors mb-4"
            >
              Subscribe Now
            </Link>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              14-day free trial included • Cancel anytime • Pass Guarantee
            </p>
          </>
        )}

        {trialDaysRemaining > 0 && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-4">
            You still have {trialDaysRemaining} days left in your trial!
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * TrialBanner - Shows trial status banner (for dashboard header)
 * - Hidden during first 7 days of trial (let users explore freely)
 * - Shows last 7 days with subscribe link
 * - Dismissible for 24 hours (comes back daily)
 * - Always shows (not dismissible) when trial expired
 */
export function TrialBanner({ onVisibilityChange }: { onVisibilityChange?: (visible: boolean) => void } = {}) {
  const { isTrialing, trialDaysRemaining, trialExpired, isPremium, loading } = useSubscription();
  const { courseId, course } = useCourse();
  const [dismissed, setDismissed] = React.useState(false);
  
  // Check if banner was recently dismissed (24-hour cooldown)
  React.useEffect(() => {
    const dismissedAt = localStorage.getItem(`trial_banner_dismissed_${courseId}`);
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      if (elapsed < 24 * 60 * 60 * 1000) {
        setDismissed(true);
      } else {
        localStorage.removeItem(`trial_banner_dismissed_${courseId}`);
      }
    }
  }, [courseId]);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(`trial_banner_dismissed_${courseId}`, Date.now().toString());
  };
  
  // Determine visibility
  // Show throughout the entire trial (day 1 onward) so new users always know
  // they're on a trial. Tone changes by remaining days (handled below).
  const isVisible = !loading && !isPremium && (
    trialExpired || (isTrialing && trialDaysRemaining > 0 && !dismissed)
  );

  // Notify parent of visibility changes
  React.useEffect(() => {
    onVisibilityChange?.(isVisible);
  }, [isVisible, onVisibilityChange]);

  // Hide if user has paid access to current course
  if (loading || isPremium) return null;

  const courseName = course?.name || courseId.toUpperCase();
  const annualUrl = `/start-checkout?course=${courseId}&interval=annual`;
  const monthlyUrl = `/start-checkout?course=${courseId}&interval=monthly`;

  // Show price in CTA for stronger conversion signal
  const exam = EXAM_PRICING[courseId as keyof typeof EXAM_PRICING];
  const founderActive = isFounderPricingActive();
  const annualPrice = exam ? (founderActive ? exam.founderAnnual : exam.annual) : undefined;

  if (trialExpired) {
    // Always show expired banner (not dismissible)
    return (
      <div className="bg-red-600 text-white py-2 px-4 fixed top-0 left-0 right-0 z-[60]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium text-sm">Your {courseName} trial has ended.</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={annualUrl}
              className="text-sm bg-white text-red-600 px-3 py-1 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Annual
            </Link>
            <Link
              to={monthlyUrl}
              className="text-sm bg-red-700 text-white px-3 py-1 rounded-full font-medium hover:bg-red-800 transition-colors"
            >
              Monthly
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show throughout the trial; tone scales with urgency.
  if (isTrialing && trialDaysRemaining > 0 && !dismissed) {
    const isUrgent = trialDaysRemaining <= 3;
    const isReminder = trialDaysRemaining <= 10 && !isUrgent; // 4–10 days
    // 11+ days = friendly welcome tone
    const bgClass = isUrgent
      ? 'bg-amber-500'
      : isReminder
        ? 'bg-blue-600'
        : 'bg-emerald-600';
    const ctaTextClass = isUrgent
      ? 'text-amber-600'
      : isReminder
        ? 'text-blue-600'
        : 'text-emerald-700';
    const monthlyBgClass = isUrgent
      ? 'bg-amber-600'
      : isReminder
        ? 'bg-blue-700'
        : 'bg-emerald-700';

    let message: string;
    if (trialDaysRemaining === 1) {
      message = 'Last day of your trial!';
    } else if (isUrgent) {
      message = `Only ${trialDaysRemaining} days left in your free trial`;
    } else if (isReminder) {
      message = `${trialDaysRemaining} days left in your free trial`;
    } else {
      message = `Free trial active — ${trialDaysRemaining} days of full access`;
    }

    const annualLabel = annualPrice ? `Get Annual — $${annualPrice}/yr` : 'Annual';
    return (
      <div className={`${bgClass} text-white py-2 px-4 fixed top-0 left-0 right-0 z-[60]`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium text-sm">{message}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={annualUrl}
              className={`text-sm bg-white ${ctaTextClass} px-3 py-1 rounded-full font-medium hover:bg-gray-100 transition-colors whitespace-nowrap`}
            >
              {annualLabel}
            </Link>
            <Link
              to={monthlyUrl}
              className={`hidden sm:inline-flex text-sm ${monthlyBgClass} text-white px-3 py-1 rounded-full font-medium hover:opacity-90 transition-colors`}
            >
              Monthly
            </Link>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default SubscriptionGate;

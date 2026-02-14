/**
 * SubscriptionGate - Gates premium content behind subscription/trial
 * 
 * Shows content to users with:
 * - Active paid subscription
 * - Active trial (14 days)
 * 
 * Shows upgrade prompt when trial expires.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSubscription, isFounderPricingActive, EXAM_PRICING } from '../../services/subscription';
import { useCourse } from '../../providers/CourseProvider';
import { useAuth } from '../../hooks/useAuth';
import { Lock, Clock, Sparkles, ArrowRight, X } from 'lucide-react';

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
  const { hasFullAccess, trialDaysRemaining, trialExpired, loading } = useSubscription();
  const { courseId, course } = useCourse();
  const { user } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg h-48" />
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
              {message || `Subscribe to continue studying for the ${courseName} exam.`}
            </p>
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
            : `Subscribe to ${courseName}`
          }
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {message || (
            trialExpired
              ? `Your 14-day free trial of VoraPrep ${courseName} has ended. Subscribe now to continue your exam preparation.`
              : `Access to ${courseName} content requires an active subscription.`
          )}
        </p>

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
            Just ${Math.round(displayPrice / 12)}/month
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
export function TrialBanner() {
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
  
  // Hide if user has paid access to current course
  if (loading || isPremium) return null;
  
  const courseName = course?.name || courseId.toUpperCase();
  const upgradeUrl = `/start-checkout?course=${courseId}&interval=annual`;

  if (trialExpired) {
    // Always show expired banner (not dismissible)
    return (
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Your {courseName} trial has ended.</span>
          </div>
          <Link 
            to={upgradeUrl}
            className="text-sm bg-white text-red-600 px-3 py-1 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    );
  }

  // Only show during last 7 days of trial, and respect dismissal
  if (isTrialing && trialDaysRemaining <= 7 && !dismissed) {
    const isUrgent = trialDaysRemaining <= 3;
    return (
      <div className={`${isUrgent ? 'bg-amber-500' : 'bg-blue-600'} text-white py-2 px-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium text-sm">
              {trialDaysRemaining === 1 
                ? 'Last day of your trial!' 
                : `${trialDaysRemaining} days left in your free trial`
              }
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link 
              to={upgradeUrl}
              className={`text-sm bg-white ${isUrgent ? 'text-amber-600' : 'text-blue-600'} px-3 py-1 rounded-full font-medium hover:bg-gray-100 transition-colors`}
            >
              Subscribe Now
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

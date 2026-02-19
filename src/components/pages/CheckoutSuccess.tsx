/**
 * Checkout Success Page
 * Shown after successful Stripe checkout
 */

import { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, BookOpen, Trophy } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { isFounderPricingActive, useSubscription, syncSubscriptionFromStripe } from '../../services/subscription';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../hooks/useCourse';
import { analytics } from '../../services/analytics';

const CheckoutSuccess = () => {
  useDocumentTitle('Welcome to VoraPrep!');
  const [confetti, setConfetti] = useState(true);
  const [searchParams] = useSearchParams();
  // Show founder badge if the checkout happened during the founder window
  const isFounder = searchParams.get('founder') === 'true' || isFounderPricingActive();
  const conversionTracked = useRef(false);

  // Get user and course for conversion tracking
  const { user } = useAuth();
  const { courseId } = useCourse();

  // Force a subscription refresh so the realtime listener picks up the Stripe webhook update
  const { refreshSubscription, subscription } = useSubscription();
  useEffect(() => {
    // Webhook may take a moment — poll a couple of times
    const t1 = setTimeout(refreshSubscription, 2000);
    const t2 = setTimeout(refreshSubscription, 5000);

    // Fallback: call syncSubscriptionFromStripe to force-sync
    // in case the webhook failed or was delayed
    const t3 = setTimeout(async () => {
      const synced = await syncSubscriptionFromStripe();
      if (synced) refreshSubscription();
    }, 4000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track purchase conversion for Google Ads (once)
  useEffect(() => {
    if (user && subscription?.status === 'active' && !conversionTracked.current) {
      conversionTracked.current = true;
      // Estimate value based on plan type (monthly vs annual)
      const isAnnual = subscription.currentPeriodEnd && 
        (new Date(subscription.currentPeriodEnd).getTime() - Date.now()) > 60 * 24 * 60 * 60 * 1000; // >60 days
      const estimatedValue = isAnnual ? 199 : 29; // Conservative average pricing
      analytics.trackPurchaseConversion(
        user.uid,
        courseId || 'cpa',
        estimatedValue,
        isAnnual ? 'annual' : 'monthly'
      );
    }
  }, [user, subscription, courseId]);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-slate-900 dark:to-emerald-950 flex items-center justify-center px-4 py-12">
      {/* Confetti Animation */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)],
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-lg w-full">
        {/* Success Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-full animate-ping opacity-25" />
            <div className="relative w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome to VoraPrep! 🎉
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Your subscription is now active. You have full access to all features and content.
          </p>

          {/* What's Next */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              What's next?
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">1</div>
                <span className="text-slate-700 dark:text-slate-300">Complete your study plan setup to get personalized recommendations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">2</div>
                <span className="text-slate-700 dark:text-slate-300">Start with the lessons to build your foundation</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">3</div>
                <span className="text-slate-700 dark:text-slate-300">Practice daily - Vory AI is here 24/7 to help</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dashboard"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/lessons"
              className="flex-1 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-6 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Start Learning
            </Link>
          </div>

          {/* Founder Badge — only shown for founder-window subscribers */}
          {isFounder && (
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 px-4 py-2 rounded-full">
              <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                Founding Member — rate guaranteed through April 2028
              </span>
            </div>
          </div>
          )}
        </div>

        {/* Support Note */}
        <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-6">
          Questions? Email us at{' '}
          <a href="mailto:support@voraprep.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">
            support@voraprep.com
          </a>
        </p>
      </div>

      {/* Confetti CSS */}
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CheckoutSuccess;

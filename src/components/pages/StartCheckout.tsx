/**
 * StartCheckout Page
 * Initiates Stripe checkout after user is authenticated
 * Typically reached after registration → onboarding → pending checkout
 */

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import logger from '../../utils/logger';

type CourseId = 'cpa' | 'ea' | 'cma' | 'cia' | 'cfp' | 'cisa';
type PricingInterval = 'annual' | 'monthly';

interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

const StartCheckout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const courseId = searchParams.get('course') as CourseId;
  const interval = searchParams.get('interval') as PricingInterval;

  useEffect(() => {
    const initCheckout = async () => {
      // Wait for auth to load
      if (authLoading) return;

      // If not logged in, redirect to register
      if (!user) {
        navigate(`/register?course=${courseId}&redirect=checkout&interval=${interval}`);
        return;
      }

      // Validate params
      if (!courseId || !interval) {
        setError('Missing checkout parameters. Please try again from the pricing page.');
        return;
      }

      const validCourses: CourseId[] = ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'];
      const validIntervals: PricingInterval[] = ['annual', 'monthly'];

      if (!validCourses.includes(courseId) || !validIntervals.includes(interval)) {
        setError('Invalid checkout parameters. Please try again from the pricing page.');
        return;
      }

      try {
        const createCheckoutSession = httpsCallable<
          { courseId: string; interval: string; origin: string },
          CheckoutSessionResponse
        >(functions, 'createCheckoutSession');

        const result = await createCheckoutSession({
          courseId,
          interval,
          origin: window.location.origin,
        });

        // Redirect to Stripe Checkout
        if (result.data.url) {
          window.location.href = result.data.url;
        } else {
          throw new Error('No checkout URL returned');
        }
      } catch (err) {
        logger.error('Checkout error:', err);
        const message = err instanceof Error ? err.message : 'Failed to start checkout';
        setError(message);
      }
    };

    initCheckout();
  }, [user, authLoading, courseId, interval, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Checkout Error
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {error}
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Preparing Your Checkout
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Redirecting you to secure payment...
        </p>
      </div>
    </div>
  );
};

export default StartCheckout;

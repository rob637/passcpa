/**
 * useCheckout - Hook for Stripe checkout integration
 * Calls Firebase Cloud Function to create checkout session
 */

import { useState, useCallback } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import logger from '../utils/logger';

export type CourseId = 'cpa' | 'ea' | 'cma' | 'cia' | 'cfp' | 'cisa';
export type PricingInterval = 'annual' | 'monthly';

interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

interface UseCheckoutReturn {
  startCheckout: (courseId: CourseId, interval: PricingInterval) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useCheckout(): UseCheckoutReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const startCheckout = useCallback(async (courseId: CourseId, interval: PricingInterval) => {
    // Must be logged in
    if (!user) {
      // Redirect to register with return URL
      navigate(`/register?course=${courseId}&redirect=checkout&interval=${interval}`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const createCheckoutSession = httpsCallable<
        { courseId: string; interval: string },
        CheckoutSessionResponse
      >(functions, 'createCheckoutSession');

      const result = await createCheckoutSession({
        courseId,
        interval,
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
      setIsLoading(false);
    }
  }, [user, navigate]);

  return {
    startCheckout,
    isLoading,
    error,
  };
}

// Helper to check if we're in founder pricing window
export function isFounderPricingActive(): boolean {
  const FOUNDER_DEADLINE = new Date('2026-08-31T23:59:59Z');
  return new Date() < FOUNDER_DEADLINE;
}

// Days remaining in founder pricing
export function founderDaysRemaining(): number {
  const FOUNDER_DEADLINE = new Date('2026-08-31T23:59:59Z');
  const now = new Date();
  const diff = FOUNDER_DEADLINE.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

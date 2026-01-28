/**
 * VoraPrep Subscription Service
 * 
 * Manages user subscriptions, plan limits, and premium features.
 * Designed to work with Stripe (when configured) or in freemium mode.
 */

import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase.js';

// ============================================================================
// Types
// ============================================================================

export type SubscriptionTier = 'free' | 'monthly' | 'quarterly' | 'annual' | 'lifetime';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'expired';

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  price: number;
  priceId?: string; // Stripe price ID
  interval: 'month' | 'quarter' | 'year' | 'once' | null;
  features: string[];
  limits: PlanLimits;
}

export interface PlanLimits {
  questionsPerDay: number;
  aiTutorMessages: number;
  examSections: number | 'unlimited';
  tbsAccess: boolean;
  offlineMode: boolean;
  progressAnalytics: boolean;
  studyPlans: boolean;
}

export interface UserSubscription {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  trialEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Plan Definitions
// ============================================================================

// ==========================================================================
// PRICING STRATEGY: Option C "Hybrid Launch"
// Phase 1 (Now-Q2 2026): 100% free, all features unlocked (Beta)
// Phase 2 (Q3 2026): Free w/ limits + $99/yr Pro + $199 Lifetime
// Phase 3 (Q1 2027+): Tighter limits + $149/yr Pro + $349 Lifetime
// ==========================================================================

// Current Phase: BETA (all features free)
const IS_BETA = true; // Set to false when launching paid tiers

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  free: {
    tier: 'free',
    name: 'Free',
    price: 0,
    interval: null,
    features: IS_BETA ? [
      '✨ BETA: All features unlocked!',
      'Unlimited questions',
      'All 6 exam sections',
      'AI tutor included',
      'TBS simulations',
      'Progress tracking',
    ] : [
      '50 questions per day',
      'All 6 exam sections',
      '5 AI tutor messages/day',
      '1 TBS simulation/day',
      'Progress tracking',
    ],
    limits: IS_BETA ? {
      questionsPerDay: Infinity,
      aiTutorMessages: Infinity,
      examSections: 'unlimited',
      tbsAccess: true,
      offlineMode: true,
      progressAnalytics: true,
      studyPlans: true,
    } : {
      questionsPerDay: 50,
      aiTutorMessages: 5,
      examSections: 'unlimited', // All sections free!
      tbsAccess: true, // 1/day enforced in UI
      offlineMode: false,
      progressAnalytics: false,
      studyPlans: false,
    },
  },
  monthly: {
    tier: 'monthly',
    name: 'Pro Monthly',
    price: 12.99,
    interval: 'month',
    features: [
      'Unlimited questions',
      'Unlimited AI tutor',
      'Unlimited TBS practice',
      'Offline mode',
      'Advanced analytics',
      'Personalized study plans',
    ],
    limits: {
      questionsPerDay: Infinity,
      aiTutorMessages: Infinity,
      examSections: 'unlimited',
      tbsAccess: true,
      offlineMode: true,
      progressAnalytics: true,
      studyPlans: true,
    },
  },
  quarterly: {
    tier: 'quarterly',
    name: 'Pro Quarterly',
    price: 29.99,
    interval: 'quarter',
    features: [
      'Everything in Pro Monthly',
      'Save 23%',
      'Priority support',
    ],
    limits: {
      questionsPerDay: Infinity,
      aiTutorMessages: Infinity,
      examSections: 'unlimited',
      tbsAccess: true,
      offlineMode: true,
      progressAnalytics: true,
      studyPlans: true,
    },
  },
  annual: {
    tier: 'annual',
    name: 'Pro Annual',
    price: 99,
    interval: 'year',
    features: [
      'Everything in Pro Monthly',
      'Save 36% ($8.25/mo)',
      'Priority support',
      'Pass guarantee',
    ],
    limits: {
      questionsPerDay: Infinity,
      aiTutorMessages: Infinity,
      examSections: 'unlimited',
      tbsAccess: true,
      offlineMode: true,
      progressAnalytics: true,
      studyPlans: true,
    },
  },
  lifetime: {
    tier: 'lifetime',
    name: 'Founding Member',
    price: 199,
    interval: 'once',
    features: [
      'Pro forever',
      'One-time payment',
      'Lifetime updates',
      'Future exam prep included',
      'Founding Member badge',
      'Vote on new features',
    ],
    limits: {
      questionsPerDay: Infinity,
      aiTutorMessages: Infinity,
      examSections: 'unlimited',
      tbsAccess: true,
      offlineMode: true,
      progressAnalytics: true,
      studyPlans: true,
    },
  },
};

// Export beta flag for UI
export const IS_BETA_PERIOD = IS_BETA;

// ============================================================================
// Subscription Service
// ============================================================================

class SubscriptionService {
  /**
   * Get user's subscription from Firestore
   */
  async getUserSubscription(userId: string): Promise<UserSubscription | null> {
    try {
      const subDoc = await getDoc(doc(db, 'subscriptions', userId));
      if (subDoc.exists()) {
        const data = subDoc.data();
        return {
          ...data,
          currentPeriodStart: data.currentPeriodStart?.toDate(),
          currentPeriodEnd: data.currentPeriodEnd?.toDate(),
          trialEnd: data.trialEnd?.toDate(),
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        } as UserSubscription;
      }
      return null;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }
  }

  /**
   * Create default free subscription for new users
   */
  async createFreeSubscription(userId: string): Promise<UserSubscription> {
    const subscription: UserSubscription = {
      tier: 'free',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, 'subscriptions', userId), {
      ...subscription,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return subscription;
  }

  /**
   * Get user's current plan limits
   */
  async getPlanLimits(userId: string): Promise<PlanLimits> {
    const subscription = await this.getUserSubscription(userId);
    const tier = subscription?.tier || 'free';
    
    // Check if subscription is still valid
    if (subscription?.status !== 'active' && subscription?.status !== 'trialing') {
      return SUBSCRIPTION_PLANS.free.limits;
    }

    return SUBSCRIPTION_PLANS[tier].limits;
  }

  /**
   * Check if user has access to a feature
   */
  async hasFeatureAccess(userId: string, feature: keyof PlanLimits): Promise<boolean> {
    const limits = await this.getPlanLimits(userId);
    const value = limits[feature];
    
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'number') {
      return value > 0;
    }
    return value === 'unlimited';
  }

  /**
   * Check if user can perform an action based on daily limits
   */
  async canPerformAction(
    userId: string,
    action: 'question' | 'aiMessage',
    currentCount: number
  ): Promise<{ allowed: boolean; limit: number; remaining: number }> {
    const limits = await this.getPlanLimits(userId);
    
    const limitKey = action === 'question' ? 'questionsPerDay' : 'aiTutorMessages';
    const limit = limits[limitKey];
    
    if (limit === Infinity) {
      return { allowed: true, limit: Infinity, remaining: Infinity };
    }
    
    const remaining = Math.max(0, limit - currentCount);
    return {
      allowed: currentCount < limit,
      limit,
      remaining,
    };
  }

  /**
   * Get the plan details for a tier
   */
  getPlan(tier: SubscriptionTier): SubscriptionPlan {
    return SUBSCRIPTION_PLANS[tier];
  }

  /**
   * Get all available plans
   */
  getAllPlans(): SubscriptionPlan[] {
    return Object.values(SUBSCRIPTION_PLANS);
  }

  /**
   * Check if user is on a paid plan
   */
  async isPremium(userId: string): Promise<boolean> {
    const subscription = await this.getUserSubscription(userId);
    if (!subscription) return false;
    
    return (
      subscription.tier !== 'free' &&
      (subscription.status === 'active' || subscription.status === 'trialing')
    );
  }

  /**
   * Start a trial period for a user
   */
  async startTrial(userId: string, tier: SubscriptionTier, durationDays: number = 7): Promise<void> {
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + durationDays);

    await updateDoc(doc(db, 'subscriptions', userId), {
      tier,
      status: 'trialing',
      trialEnd,
      updatedAt: serverTimestamp(),
    });
  }

  /**
   * End trial and revert to free (called by Cloud Function on trial expiry)
   */
  async endTrial(userId: string): Promise<void> {
    await updateDoc(doc(db, 'subscriptions', userId), {
      tier: 'free',
      status: 'active',
      trialEnd: null,
      updatedAt: serverTimestamp(),
    });
  }

  /**
   * Update subscription from Stripe webhook
   * (Called by Cloud Function when receiving Stripe events)
   */
  async syncFromStripe(
    userId: string,
    stripeData: {
      customerId: string;
      subscriptionId: string;
      status: string;
      priceId: string;
      currentPeriodStart: number;
      currentPeriodEnd: number;
      cancelAtPeriodEnd: boolean;
    }
  ): Promise<void> {
    // Map Stripe price ID to our tier
    const tier = this.getTierFromPriceId(stripeData.priceId);
    
    await updateDoc(doc(db, 'subscriptions', userId), {
      tier,
      status: stripeData.status as SubscriptionStatus,
      stripeCustomerId: stripeData.customerId,
      stripeSubscriptionId: stripeData.subscriptionId,
      currentPeriodStart: new Date(stripeData.currentPeriodStart * 1000),
      currentPeriodEnd: new Date(stripeData.currentPeriodEnd * 1000),
      cancelAtPeriodEnd: stripeData.cancelAtPeriodEnd,
      updatedAt: serverTimestamp(),
    });
  }

  /**
   * Map Stripe price ID to subscription tier
   */
  private getTierFromPriceId(priceId: string): SubscriptionTier {
    // These would be set up in environment/config
    const priceMap: Record<string, SubscriptionTier> = {
      'price_monthly_xxx': 'monthly',
      'price_quarterly_xxx': 'quarterly',
      'price_annual_xxx': 'annual',
      'price_lifetime_xxx': 'lifetime',
    };
    return priceMap[priceId] || 'free';
  }
}

// Export singleton instance
export const subscriptionService = new SubscriptionService();

// ============================================================================
// React Hook for Subscription
// ============================================================================

import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [limits, setLimits] = useState<PlanLimits>(SUBSCRIPTION_PLANS.free.limits);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    async function fetchSubscription() {
      if (!user) {
        setSubscription(null);
        setLimits(SUBSCRIPTION_PLANS.free.limits);
        setIsPremium(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        let sub = await subscriptionService.getUserSubscription(user.uid);
        
        // Create free subscription if none exists
        if (!sub) {
          sub = await subscriptionService.createFreeSubscription(user.uid);
        }
        
        setSubscription(sub);
        setLimits(SUBSCRIPTION_PLANS[sub.tier].limits);
        setIsPremium(sub.tier !== 'free' && sub.status === 'active');
      } catch (error) {
        console.error('Error loading subscription:', error);
        setLimits(SUBSCRIPTION_PLANS.free.limits);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [user]);

  return {
    subscription,
    limits,
    isPremium,
    loading,
    plan: subscription ? SUBSCRIPTION_PLANS[subscription.tier] : SUBSCRIPTION_PLANS.free,
    checkFeature: (feature: keyof PlanLimits) => {
      const value = limits[feature];
      if (typeof value === 'boolean') return value;
      if (typeof value === 'number') return value > 0;
      return value === 'unlimited';
    },
  };
}

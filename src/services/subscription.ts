/**
 * VoraPrep Subscription Service
 * 
 * Manages user subscriptions, plan limits, and premium features.
 * Designed to work with Stripe (when configured) or in freemium mode.
 */

import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import logger from '../utils/logger';
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
  courseId?: string; // Which exam/course this subscription is for
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  trialEnd?: Date;
  isFounderPricing?: boolean; // Locked in founder pricing
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Plan Definitions
// ============================================================================

// ==========================================================================
// PRICING STRATEGY: Per-Exam Subscriptions with Founder Pricing
// Feb 19, 2026 Launch: 14-day free trial → Paid subscription
// Founder pricing (~40-44% off) locked for 2 years for users who subscribe by Aug 31, 2026
// 300 seats per exam at founder rates
// ==========================================================================

// Launch Date: Feb 19, 2026 - No longer beta, paid subscriptions active
const IS_BETA = false;

// Founder pricing deadline - August 31, 2026
const FOUNDER_DEADLINE = new Date('2026-08-31T23:59:59Z');

// Check if founder pricing is active
export const isFounderPricingActive = (): boolean => new Date() < FOUNDER_DEADLINE;

// Per-exam pricing — 3 price bands
// Band 1 (CPA): $49/mo, $449/yr — Founder: $249/yr (~$21/mo)
// Band 2 (CMA, CFP, CISA): $39/mo, $349/yr — Founder: $199/yr (~$17/mo)
// Band 3 (EA, CIA): $29/mo, $249/yr — Founder: $149/yr (~$12/mo)
// Founder: 300 seats per exam, 2-year rate lock, window closes Aug 31, 2026
export const EXAM_PRICING = {
  cpa: { annual: 449, monthly: 49, founderAnnual: 249, founderMonthly: 21 },
  ea: { annual: 249, monthly: 29, founderAnnual: 149, founderMonthly: 12 },
  cma: { annual: 349, monthly: 39, founderAnnual: 199, founderMonthly: 17 },
  cia: { annual: 249, monthly: 29, founderAnnual: 149, founderMonthly: 12 },
  cfp: { annual: 349, monthly: 39, founderAnnual: 199, founderMonthly: 17 },
  cisa: { annual: 349, monthly: 39, founderAnnual: 199, founderMonthly: 17 },
} as const;

// Founder seat limits per exam
export const FOUNDER_SEATS_PER_EXAM = 300;

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  free: {
    tier: 'free',
    name: 'Free Trial',
    price: 0,
    interval: null,
    features: [
      '14-day full access trial',
      'All practice questions',
      'Vory AI tutor included',
      'TBS simulations',
      'Progress tracking',
    ],
    limits: {
      // Trial users get full access for 14 days
      questionsPerDay: Infinity,
      aiTutorMessages: Infinity,
      examSections: 'unlimited',
      tbsAccess: true,
      offlineMode: true,
      progressAnalytics: true,
      studyPlans: true,
    },
  },
  monthly: {
    tier: 'monthly',
    name: 'Monthly',
    price: 49, // CPA base price, varies by exam — see EXAM_PRICING
    interval: 'month',
    features: [
      'Unlimited questions',
      'Unlimited Vory AI access',
      'Unlimited TBS practice',
      'Offline mode',
      'Advanced analytics',
      'Cancel anytime',
      'Pass Guarantee (after 3 months)',
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
    name: 'Quarterly',
    price: 0, // Legacy plan - no longer offered
    interval: 'quarter',
    features: [
      'Legacy plan - no longer available',
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
    name: 'Annual',
    price: 449, // CPA base price, varies by exam — see EXAM_PRICING
    interval: 'year',
    features: [
      'Everything in Monthly',
      'Best value — Save over 20%',
      'Priority support',
      'Pass Guarantee included',
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
    name: 'Lifetime Access',
    price: 0, // No longer offered
    interval: 'once',
    features: [
      'Legacy plan - no longer available',
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
      logger.error('Error fetching subscription:', error);
      return null;
    }
  }

  /**
   * Create default free subscription with 14-day trial for new users
   */
  async createFreeSubscription(userId: string, courseId?: string): Promise<UserSubscription> {
    const now = new Date();
    const trialEnd = new Date(now);
    trialEnd.setDate(trialEnd.getDate() + 14); // 14-day trial

    const subscription: UserSubscription = {
      tier: 'free',
      status: 'trialing',
      trialEnd,
      createdAt: now,
      updatedAt: now,
      courseId, // Track which exam they're studying for
    };

    await setDoc(doc(db, 'subscriptions', userId), {
      ...subscription,
      trialEnd,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return subscription;
  }

  /**
   * Check if user is in active trial period
   */
  async isInTrial(userId: string): Promise<boolean> {
    const subscription = await this.getUserSubscription(userId);
    if (!subscription) return false;
    
    if (subscription.status !== 'trialing') return false;
    if (!subscription.trialEnd) return false;
    
    return new Date() < subscription.trialEnd;
  }

  /**
   * Get days remaining in trial
   */
  async getTrialDaysRemaining(userId: string): Promise<number> {
    const subscription = await this.getUserSubscription(userId);
    if (!subscription?.trialEnd) return 0;
    
    const now = new Date();
    const diff = subscription.trialEnd.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
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
   * Map Stripe price ID or lookup key to subscription tier
   * Lookup keys follow pattern: {exam}_{interval}_{type}
   * e.g., cpa_annual_founder, ea_monthly_regular
   */
  private getTierFromPriceId(priceId: string): SubscriptionTier {
    // Check for interval in price ID or lookup key
    const lowerPrice = priceId.toLowerCase();
    
    if (lowerPrice.includes('annual') || lowerPrice.includes('yearly')) {
      return 'annual';
    }
    if (lowerPrice.includes('quarterly')) {
      return 'quarterly';
    }
    if (lowerPrice.includes('monthly')) {
      return 'monthly';
    }
    if (lowerPrice.includes('lifetime')) {
      return 'lifetime';
    }
    
    return 'free';
  }

  /**
   * Extract course ID from Stripe price lookup key
   * e.g., "cpa_annual_founder" -> "cpa"
   */
  getCourseFromPriceKey(lookupKey: string): string {
    const parts = lookupKey.toLowerCase().split('_');
    const validCourses = ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'];
    return validCourses.find(c => parts.includes(c)) || 'cpa';
  }
}

// Export singleton instance
export const subscriptionService = new SubscriptionService();

// ============================================================================
// React Hook for Subscription
// ============================================================================

import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useCourse } from '../providers/CourseProvider';

export function useSubscription() {
  const { user } = useAuth();
  const { courseId: activeCourseId } = useCourse();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [limits, setLimits] = useState<PlanLimits>(SUBSCRIPTION_PLANS.free.limits);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [isTrialing, setIsTrialing] = useState(false);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(0);
  const [trialExpired, setTrialExpired] = useState(false);

  useEffect(() => {
    async function fetchSubscription() {
      if (!user) {
        setSubscription(null);
        setLimits(SUBSCRIPTION_PLANS.free.limits);
        setIsPremium(false);
        setIsTrialing(false);
        setTrialDaysRemaining(0);
        setTrialExpired(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        let sub = await subscriptionService.getUserSubscription(user.uid);
        
        // Create free subscription with trial if none exists
        if (!sub) {
          sub = await subscriptionService.createFreeSubscription(user.uid);
        }
        
        setSubscription(sub);
        
        // Calculate trial status
        const now = new Date();
        const inTrial = sub.status === 'trialing' && sub.trialEnd && now < sub.trialEnd;
        const expired = sub.status === 'trialing' && sub.trialEnd && now >= sub.trialEnd;
        
        let daysRemaining = 0;
        if (sub.trialEnd && inTrial) {
          const diff = sub.trialEnd.getTime() - now.getTime();
          daysRemaining = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
        }
        
        setIsTrialing(inTrial || false);
        setTrialExpired(expired || false);
        setTrialDaysRemaining(daysRemaining);
        
        // User has access if paid OR in active trial
        const hasPaidAccess = sub.tier !== 'free' && sub.status === 'active';
        setIsPremium(hasPaidAccess);
        
        // During trial, give full access
        if (inTrial || hasPaidAccess) {
          setLimits(SUBSCRIPTION_PLANS[sub.tier === 'free' ? 'annual' : sub.tier].limits);
        } else {
          // Trial expired and not paid - restricted access
          setLimits(SUBSCRIPTION_PLANS.free.limits);
        }
      } catch (error) {
        logger.error('Error loading subscription:', error);
        setLimits(SUBSCRIPTION_PLANS.free.limits);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [user]);

  // User has full access if:
  // - In active trial (trial grants access to ALL courses for exploration)
  // - OR has paid subscription for the CURRENT active course
  const subscribedCourseId = subscription?.courseId;
  const paidForThisCourse = isPremium && (
    !subscribedCourseId || subscribedCourseId === activeCourseId
  );
  const hasFullAccess = paidForThisCourse || isTrialing;

  return {
    subscription,
    limits,
    isPremium,
    isTrialing,
    trialDaysRemaining,
    trialExpired,
    hasFullAccess,
    subscribedCourseId: subscribedCourseId || null,
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

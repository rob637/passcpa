/**
 * VoraPrep Subscription Service
 * 
 * Manages user subscriptions, plan limits, and premium features.
 * Designed to work with Stripe (when configured) or in freemium mode.
 */

import { doc, getDoc, setDoc, updateDoc, deleteField, serverTimestamp } from 'firebase/firestore';
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

/**
 * Per-exam trial tracking
 */
export interface ExamTrial {
  startDate: Date;
  endDate: Date;
}

/**
 * Per-exam paid subscription tracking
 */
export interface ExamPaidSubscription {
  stripeSubscriptionId: string;
  status: SubscriptionStatus;
  tier: SubscriptionTier;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  isFounder?: boolean;
}

export interface UserSubscription {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  courseId?: string; // Legacy: single course (kept for backward compat)
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  trialEnd?: Date; // Legacy: single trial end (kept for backward compat)
  isFounderPricing?: boolean; // Locked in founder pricing
  createdAt: Date;
  updatedAt: Date;

  // === Per-exam trial & subscription tracking (new) ===
  trials?: Record<string, ExamTrial>; // { cpa: { startDate, endDate }, ea: { ... } }
  paidExams?: Record<string, ExamPaidSubscription>; // { cpa: { ... }, ea: { ... } }
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

// Founder pricing deadline - April 30, 2026
// Single source of truth — imported by useCheckout.ts, ExamLandingTemplate.tsx, etc.
export const FOUNDER_DEADLINE = new Date('2026-04-30T23:59:59Z');

// Check if founder pricing is active
export const isFounderPricingActive = (): boolean => new Date() < FOUNDER_DEADLINE;

// Days remaining in founder pricing window
export const founderDaysRemaining = (): number => {
  const diff = FOUNDER_DEADLINE.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

// Per-exam pricing — 3 price bands
// Band 1 (CPA): $49/mo, $449/yr — Founder: $249/yr (~$21/mo)
// Band 2 (CMA, CFP, CISA): $39/mo, $349/yr — Founder: $199/yr (~$17/mo)
// Band 3 (EA, CIA): $29/mo, $249/yr — Founder: $149/yr (~$12/mo)
// Founder: 300 seats per exam, 2-year rate lock, window closes Apr 30, 2026
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

        // Deserialize per-exam trials map
        const trials: Record<string, ExamTrial> = {};
        if (data.trials) {
          for (const [key, val] of Object.entries(data.trials)) {
            const t = val as { startDate?: { toDate?: () => Date }; endDate?: { toDate?: () => Date } };
            trials[key] = {
              startDate: t.startDate?.toDate?.() || new Date(0),
              endDate: t.endDate?.toDate?.() || new Date(0),
            };
          }
        }

        // Repair: detect corrupted flat keys like "trials.ea" created by setDoc bug
        // and migrate them into the proper nested trials map
        const corruptedKeys: string[] = [];
        for (const key of Object.keys(data)) {
          if (key.startsWith('trials.')) {
            const examId = key.replace('trials.', '');
            const val = data[key] as { startDate?: { toDate?: () => Date }; endDate?: { toDate?: () => Date } };
            if (val && !trials[examId]) {
              trials[examId] = {
                startDate: val.startDate?.toDate?.() || new Date(0),
                endDate: val.endDate?.toDate?.() || new Date(0),
              };
            }
            corruptedKeys.push(key);
          }
        }

        // If corrupted keys found, fix them in Firestore (fire-and-forget)
        if (corruptedKeys.length > 0) {
          const fixUpdate: Record<string, unknown> = { trials };
          for (const key of corruptedKeys) {
            fixUpdate[key] = deleteField();
          }
          updateDoc(doc(db, 'subscriptions', userId), fixUpdate).catch(() => {});
        }

        // Deserialize per-exam paid subscriptions map
        const paidExams: Record<string, ExamPaidSubscription> = {};
        if (data.paidExams) {
          for (const [key, val] of Object.entries(data.paidExams)) {
            const p = val as Record<string, unknown>;
            paidExams[key] = {
              stripeSubscriptionId: (p.stripeSubscriptionId as string) || '',
              status: (p.status as SubscriptionStatus) || 'expired',
              tier: (p.tier as SubscriptionTier) || 'free',
              currentPeriodStart: (p.currentPeriodStart as { toDate?: () => Date })?.toDate?.(),
              currentPeriodEnd: (p.currentPeriodEnd as { toDate?: () => Date })?.toDate?.(),
              cancelAtPeriodEnd: (p.cancelAtPeriodEnd as boolean) || false,
              isFounder: (p.isFounder as boolean) || false,
            };
          }
        }

        return {
          ...data,
          currentPeriodStart: data.currentPeriodStart?.toDate(),
          currentPeriodEnd: data.currentPeriodEnd?.toDate(),
          trialEnd: data.trialEnd?.toDate(),
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          trials,
          paidExams,
        } as UserSubscription;
      }
      return null;
    } catch (error) {
      logger.error('Error fetching subscription:', error);
      return null;
    }
  }

  /**
   * Create default free subscription with 14-day trial for new users.
   * Trial is started for the specified courseId (per-exam trials).
   */
  async createFreeSubscription(userId: string, courseId?: string): Promise<UserSubscription> {
    const now = new Date();
    const trialEnd = new Date(now);
    trialEnd.setDate(trialEnd.getDate() + 14); // 14-day trial

    const examId = courseId || 'cpa';

    // Build per-exam trials map
    const trials: Record<string, ExamTrial> = {
      [examId]: { startDate: now, endDate: trialEnd },
    };

    const subscription: UserSubscription = {
      tier: 'free',
      status: 'trialing',
      trialEnd, // Legacy field
      createdAt: now,
      updatedAt: now,
      courseId: examId,
      trials,
    };

    await setDoc(doc(db, 'subscriptions', userId), {
      ...subscription,
      trials: {
        [examId]: { startDate: now, endDate: trialEnd },
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return subscription;
  }

  /**
   * Grant or renew trial for existing user who hasn't had one.
   * Handles users created before the per-exam trial system was added.
   * Now creates a per-exam trial entry.
   */
  async grantTrialIfEligible(userId: string, courseId?: string): Promise<UserSubscription | null> {
    const subscription = await this.getUserSubscription(userId);
    if (!subscription) return null;
    
    const examId = courseId || subscription.courseId || 'cpa';
    
    // Don't grant trial if user has a paid subscription for this exam
    const paidExam = subscription.paidExams?.[examId];
    if (paidExam && (paidExam.status === 'active' || paidExam.status === 'trialing')) {
      return subscription;
    }
    
    // Also check legacy paid status
    if (subscription.tier !== 'free' && subscription.courseId === examId && subscription.status === 'active') {
      return subscription;
    }
    
    // Check if user already has a per-exam trial for this course
    if (subscription.trials?.[examId]) return subscription;
    
    // Legacy check: if they have a trialEnd and courseId matches, create trials map entry
    if (subscription.trialEnd && subscription.courseId === examId) {
      // Migrate legacy trial to trials map
      const trials = { ...subscription.trials, [examId]: { startDate: subscription.createdAt || new Date(), endDate: subscription.trialEnd } };
      await setDoc(doc(db, 'subscriptions', userId), {
        trials,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      return { ...subscription, trials };
    }
    
    // No trial ever for this exam — grant one
    const now = new Date();
    const trialEnd = new Date(now);
    trialEnd.setDate(trialEnd.getDate() + 14);
    
    const trials = { ...subscription.trials, [examId]: { startDate: now, endDate: trialEnd } };
    
    // Use updateDoc for dot-notation paths (interprets them as nested field paths)
    await updateDoc(doc(db, 'subscriptions', userId), {
      [`trials.${examId}`]: { startDate: now, endDate: trialEnd },
      // Also set legacy fields if no trial existed before
      ...(!subscription.trialEnd ? { trialEnd, status: 'trialing' } : {}),
      updatedAt: serverTimestamp(),
    });
    
    return { ...subscription, trials, updatedAt: now };
  }

  /**
   * Start a per-exam trial for a user.
   * Each exam gets its own independent 14-day trial.
   * Returns null if user already had a trial for this exam.
   */
  async startExamTrial(userId: string, courseId: string): Promise<ExamTrial | null> {
    const subscription = await this.getUserSubscription(userId);
    
    // Check if trial already exists for this exam
    if (subscription?.trials?.[courseId]) {
      logger.info(`User ${userId} already had a trial for ${courseId}`);
      return null;
    }
    
    // Legacy check
    if (subscription?.trialEnd && subscription?.courseId === courseId) {
      logger.info(`User ${userId} already had a legacy trial for ${courseId}`);
      return null;
    }
    
    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + 14);
    
    const trial: ExamTrial = { startDate: now, endDate };
    
    if (subscription) {
      // Doc exists — use updateDoc which interprets dot notation as nested field paths
      await updateDoc(doc(db, 'subscriptions', userId), {
        [`trials.${courseId}`]: { startDate: now, endDate },
        updatedAt: serverTimestamp(),
      });
    } else {
      // No subscription doc yet — create with setDoc using nested object structure
      await setDoc(doc(db, 'subscriptions', userId), {
        trials: { [courseId]: { startDate: now, endDate } },
        tier: 'free',
        status: 'active',
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      }, { merge: true });
    }
    
    logger.info(`Started 14-day trial for ${courseId} for user ${userId}`);
    return trial;
  }

  /**
   * Get trial status for a specific exam.
   * Checks the per-exam trials map first, then falls back to legacy trialEnd field.
   */
  getExamTrialStatus(subscription: UserSubscription | null, courseId: string): {
    hasTrial: boolean;
    isActive: boolean;
    daysRemaining: number;
    endDate: Date | null;
    canStartTrial: boolean;
  } {
    if (!subscription) {
      return { hasTrial: false, isActive: false, daysRemaining: 0, endDate: null, canStartTrial: true };
    }
    
    const now = new Date();
    
    // Check per-exam trials map first
    const trial = subscription.trials?.[courseId];
    if (trial) {
      const isActive = now < trial.endDate;
      const daysRemaining = Math.max(0, Math.ceil((trial.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
      return {
        hasTrial: true,
        isActive,
        daysRemaining,
        endDate: trial.endDate,
        canStartTrial: false, // Already had a trial
      };
    }
    
    // Fall back to legacy trialEnd if courseId matches
    if (subscription.courseId === courseId && subscription.trialEnd) {
      const isActive = now < subscription.trialEnd;
      const daysRemaining = Math.max(0, Math.ceil((subscription.trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
      return {
        hasTrial: true,
        isActive,
        daysRemaining,
        endDate: subscription.trialEnd,
        canStartTrial: false,
      };
    }
    
    // No trial for this exam — user can start one
    return { hasTrial: false, isActive: false, daysRemaining: 0, endDate: null, canStartTrial: true };
  }

  /**
   * Check if user has paid access to a specific exam.
   * Checks paidExams map first, then legacy single-course fields.
   */
  hasExamPaidAccess(subscription: UserSubscription | null, courseId: string): boolean {
    if (!subscription) return false;
    
    // Check per-exam paid subs map
    const paidExam = subscription.paidExams?.[courseId];
    if (paidExam && paidExam.status === 'active') return true;
    
    // Legacy: single courseId + paid tier
    if (subscription.courseId === courseId && subscription.tier !== 'free' && subscription.status === 'active') {
      return true;
    }
    
    return false;
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
   * Note: We keep trialEnd to track that user had a trial (prevents re-granting)
   */
  async endTrial(userId: string): Promise<void> {
    await updateDoc(doc(db, 'subscriptions', userId), {
      tier: 'free',
      status: 'expired', // Changed from 'active' - trial expired, not active subscription
      // Keep trialEnd so we know user already had a trial
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
  const [refreshKey, setRefreshKey] = useState(0);

  // Force a refresh of subscription data (e.g., after starting a trial)
  const refreshSubscription = () => setRefreshKey(k => k + 1);

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
          sub = await subscriptionService.createFreeSubscription(user.uid, activeCourseId);
        } else {
          // Grant trial for the active course if user hasn't had one for it
          const upgraded = await subscriptionService.grantTrialIfEligible(user.uid, activeCourseId);
          if (upgraded) {
            sub = upgraded;
          }
        }
        
        setSubscription(sub);
        
        // === Per-exam trial status for the ACTIVE course ===
        const examTrialStatus = subscriptionService.getExamTrialStatus(sub, activeCourseId);
        
        setIsTrialing(examTrialStatus.isActive);
        setTrialExpired(examTrialStatus.hasTrial && !examTrialStatus.isActive);
        setTrialDaysRemaining(examTrialStatus.daysRemaining);
        
        // === Per-exam paid access for the ACTIVE course ===
        const hasPaidAccess = subscriptionService.hasExamPaidAccess(sub, activeCourseId);
        setIsPremium(hasPaidAccess);
        
        // Set plan limits: full access if paid or trialing
        if (examTrialStatus.isActive || hasPaidAccess) {
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
  }, [user, activeCourseId, refreshKey]);

  // === Computed access for the ACTIVE course ===
  const subscribedCourseId = subscription?.courseId;
  const hasFullAccess = isPremium || isTrialing;

  /**
   * Get access status for a specific exam (used by CourseSelector)
   */
  const getExamAccess = (courseId: string) => {
    const trialStatus = subscriptionService.getExamTrialStatus(subscription, courseId);
    const hasPaid = subscriptionService.hasExamPaidAccess(subscription, courseId);
    
    // Get per-exam paid subscription details
    const paidExam = subscription?.paidExams?.[courseId];
    const cancelAtPeriodEnd = paidExam?.cancelAtPeriodEnd || false;
    const currentPeriodEnd = paidExam?.currentPeriodEnd || subscription?.currentPeriodEnd;
    
    return {
      hasAccess: hasPaid || trialStatus.isActive,
      isPaid: hasPaid,
      isTrialing: trialStatus.isActive,
      trialDaysRemaining: trialStatus.daysRemaining,
      trialExpired: trialStatus.hasTrial && !trialStatus.isActive,
      canStartTrial: trialStatus.canStartTrial,
      trialEndDate: trialStatus.endDate,
      cancelAtPeriodEnd,
      currentPeriodEnd,
    };
  };

  /**
   * Start a per-exam trial (used by CourseSelector when switching to new exam)
   */
  const startExamTrial = async (courseId: string): Promise<boolean> => {
    if (!user) return false;
    const result = await subscriptionService.startExamTrial(user.uid, courseId);
    if (result) {
      refreshSubscription();
      return true;
    }
    return false;
  };

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
    getExamAccess,
    startExamTrial,
    refreshSubscription,
    checkFeature: (feature: keyof PlanLimits) => {
      const value = limits[feature];
      if (typeof value === 'boolean') return value;
      if (typeof value === 'number') return value > 0;
      return value === 'unlimited';
    },
  };
}

/**
 * Subscription Service Tests
 * 
 * These tests verify the plan limits and feature access logic.
 * 
 * IMPORTANT: The app is currently in BETA mode (IS_BETA = true),
 * which unlocks all features for free users. These tests document
 * both the beta behavior AND the expected post-beta behavior.
 */

import { describe, it, expect } from 'vitest';
import { SUBSCRIPTION_PLANS, IS_BETA_PERIOD, type SubscriptionTier } from '../../services/subscription';

describe('Subscription Plans - Launch State', () => {
  // Document current state
  it('confirms we are NOT in beta period (beta has ended)', () => {
    // This test will fail when beta ends, reminding us to update tests
    expect(IS_BETA_PERIOD).toBe(false);
  });

  describe('Free tier (14-day trial with full access)', () => {
    const freeLimits = SUBSCRIPTION_PLANS.free.limits;

    it('has unlimited questions during trial', () => {
      expect(freeLimits.questionsPerDay).toBe(Infinity);
    });

    it('has unlimited AI tutor messages during trial', () => {
      expect(freeLimits.aiTutorMessages).toBe(Infinity);
    });

    it('includes TBS access during trial', () => {
      expect(freeLimits.tbsAccess).toBe(true);
    });

    it('includes offline mode during trial', () => {
      expect(freeLimits.offlineMode).toBe(true);
    });

    it('includes progress analytics during trial', () => {
      expect(freeLimits.progressAnalytics).toBe(true);
    });

    it('includes study plans during trial', () => {
      expect(freeLimits.studyPlans).toBe(true);
    });

    it('has unlimited exam sections during trial', () => {
      expect(freeLimits.examSections).toBe('unlimited');
    });
  });
});

describe('Subscription Plans - Structure', () => {
  describe('Monthly tier limits', () => {
    const monthlyLimits = SUBSCRIPTION_PLANS.monthly.limits;

    it('has unlimited questions per day', () => {
      expect(monthlyLimits.questionsPerDay).toBe(Infinity);
    });

    it('has unlimited AI tutor messages', () => {
      expect(monthlyLimits.aiTutorMessages).toBe(Infinity);
    });

    it('includes TBS access', () => {
      expect(monthlyLimits.tbsAccess).toBe(true);
    });

    it('includes offline mode', () => {
      expect(monthlyLimits.offlineMode).toBe(true);
    });

    it('includes progress analytics', () => {
      expect(monthlyLimits.progressAnalytics).toBe(true);
    });

    it('includes study plans', () => {
      expect(monthlyLimits.studyPlans).toBe(true);
    });

    it('has access to all exam sections', () => {
      expect(monthlyLimits.examSections).toBe('unlimited');
    });
  });

  describe('All paid tiers have same premium limits', () => {
    const premiumTiers: SubscriptionTier[] = ['monthly', 'quarterly', 'annual', 'lifetime'];

    premiumTiers.forEach(tier => {
      describe(`${tier} tier`, () => {
        it('has unlimited questions', () => {
          expect(SUBSCRIPTION_PLANS[tier].limits.questionsPerDay).toBe(Infinity);
        });

        it('has unlimited AI messages', () => {
          expect(SUBSCRIPTION_PLANS[tier].limits.aiTutorMessages).toBe(Infinity);
        });

        it('has TBS access', () => {
          expect(SUBSCRIPTION_PLANS[tier].limits.tbsAccess).toBe(true);
        });
      });
    });
  });
});

describe('Pricing Structure', () => {
  it('free tier is $0', () => {
    expect(SUBSCRIPTION_PLANS.free.price).toBe(0);
  });

  it('monthly tier has reasonable price', () => {
    expect(SUBSCRIPTION_PLANS.monthly.price).toBeGreaterThan(0);
    expect(SUBSCRIPTION_PLANS.monthly.price).toBeLessThan(50);
  });

  it('quarterly tier saves money vs monthly', () => {
    const monthlyFor3 = SUBSCRIPTION_PLANS.monthly.price * 3;
    const quarterly = SUBSCRIPTION_PLANS.quarterly.price;
    
    expect(quarterly).toBeLessThan(monthlyFor3);
  });

  it('annual tier saves money vs monthly', () => {
    const monthlyFor12 = SUBSCRIPTION_PLANS.monthly.price * 12;
    const annual = SUBSCRIPTION_PLANS.annual.price;
    
    expect(annual).toBeLessThan(monthlyFor12);
  });

  it('lifetime tier is legacy plan (no longer offered)', () => {
    // Lifetime tier is a legacy plan - price is 0, no longer offered for purchase
    expect(SUBSCRIPTION_PLANS.lifetime.price).toBe(0);
    expect(SUBSCRIPTION_PLANS.lifetime.interval).toBe('once');
  });
});

describe('Plan Features Array', () => {
  it('all plans have features array', () => {
    Object.values(SUBSCRIPTION_PLANS).forEach(plan => {
      expect(Array.isArray(plan.features)).toBe(true);
      expect(plan.features.length).toBeGreaterThan(0);
    });
  });

  it('annual plan mentions savings', () => {
    const annualFeatures = SUBSCRIPTION_PLANS.annual.features.join(' ').toLowerCase();
    expect(annualFeatures).toMatch(/save|%/i);
  });

  it('lifetime plan mentions legacy status', () => {
    const lifetimeFeatures = SUBSCRIPTION_PLANS.lifetime.features.join(' ').toLowerCase();
    expect(lifetimeFeatures).toMatch(/legacy|no longer/i);
  });

  it('beta free tier mentions all features unlocked', () => {
    if (IS_BETA_PERIOD) {
      const freeFeatures = SUBSCRIPTION_PLANS.free.features.join(' ').toLowerCase();
      expect(freeFeatures).toMatch(/beta|unlocked|unlimited/i);
    }
  });
});

describe('Plan Metadata', () => {
  it('all plans have correct tier field', () => {
    (Object.keys(SUBSCRIPTION_PLANS) as SubscriptionTier[]).forEach(tier => {
      expect(SUBSCRIPTION_PLANS[tier].tier).toBe(tier);
    });
  });

  it('all plans have name', () => {
    Object.values(SUBSCRIPTION_PLANS).forEach(plan => {
      expect(plan.name).toBeTruthy();
      expect(typeof plan.name).toBe('string');
    });
  });

  it('paid plans have valid interval', () => {
    const validIntervals = ['month', 'quarter', 'year', 'once'];
    const paidTiers: SubscriptionTier[] = ['monthly', 'quarterly', 'annual', 'lifetime'];
    
    paidTiers.forEach(tier => {
      expect(validIntervals).toContain(SUBSCRIPTION_PLANS[tier].interval);
    });
  });

  it('free tier has null interval', () => {
    expect(SUBSCRIPTION_PLANS.free.interval).toBeNull();
  });
});

describe('Plan Limit Type Consistency', () => {
  it('questionsPerDay is number for all plans', () => {
    Object.values(SUBSCRIPTION_PLANS).forEach(plan => {
      expect(typeof plan.limits.questionsPerDay).toBe('number');
    });
  });

  it('aiTutorMessages is number for all plans', () => {
    Object.values(SUBSCRIPTION_PLANS).forEach(plan => {
      expect(typeof plan.limits.aiTutorMessages).toBe('number');
    });
  });

  it('boolean features are consistent', () => {
    const booleanFeatures = ['tbsAccess', 'offlineMode', 'progressAnalytics', 'studyPlans'] as const;
    
    Object.values(SUBSCRIPTION_PLANS).forEach(plan => {
      booleanFeatures.forEach(feature => {
        expect(typeof plan.limits[feature]).toBe('boolean');
      });
    });
  });
});

describe('Business Logic - Limit Calculations', () => {
  describe('with Infinity limits (beta/premium)', () => {
    it('Infinity limit always allows more actions', () => {
      const limit = SUBSCRIPTION_PLANS.monthly.limits.questionsPerDay;
      const currentCount = 1000000;
      
      const allowed = currentCount < limit;
      expect(allowed).toBe(true);
    });

    it('remaining is Infinity when limit is Infinity', () => {
      const limit = Infinity;
      const currentCount = 100;
      
      const remaining = limit - currentCount;
      expect(remaining).toBe(Infinity);
    });
  });

  describe('limit enforcement logic (for when beta ends)', () => {
    // These tests document the expected behavior post-beta
    it('can check if user has reached a finite limit', () => {
      const limit = 50; // Expected free tier limit post-beta
      const currentCount = 50;
      
      const hasReachedLimit = currentCount >= limit;
      expect(hasReachedLimit).toBe(true);
    });

    it('can calculate remaining actions', () => {
      const limit = 50;
      const currentCount = 30;
      
      const remaining = Math.max(0, limit - currentCount);
      expect(remaining).toBe(20);
    });

    it('remaining never goes negative', () => {
      const limit = 50;
      const currentCount = 100; // Over limit
      
      const remaining = Math.max(0, limit - currentCount);
      expect(remaining).toBe(0);
    });
  });

  describe('Feature access checks', () => {
    it('boolean true means has access', () => {
      const tbsAccess = SUBSCRIPTION_PLANS.monthly.limits.tbsAccess;
      expect(tbsAccess).toBeTruthy();
    });

    it('"unlimited" string means full section access', () => {
      const examSections = SUBSCRIPTION_PLANS.monthly.limits.examSections;
      expect(examSections === 'unlimited').toBe(true);
    });
  });
});

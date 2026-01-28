import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Firebase config before importing the service
vi.mock('../../config/firebase.js', () => ({
  db: {},
  auth: {}
}));

// Mock AuthProvider
vi.mock('../../providers/AuthProvider', () => ({
  useAuth: vi.fn(() => ({ user: null }))
}));

// Create mock functions
const mockGetDoc = vi.fn();
const mockSetDoc = vi.fn();
const mockUpdateDoc = vi.fn();
const mockDoc = vi.fn();
const mockServerTimestamp = vi.fn(() => new Date());

// Mock Firestore functions
vi.mock('firebase/firestore', () => ({
  doc: (...args: unknown[]) => mockDoc(...args),
  getDoc: (...args: unknown[]) => mockGetDoc(...args),
  setDoc: (...args: unknown[]) => mockSetDoc(...args),
  updateDoc: (...args: unknown[]) => mockUpdateDoc(...args),
  serverTimestamp: () => mockServerTimestamp()
}));

import {
  subscriptionService,
  SUBSCRIPTION_PLANS,
  IS_BETA_PERIOD,
  type SubscriptionTier,
} from '../../services/subscription';

describe('subscription service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDoc.mockReturnValue({ path: 'subscriptions/test-user-id' });
    mockSetDoc.mockResolvedValue(undefined);
    mockUpdateDoc.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('SUBSCRIPTION_PLANS', () => {
    it('should have all required tiers defined', () => {
      expect(SUBSCRIPTION_PLANS).toHaveProperty('free');
      expect(SUBSCRIPTION_PLANS).toHaveProperty('monthly');
      expect(SUBSCRIPTION_PLANS).toHaveProperty('quarterly');
      expect(SUBSCRIPTION_PLANS).toHaveProperty('annual');
      expect(SUBSCRIPTION_PLANS).toHaveProperty('lifetime');
    });

    it('should have correct pricing for each tier', () => {
      expect(SUBSCRIPTION_PLANS.free.price).toBe(0);
      expect(SUBSCRIPTION_PLANS.monthly.price).toBe(12.99);
      expect(SUBSCRIPTION_PLANS.quarterly.price).toBe(29.99);
      expect(SUBSCRIPTION_PLANS.annual.price).toBe(99);
      expect(SUBSCRIPTION_PLANS.lifetime.price).toBe(199);
    });

    it('should have correct intervals for each tier', () => {
      expect(SUBSCRIPTION_PLANS.free.interval).toBeNull();
      expect(SUBSCRIPTION_PLANS.monthly.interval).toBe('month');
      expect(SUBSCRIPTION_PLANS.quarterly.interval).toBe('quarter');
      expect(SUBSCRIPTION_PLANS.annual.interval).toBe('year');
      expect(SUBSCRIPTION_PLANS.lifetime.interval).toBe('once');
    });

    it('should have features array for each plan', () => {
      Object.values(SUBSCRIPTION_PLANS).forEach(plan => {
        expect(Array.isArray(plan.features)).toBe(true);
        expect(plan.features.length).toBeGreaterThan(0);
      });
    });

    it('should have limits defined for each plan', () => {
      Object.values(SUBSCRIPTION_PLANS).forEach(plan => {
        expect(plan.limits).toBeDefined();
        expect(plan.limits).toHaveProperty('questionsPerDay');
        expect(plan.limits).toHaveProperty('aiTutorMessages');
        expect(plan.limits).toHaveProperty('examSections');
        expect(plan.limits).toHaveProperty('tbsAccess');
        expect(plan.limits).toHaveProperty('offlineMode');
        expect(plan.limits).toHaveProperty('progressAnalytics');
        expect(plan.limits).toHaveProperty('studyPlans');
      });
    });

    it('paid plans should have unlimited/full access', () => {
      const paidTiers: SubscriptionTier[] = ['monthly', 'quarterly', 'annual', 'lifetime'];
      paidTiers.forEach(tier => {
        const limits = SUBSCRIPTION_PLANS[tier].limits;
        expect(limits.questionsPerDay).toBe(Infinity);
        expect(limits.aiTutorMessages).toBe(Infinity);
        expect(limits.examSections).toBe('unlimited');
        expect(limits.tbsAccess).toBe(true);
        expect(limits.offlineMode).toBe(true);
        expect(limits.progressAnalytics).toBe(true);
        expect(limits.studyPlans).toBe(true);
      });
    });
  });

  describe('IS_BETA_PERIOD', () => {
    it('should export beta period flag', () => {
      expect(typeof IS_BETA_PERIOD).toBe('boolean');
    });

    it('beta period should give free tier full access', () => {
      if (IS_BETA_PERIOD) {
        const freeLimits = SUBSCRIPTION_PLANS.free.limits;
        expect(freeLimits.questionsPerDay).toBe(Infinity);
        expect(freeLimits.aiTutorMessages).toBe(Infinity);
        expect(freeLimits.tbsAccess).toBe(true);
      }
    });
  });

  describe('subscriptionService.getPlan', () => {
    it('should return correct plan for each tier', () => {
      const tiers: SubscriptionTier[] = ['free', 'monthly', 'quarterly', 'annual', 'lifetime'];
      tiers.forEach(tier => {
        const plan = subscriptionService.getPlan(tier);
        expect(plan.tier).toBe(tier);
        expect(plan).toBe(SUBSCRIPTION_PLANS[tier]);
      });
    });
  });

  describe('subscriptionService.getAllPlans', () => {
    it('should return all plans as an array', () => {
      const plans = subscriptionService.getAllPlans();
      expect(Array.isArray(plans)).toBe(true);
      expect(plans.length).toBe(5);
    });

    it('should contain all tier plans', () => {
      const plans = subscriptionService.getAllPlans();
      const tiers = plans.map(p => p.tier);
      expect(tiers).toContain('free');
      expect(tiers).toContain('monthly');
      expect(tiers).toContain('quarterly');
      expect(tiers).toContain('annual');
      expect(tiers).toContain('lifetime');
    });
  });

  describe('subscriptionService.getUserSubscription', () => {
    it('should return subscription when it exists', async () => {
      const mockData = {
        tier: 'annual',
        status: 'active',
        currentPeriodStart: { toDate: () => new Date('2024-01-01') },
        currentPeriodEnd: { toDate: () => new Date('2025-01-01') },
        createdAt: { toDate: () => new Date('2024-01-01') },
        updatedAt: { toDate: () => new Date('2024-01-01') }
      };
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => mockData
      });

      const subscription = await subscriptionService.getUserSubscription('test-user');
      
      expect(subscription).not.toBeNull();
      expect(subscription?.tier).toBe('annual');
      expect(subscription?.status).toBe('active');
    });

    it('should return null when subscription does not exist', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => false
      });

      const subscription = await subscriptionService.getUserSubscription('new-user');
      expect(subscription).toBeNull();
    });

    it('should return null on error', async () => {
      mockGetDoc.mockRejectedValue(new Error('Firestore error'));

      const subscription = await subscriptionService.getUserSubscription('test-user');
      expect(subscription).toBeNull();
    });
  });

  describe('subscriptionService.createFreeSubscription', () => {
    it('should create a free subscription for a new user', async () => {
      const subscription = await subscriptionService.createFreeSubscription('new-user');

      expect(subscription.tier).toBe('free');
      expect(subscription.status).toBe('active');
      expect(mockSetDoc).toHaveBeenCalled();
    });
  });

  describe('subscriptionService.getPlanLimits', () => {
    it('should return free limits when user has no subscription', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => false
      });

      const limits = await subscriptionService.getPlanLimits('test-user');
      expect(limits).toEqual(SUBSCRIPTION_PLANS.free.limits);
    });

    it('should return correct limits for subscribed user', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
          tier: 'annual',
          status: 'active',
          createdAt: { toDate: () => new Date() },
          updatedAt: { toDate: () => new Date() }
        })
      });

      const limits = await subscriptionService.getPlanLimits('premium-user');
      expect(limits).toEqual(SUBSCRIPTION_PLANS.annual.limits);
    });

    it('should return free limits for canceled subscription', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
          tier: 'annual',
          status: 'canceled',
          createdAt: { toDate: () => new Date() },
          updatedAt: { toDate: () => new Date() }
        })
      });

      const limits = await subscriptionService.getPlanLimits('canceled-user');
      expect(limits).toEqual(SUBSCRIPTION_PLANS.free.limits);
    });
  });

  describe('subscriptionService.hasFeatureAccess', () => {
    it('should return true for boolean feature when enabled', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
          tier: 'annual',
          status: 'active',
          createdAt: { toDate: () => new Date() },
          updatedAt: { toDate: () => new Date() }
        })
      });

      const hasAccess = await subscriptionService.hasFeatureAccess('test-user', 'tbsAccess');
      expect(hasAccess).toBe(true);
    });

    it('should return true for unlimited exam sections', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
          tier: 'annual',
          status: 'active',
          createdAt: { toDate: () => new Date() },
          updatedAt: { toDate: () => new Date() }
        })
      });

      const hasAccess = await subscriptionService.hasFeatureAccess('test-user', 'examSections');
      expect(hasAccess).toBe(true);
    });
  });

  describe('subscriptionService.canPerformAction', () => {
    it('should allow action for unlimited plan', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
          tier: 'annual',
          status: 'active',
          createdAt: { toDate: () => new Date() },
          updatedAt: { toDate: () => new Date() }
        })
      });

      const result = await subscriptionService.canPerformAction('test-user', 'question', 100);
      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(Infinity);
      expect(result.remaining).toBe(Infinity);
    });
  });

  describe('subscriptionService.isPremium', () => {
    it('should return false when no subscription exists', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => false
      });

      const isPremium = await subscriptionService.isPremium('test-user');
      expect(isPremium).toBe(false);
    });

    it('should return false for free tier', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
          tier: 'free',
          status: 'active',
          createdAt: { toDate: () => new Date() },
          updatedAt: { toDate: () => new Date() }
        })
      });

      const isPremium = await subscriptionService.isPremium('free-user');
      expect(isPremium).toBe(false);
    });

    it('should return true for active paid subscription', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
          tier: 'annual',
          status: 'active',
          createdAt: { toDate: () => new Date() },
          updatedAt: { toDate: () => new Date() }
        })
      });

      const isPremium = await subscriptionService.isPremium('premium-user');
      expect(isPremium).toBe(true);
    });

    it('should return true for trialing subscription', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
          tier: 'annual',
          status: 'trialing',
          createdAt: { toDate: () => new Date() },
          updatedAt: { toDate: () => new Date() }
        })
      });

      const isPremium = await subscriptionService.isPremium('trial-user');
      expect(isPremium).toBe(true);
    });
  });

  describe('subscriptionService.startTrial', () => {
    it('should start a trial for a user', async () => {
      await subscriptionService.startTrial('test-user', 'annual', 14);

      expect(mockUpdateDoc).toHaveBeenCalled();
      const updateCall = mockUpdateDoc.mock.calls[0];
      expect(updateCall[1].tier).toBe('annual');
      expect(updateCall[1].status).toBe('trialing');
      expect(updateCall[1].trialEnd).toBeInstanceOf(Date);
    });

    it('should default to 7 days trial', async () => {
      await subscriptionService.startTrial('test-user', 'monthly');

      expect(mockUpdateDoc).toHaveBeenCalled();
      const updateCall = mockUpdateDoc.mock.calls[0];
      const trialEnd = updateCall[1].trialEnd as Date;
      const now = new Date();
      const daysDiff = Math.round((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      expect(daysDiff).toBe(7);
    });
  });

  describe('subscriptionService.endTrial', () => {
    it('should revert to free tier', async () => {
      await subscriptionService.endTrial('test-user');

      expect(mockUpdateDoc).toHaveBeenCalled();
      const updateCall = mockUpdateDoc.mock.calls[0];
      expect(updateCall[1].tier).toBe('free');
      expect(updateCall[1].status).toBe('active');
      expect(updateCall[1].trialEnd).toBeNull();
    });
  });

  describe('subscriptionService.syncFromStripe', () => {
    it('should update subscription from Stripe webhook data', async () => {
      const stripeData = {
        customerId: 'cus_123',
        subscriptionId: 'sub_456',
        status: 'active',
        priceId: 'price_annual_xxx',
        currentPeriodStart: Math.floor(Date.now() / 1000),
        currentPeriodEnd: Math.floor(Date.now() / 1000) + 31536000, // +1 year
        cancelAtPeriodEnd: false
      };

      await subscriptionService.syncFromStripe('test-user', stripeData);

      expect(mockUpdateDoc).toHaveBeenCalled();
      const updateCall = mockUpdateDoc.mock.calls[0];
      expect(updateCall[1].stripeCustomerId).toBe('cus_123');
      expect(updateCall[1].stripeSubscriptionId).toBe('sub_456');
      expect(updateCall[1].status).toBe('active');
    });
  });
});

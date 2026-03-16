/**
 * Subscription Page
 * 
 * Dedicated page for managing exam subscriptions and trials.
 * Extracted from Settings for cleaner UX.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logger from '../../utils/logger';
import {
  CreditCard,
  CheckCircle,
  ExternalLink,
  Loader2,
  Sparkles,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { PageHeader } from '../navigation';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../providers/CourseProvider';
import { functions } from '../../config/firebase';
import { useSubscription, EXAM_PRICING, isFounderPricingActive } from '../../services/subscription';
import { isCourseActive } from '../../courses';
import type { CourseId } from '../../types/course';
import { httpsCallable } from 'firebase/functions';
import clsx from 'clsx';

const Subscription: React.FC = () => {
  const { user } = useAuth();
  const { courseId } = useCourse();
  const { subscription, getExamAccess } = useSubscription();
  const navigate = useNavigate();
  const [isManagingSubscription, setIsManagingSubscription] = useState(false);

  const handleManageSubscription = async () => {
    if (!user) return;
    setIsManagingSubscription(true);
    try {
      const createPortalSession = httpsCallable<{ returnUrl: string }, { url: string }>(
        functions,
        'createCustomerPortalSession'
      );
      const result = await createPortalSession({
        returnUrl: window.location.href
      });
      window.location.href = result.data.url;
    } catch (error) {
      logger.error('Error opening subscription portal:', error);
      alert('Unable to open subscription management. Please try again.');
      setIsManagingSubscription(false);
    }
  };

  // Get current exam access
  const currentAccess = getExamAccess(courseId);
  const isFounder = isFounderPricingActive();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHeader
        title="Subscription"
        subtitle="Manage your exam access"
      />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Current Plan Hero */}
        <div className={clsx(
          'rounded-2xl p-6 border-2',
          currentAccess.isPaid
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
            : currentAccess.isTrialing
              ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800'
              : 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800'
        )}>
          <div className="flex items-start gap-4">
            <div className={clsx(
              'w-14 h-14 rounded-2xl flex items-center justify-center',
              currentAccess.isPaid
                ? 'bg-green-100 dark:bg-green-900/30'
                : currentAccess.isTrialing
                  ? 'bg-blue-100 dark:bg-blue-900/30'
                  : 'bg-amber-100 dark:bg-amber-900/30'
            )}>
              {currentAccess.isPaid ? (
                <CheckCircle className="w-7 h-7 text-green-600 dark:text-green-400" />
              ) : currentAccess.isTrialing ? (
                <Clock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              ) : (
                <AlertCircle className="w-7 h-7 text-amber-600 dark:text-amber-400" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {courseId.toUpperCase()} Exam
                </h2>
                <span className={clsx(
                  'text-xs font-semibold px-2 py-1 rounded-full',
                  currentAccess.isPaid
                    ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                    : currentAccess.isTrialing
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                      : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                )}>
                  {currentAccess.isPaid ? 'Active' : currentAccess.isTrialing ? 'Trial' : 'Limited'}
                </span>
              </div>
              
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                {currentAccess.isPaid ? (
                  currentAccess.cancelAtPeriodEnd 
                    ? `Cancels on ${new Date(currentAccess.currentPeriodEnd!).toLocaleDateString()}`
                    : `Renews ${new Date(currentAccess.currentPeriodEnd!).toLocaleDateString()}`
                ) : currentAccess.isTrialing ? (
                  `${currentAccess.trialDaysRemaining} days remaining in trial`
                ) : currentAccess.trialExpired ? (
                  'Trial expired — upgrade to continue'
                ) : (
                  'Start your free trial to unlock all features'
                )}
              </p>

              {/* Action buttons */}
              <div className="mt-4 flex flex-wrap gap-3">
                {currentAccess.isPaid && subscription?.stripeCustomerId ? (
                  <button
                    onClick={handleManageSubscription}
                    disabled={isManagingSubscription}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                  >
                    {isManagingSubscription ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Opening...
                      </>
                    ) : (
                      <>
                        Manage Subscription
                        <ExternalLink className="w-4 h-4" />
                      </>
                    )}
                  </button>
                ) : !currentAccess.isPaid && (
                  <>
                    <button
                      onClick={() => navigate(`/start-checkout?course=${courseId}&interval=annual`)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      Upgrade Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Options (for non-subscribers) */}
        {!currentAccess.isPaid && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-600" />
                Upgrade Options
              </h3>
              {isFounder && (
                <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                  🎉 Founder pricing is active — limited time only!
                </p>
              )}
            </div>
            
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              {/* Monthly */}
              <div className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Monthly</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${isFounder ? EXAM_PRICING[courseId].founderMonthly : EXAM_PRICING[courseId].monthly}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">/mo</span>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Cancel anytime
                </p>
                <button
                  onClick={() => navigate(`/start-checkout?course=${courseId}&interval=monthly`)}
                  className="mt-4 w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-xl transition-colors"
                >
                  Choose Monthly
                </button>
              </div>

              {/* Annual - Recommended */}
              <div className="p-4 rounded-xl border-2 border-primary-500 dark:border-primary-600 bg-primary-50 dark:bg-primary-900/20 relative">
                <div className="absolute -top-3 left-4 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  BEST VALUE
                </div>
                <div className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">Annual</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${isFounder ? EXAM_PRICING[courseId].founderAnnual : EXAM_PRICING[courseId].annual}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">/yr</span>
                </div>
                <p className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium">
                  Save 40%+ vs monthly
                </p>
                <button
                  onClick={() => navigate(`/start-checkout?course=${courseId}&interval=annual`)}
                  className="mt-4 w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Choose Annual
                </button>
              </div>
            </div>
          </div>
        )}

        {/* All Exams List */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              All Exam Subscriptions
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Each exam is billed separately
            </p>
          </div>
          
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {(['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'] as CourseId[]).filter(isCourseActive).map(examId => {
              const access = getExamAccess(examId);
              const examName = examId.toUpperCase();
              const isCurrentExam = examId === courseId;

              return (
                <div key={examId} className={clsx(
                  'p-4 flex items-center justify-between',
                  isCurrentExam && 'bg-primary-50/50 dark:bg-primary-900/10'
                )}>
                  <div className="flex items-center gap-3">
                    <div className={clsx(
                      'w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm',
                      access.isPaid
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : access.isTrialing
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    )}>
                      {examName}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        {examName} Exam
                        {isCurrentExam && (
                          <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-1.5 py-0.5 rounded">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {access.isPaid ? (
                          <span className="text-green-600 dark:text-green-400">Subscribed</span>
                        ) : access.isTrialing ? (
                          <span className="text-blue-600 dark:text-blue-400">{access.trialDaysRemaining}d trial remaining</span>
                        ) : access.trialExpired ? (
                          <span className="text-amber-600 dark:text-amber-400">Trial expired</span>
                        ) : (
                          <span>Free trial available</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status indicator or action */}
                  {access.isPaid ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <button
                      onClick={() => navigate(`/start-checkout?course=${examId}&interval=annual`)}
                      className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      Upgrade
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            What's Included
          </h3>
          <ul className="space-y-3">
            {[
              'Unlimited practice questions',
              'Full mock exams with realistic timing',
              'Task-based simulations (TBS)',
              'AI-powered explanations',
              'Adaptive study plan',
              'Progress analytics & readiness score',
              'Offline mode support',
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Subscription;

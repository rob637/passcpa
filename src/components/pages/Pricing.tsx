import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Shield, Sparkles, Gift, LucideIcon } from 'lucide-react';
import { SUBSCRIPTION_PLANS, SubscriptionTier, SubscriptionPlan, useSubscription, IS_BETA_PERIOD } from '../../services/subscription';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

interface PlanDisplay extends SubscriptionPlan {
  popular: boolean;
  icon: LucideIcon;
  cta: string;
  disabled: boolean;
  hidden?: boolean;
  savings?: string;
}

const Pricing = () => {
  useDocumentTitle('Pricing');
  const { subscription, loading } = useSubscription();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('annual');

  const plans: PlanDisplay[] = [
    {
      ...SUBSCRIPTION_PLANS.free,
      popular: IS_BETA_PERIOD, // Free is popular during beta!
      icon: Gift,
      cta: IS_BETA_PERIOD ? 'Start Free' : (subscription?.tier === 'free' ? 'Current Plan' : 'Get Started'),
      disabled: false,
    },
    {
      ...SUBSCRIPTION_PLANS.monthly,
      popular: false,
      icon: Star,
      cta: IS_BETA_PERIOD ? 'Coming Q3 2026' : (subscription?.tier === 'monthly' ? 'Current Plan' : 'Subscribe'),
      disabled: IS_BETA_PERIOD || subscription?.tier === 'monthly',
      hidden: billingInterval === 'annual',
    },
    {
      ...SUBSCRIPTION_PLANS.quarterly,
      popular: false,
      icon: Sparkles,
      cta: IS_BETA_PERIOD ? 'Coming Q3 2026' : (subscription?.tier === 'quarterly' ? 'Current Plan' : 'Subscribe'),
      disabled: IS_BETA_PERIOD || subscription?.tier === 'quarterly',
      savings: 'Save 23%',
      hidden: billingInterval === 'annual',
    },
    {
      ...SUBSCRIPTION_PLANS.annual,
      popular: !IS_BETA_PERIOD && billingInterval === 'annual',
      icon: Shield,
      cta: IS_BETA_PERIOD ? 'Coming Q3 2026' : (subscription?.tier === 'annual' ? 'Current Plan' : 'Subscribe'),
      disabled: IS_BETA_PERIOD || subscription?.tier === 'annual',
      savings: 'Best Value',
    },
    {
      ...SUBSCRIPTION_PLANS.lifetime,
      popular: false,
      icon: Shield,
      cta: IS_BETA_PERIOD ? 'Coming Q3 2026' : (subscription?.tier === 'lifetime' ? 'Current Plan' : 'Get Lifetime'),
      disabled: IS_BETA_PERIOD || subscription?.tier === 'lifetime',
      savings: 'Limited: 500 spots',
    },
  ];

  const visiblePlans = plans.filter(p => !p.hidden);

  const handleSelectPlan = (tier: SubscriptionTier) => {
    if (tier === 'free') return;
    
    // TODO: Integrate with Stripe Checkout
    // For now, show coming soon message
    alert('Stripe integration coming soon! For now, enjoy the free tier with all features unlocked during beta.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo.svg" 
              alt="VoraPrep" 
              className="h-10 dark:hidden" 
            />
            <img 
              src="/logo-white.svg" 
              alt="VoraPrep" 
              className="h-10 hidden dark:block" 
            />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link>
            <Link to="/#comparison" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Compare</Link>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Pricing</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {IS_BETA_PERIOD ? (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-bold mb-6">
                <Gift className="w-4 h-4" />
                🎉 BETA: 100% FREE - All Features Unlocked!
              </div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Free During Beta
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                We're building the best CPA prep platform. Help us improve and enjoy full access — completely free.
                Paid plans coming Q3 2026 at the prices below.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                97% Cheaper Than Becker
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Same results. Fraction of the price. Start free, upgrade when you're ready.
              </p>
            </>
          )}
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingInterval === 'monthly'
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('annual')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingInterval === 'annual'
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Annual
              <span className="ml-2 text-xs text-green-600 dark:text-green-400">Save 41%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {visiblePlans.slice(0, 3).map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.tier}
                className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 ${
                  plan.popular 
                    ? 'ring-2 ring-primary-500 scale-105' 
                    : 'border border-slate-200 dark:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {plan.savings && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium px-2 py-1 rounded">
                      {plan.savings}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${plan.popular ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-slate-100 dark:bg-slate-700'}`}>
                    <Icon className={`w-6 h-6 ${plan.popular ? 'text-primary-600' : 'text-slate-600 dark:text-slate-300'}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    ${plan.price}
                  </span>
                  {plan.interval && plan.interval !== 'once' && (
                    <span className="text-slate-500 dark:text-slate-400">
                      /{plan.interval === 'quarter' ? 'quarter' : plan.interval === 'year' ? 'year' : 'mo'}
                    </span>
                  )}
                  {plan.interval === 'once' && (
                    <span className="text-slate-500 dark:text-slate-400"> one-time</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.tier)}
                  disabled={plan.disabled}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.disabled
                      ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                      : plan.popular
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : plan.tier === 'free'
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Founding Member / Lifetime Option */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Founding Member</h3>
                  <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium px-2 py-1 rounded">
                    Only 500 spots
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  One-time payment, Pro access forever. Includes all future exams (CMA, EA, etc.) + exclusive badge.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">$199</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">one-time forever</div>
                </div>
                <button
                  onClick={() => handleSelectPlan('lifetime')}
                  disabled={IS_BETA_PERIOD || subscription?.tier === 'lifetime'}
                  className={`py-3 px-6 rounded-lg font-medium transition-colors ${
                    IS_BETA_PERIOD || subscription?.tier === 'lifetime'
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-600 text-white'
                  }`}
                >
                  {IS_BETA_PERIOD ? 'Coming Q3 2026' : subscription?.tier === 'lifetime' ? 'Current Plan' : 'Become Founder'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {IS_BETA_PERIOD && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  🎉 Why is everything free right now?
                </h3>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  We're in beta! We want early users to help us build the best CPA prep platform. 
                  In exchange, you get full access to everything. Paid plans launch Q3 2026, and 
                  beta users will get special discounts.
                </p>
              </div>
            )}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                How does VoraPrep compare to Becker?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                VoraPrep covers the same material at a fraction of the cost. Our $99/year Pro plan 
                is 97% cheaper than Becker. Plus, our Free tier is genuinely useful — you CAN pass using it.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Can I really pass with the Free tier?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Yes! Free includes all 6 exam sections, 2,500+ questions, and lessons. The daily limits 
                (50 questions, 5 AI chats) are enough if you study consistently. Pro just removes limits 
                and adds offline mode.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                What's the pass guarantee?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Annual and Founding Member subscribers who complete at least 80% of the material but 
                don't pass get their subscription extended for free until they pass.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                What's a Founding Member?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Our first 500 lifetime subscribers get exclusive perks: Pro access forever (even future 
                exam preps like CMA, EA), a special badge, and the ability to vote on new features. 
                It's $199 once, never pay again.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison to competitors */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
            How We Compare
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white"></th>
                  <th className="text-center py-3 px-4 font-semibold text-green-600">VoraPrep</th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-500">Becker</th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-500">Surgent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                <tr>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">Annual Price</td>
                  <td className="py-3 px-4 text-center font-bold text-green-600">$99</td>
                  <td className="py-3 px-4 text-center text-slate-500">$3,499+</td>
                  <td className="py-3 px-4 text-center text-slate-500">$1,799</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">Free Tier</td>
                  <td className="py-3 px-4 text-center text-green-600">✓ Full access</td>
                  <td className="py-3 px-4 text-center text-slate-400">✗</td>
                  <td className="py-3 px-4 text-center text-slate-400">✗</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">Vory AI Companion</td>
                  <td className="py-3 px-4 text-center text-green-600">✓ Unlimited</td>
                  <td className="py-3 px-4 text-center text-slate-400">✗</td>
                  <td className="py-3 px-4 text-center text-slate-400">Limited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">2026 Blueprint</td>
                  <td className="py-3 px-4 text-center text-green-600">✓ Day 1</td>
                  <td className="py-3 px-4 text-center text-slate-500">Delayed</td>
                  <td className="py-3 px-4 text-center text-slate-500">TBD</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">Mobile App</td>
                  <td className="py-3 px-4 text-center text-green-600">✓ Native + PWA</td>
                  <td className="py-3 px-4 text-center text-slate-500">App</td>
                  <td className="py-3 px-4 text-center text-slate-500">Web only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Questions? We're here to help.
          </p>
          <a
            href="mailto:support@voraprep.com"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Contact Support →
          </a>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Pricing;

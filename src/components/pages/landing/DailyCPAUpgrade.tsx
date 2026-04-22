/**
 * DailyCPAUpgrade — Upgrade/subscribe page for Daily CPA
 * 
 * Public page at /daily-cpa/upgrade. Shows when trial expires.
 * Accepts uid from URL params or prompts phone lookup.
 * Initiates Stripe Checkout for the selected tier.
 */

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
  Loader2,
} from 'lucide-react';
import clsx from 'clsx';

type Tier = 'starter' | 'core' | 'pro';

const TIERS = [
  {
    id: 'starter' as Tier,
    name: 'Starter',
    price: 4.99,
    daily: 10,
    description: 'Build a daily study habit',
    features: [
      'Up to 10 questions/day',
      'Instant answer explanations',
      'Section-focused practice',
      'Daily streak tracking',
    ],
  },
  {
    id: 'core' as Tier,
    name: 'Core',
    price: 9.99,
    daily: 25,
    popular: true,
    description: 'Serious daily practice',
    features: [
      'Up to 25 questions/day',
      'Instant answer explanations',
      'Weak-area targeting',
      'Weekly performance recap',
      'Streak tracking',
    ],
  },
  {
    id: 'pro' as Tier,
    name: 'Pro',
    price: 14.99,
    daily: 50,
    description: 'Maximum daily volume',
    features: [
      'Up to 50 questions/day',
      'Instant answer explanations',
      'Advanced weak-area targeting',
      'Detailed weekly recap',
      'Faster concept re-serve',
      'Streak tracking',
    ],
  },
];

export const DailyCPAUpgrade = () => {
  const [searchParams] = useSearchParams();
  const uidParam = searchParams.get('uid');

  const [phone, setPhone] = useState('');
  const [uid, setUid] = useState(uidParam || '');
  const [selectedTier, setSelectedTier] = useState<Tier>('core');
  const [loading, setLoading] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneLookup = async () => {
    if (!phone || phone.length < 10) {
      setError('Please enter your phone number.');
      return;
    }

    setLookupLoading(true);
    setError('');

    try {
      const { httpsCallable } = await import('firebase/functions');
      const { functions } = await import('../../../config/firebase');
      const lookupFn = httpsCallable(functions, 'dailyCpa_createCheckout');

      // Format phone to E.164
      const e164 = phone.startsWith('+1') ? phone : `+1${phone.replace(/\D/g, '')}`;

      // We need the uid — try creating checkout directly with phone lookup
      // The createCheckout function needs uid, so we need an alternative approach
      // For now, show an error guiding them
      setError('Please use the link from your SMS to upgrade, or contact support@voraprep.com');
      setLookupLoading(false);
    } catch {
      setError('Something went wrong. Please try again.');
      setLookupLoading(false);
    }
  };

  const handleUpgrade = async () => {
    if (!uid) {
      setError('Please enter your phone number to find your account.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { httpsCallable } = await import('firebase/functions');
      const { functions } = await import('../../../config/firebase');
      const createCheckout = httpsCallable(functions, 'dailyCpa_createCheckout');

      const result = await createCheckout({
        uid,
        tier: selectedTier,
        origin: window.location.origin,
      });

      const data = result.data as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Could not create checkout session. Please try again.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/daily-cpa" className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-lg text-slate-900">VoraPrep Daily CPA</span>
          </Link>
          <Link
            to="/daily-cpa"
            className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
          >
            ← Back to Daily CPA
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Keep your streak alive
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Upgrade Your Daily CPA Practice
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your trial has ended, but your progress is saved. Pick a plan to continue
            your daily CPA questions via text.
          </p>
        </div>

        {/* Account lookup (only if no uid) */}
        {!uid && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-10 max-w-md mx-auto">
            <h2 className="font-semibold text-slate-900 mb-2">Find your account</h2>
            <p className="text-sm text-slate-500 mb-4">
              Enter the phone number you signed up with.
            </p>
            <div className="flex gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handlePhoneLookup}
                disabled={lookupLoading}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {lookupLoading ? 'Looking up...' : 'Find'}
              </button>
            </div>
          </div>
        )}

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={clsx(
                'relative rounded-2xl border-2 p-6 text-left transition-all duration-200',
                selectedTier === tier.id
                  ? 'border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-500/10'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-bold text-lg text-slate-900 mb-1">{tier.name}</h3>
              <p className="text-sm text-slate-500 mb-3">{tier.description}</p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-900">${tier.price}</span>
                <span className="text-sm text-slate-500">/month</span>
              </div>
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              {selectedTier === tier.id && (
                <div className="mt-4 flex items-center justify-center gap-1 text-blue-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" /> Selected
                </div>
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          {error && (
            <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2 inline-block">
              {error}
            </p>
          )}
          <button
            onClick={handleUpgrade}
            disabled={loading || !uid}
            className={clsx(
              'inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200',
              uid
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Setting up checkout...
              </>
            ) : (
              <>
                Upgrade to {TIERS.find((t) => t.id === selectedTier)?.name}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          <p className="text-xs text-slate-400 mt-3">
            Secure checkout via Stripe. Cancel anytime.
          </p>
        </div>

        {/* Trust signals */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <p className="text-sm font-medium text-slate-700">Cancel Anytime</p>
            <p className="text-xs text-slate-500">No contracts, no commitment</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <p className="text-sm font-medium text-slate-700">Progress Saved</p>
            <p className="text-xs text-slate-500">Your streak & history carry over</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-8 h-8 text-amber-500" />
            <p className="text-sm font-medium text-slate-700">Instant Access</p>
            <p className="text-xs text-slate-500">Questions resume immediately</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} VoraPrep. All rights reserved.</p>
          <p className="mt-1">
            Questions? <a href="mailto:support@voraprep.com" className="text-blue-600 hover:underline">support@voraprep.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DailyCPAUpgrade;

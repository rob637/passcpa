/**
 * DailyCPA — Landing page for the SMS-based daily MCQ product
 * 
 * Public page at /daily-cpa. No auth required.
 * Self-contained: own nav, hero, how-it-works, pricing, signup form, footer.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  CheckCircle,
  Zap,
  TrendingUp,
  Shield,
  ArrowRight,
  Smartphone,
  Brain,
  Target,
  ChevronDown,
  Star,
  Menu,
  X,
} from 'lucide-react';
import { useSEO } from '../../../hooks/useSEO';
import clsx from 'clsx';

// ============================================================================
// TYPES
// ============================================================================

type Section = 'AUD' | 'FAR' | 'REG' | 'BAR' | 'ISC' | 'TCP';
type Tier = 'starter' | 'core' | 'pro';

interface SignupFormData {
  phone: string;
  section: Section | '';
  tier: Tier;
  sendTime: string;
  timezone: string;
  email: string;
  smsConsent: boolean;
}

const SECTIONS: { value: Section; label: string; description: string }[] = [
  { value: 'FAR', label: 'FAR', description: 'Financial Accounting & Reporting' },
  { value: 'AUD', label: 'AUD', description: 'Auditing & Attestation' },
  { value: 'REG', label: 'REG', description: 'Tax & Regulation' },
  { value: 'BAR', label: 'BAR', description: 'Business Analysis & Reporting' },
  { value: 'ISC', label: 'ISC', description: 'Information Systems & Controls' },
  { value: 'TCP', label: 'TCP', description: 'Tax Compliance & Planning' },
];

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

// ============================================================================
// SAMPLE SMS PREVIEW
// ============================================================================

const SampleQuestion = () => (
  <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white font-mono text-sm leading-relaxed max-w-sm mx-auto shadow-2xl">
    <div className="flex items-center gap-2 mb-3 text-slate-400 text-xs">
      <MessageSquare className="w-4 h-4" />
      <span>VoraPrep Daily CPA</span>
    </div>
    <div className="space-y-3">
      <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-3">
        <p className="text-blue-300 text-xs font-semibold mb-1">VoraPrep Daily CPA — AUD</p>
        <p className="text-slate-300 text-xs mb-2">Day 1 of 3 free trial</p>
        <p className="text-slate-400 text-xs mb-2">Topic: Audit Evidence</p>
        <p className="text-white text-sm mb-3">Which provides the MOST reliable audit evidence?</p>
        <div className="space-y-1 text-slate-300 text-xs">
          <p>A) Oral representation from management</p>
          <p>B) Internally generated sales report</p>
          <p>C) Bank confirmation received directly by auditor</p>
          <p>D) Vendor invoice provided by the client</p>
        </div>
        <p className="text-slate-400 text-xs mt-3">Reply A, B, C, or D</p>
      </div>
      <div className="flex justify-end">
        <div className="bg-blue-600 rounded-xl rounded-br-sm px-3 py-2 text-xs">
          C
        </div>
      </div>
      <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-3">
        <p className="text-green-400 text-sm font-semibold">✅ Correct! Answer: C</p>
        <p className="text-slate-300 text-xs mt-2">Bank confirmations sent directly to the auditor are the most reliable — external source, no client involvement.</p>
        <p className="text-slate-400 text-xs mt-2">Reply NEXT for Q4/5</p>
      </div>
    </div>
  </div>
);

// ============================================================================
// HOW IT WORKS
// ============================================================================

const steps = [
  {
    icon: Smartphone,
    title: 'Pick your CPA section',
    description: 'Choose AUD, FAR, REG, BAR, ISC, or TCP. One section, total focus.',
  },
  {
    icon: Zap,
    title: 'Get your first question now',
    description: 'Q1 arrives within seconds of signup. Tomorrow onward, questions land at the time you choose.',
  },
  {
    icon: Brain,
    title: 'Answer & learn instantly',
    description: 'Reply A/B/C/D. Get the right answer with a clear explanation. Reply NEXT when you\'re ready for the next one.',
  },
  {
    icon: TrendingUp,
    title: 'Get smarter every day',
    description: 'Questions adapt to your weak areas. Missed concepts come back at the right time.',
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

const DailyCPA = () => {
  const [form, setForm] = useState<SignupFormData>({
    phone: '',
    section: '',
    tier: 'core',
    sendTime: '07:00',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
    email: '',
    smsConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: 'Daily CPA Questions by Text — VoraPrep',
    description: 'Get daily CPA exam practice questions sent to your phone. 5-minute study sessions via SMS. Choose your section, build a streak, pass your exam.',
    canonicalUrl: 'https://voraprep.com/daily-cpa',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.section) {
      setError('Please select a CPA section.');
      return;
    }
    if (!form.phone || !/^\+?1?\d{10,11}$/.test(form.phone.replace(/[\s()-]/g, ''))) {
      setError('Please enter a valid US phone number.');
      return;
    }
    if (!form.smsConsent) {
      setError('Please agree to receive SMS messages to continue.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Format phone to E.164
      const cleanPhone = form.phone.replace(/[\s()\-+]/g, '');
      const e164 = cleanPhone.startsWith('1') ? `+${cleanPhone}` : `+1${cleanPhone}`;

      // Call the Cloud Function
      const { httpsCallable } = await import('firebase/functions');
      const { functions } = await import('../../../config/firebase');
      const fn = httpsCallable(functions, 'dailyCpa_signup');

      await fn({
        phone: e164,
        section: form.section,
        sendTime: form.sendTime,
        timezone: form.timezone,
        email: form.email || undefined,
      });

      setIsSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">You're In!</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
            Your 3-day free trial for <span className="font-semibold text-blue-600">{form.section}</span> starts now.
          </p>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Check your phone — your first question is on its way. Reply A/B/C/D to answer, NEXT to advance.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-left text-sm space-y-2 mb-8">
            <p className="text-slate-600 dark:text-slate-300"><span className="font-medium">Section:</span> {form.section}</p>
            <p className="text-slate-600 dark:text-slate-300"><span className="font-medium">Trial:</span> 3 days · 5 questions/day · no credit card</p>
            <p className="text-slate-600 dark:text-slate-300"><span className="font-medium">Daily start:</span> {form.sendTime} (after day 1)</p>
          </div>
          <Link
            to="/cpa"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            ← Explore full VoraPrep CPA prep
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/">
              <img src="/logo.svg" alt="VoraPrep" width="120" height="40" className="h-8 sm:h-10 dark:hidden" />
              <img src="/logo-white.svg" alt="VoraPrep" width="120" height="40" className="h-8 sm:h-10 hidden dark:block" />
            </Link>
            <span className="text-blue-600 font-bold text-lg hidden sm:inline">Daily CPA</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#faq" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">FAQ</a>
            <Link to="/cpa" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Full CPA Prep →</Link>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#signup"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Free Trial
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="px-4 py-4 space-y-1">
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium">How It Works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium">FAQ</a>
              <Link to="/cpa" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-medium">Full CPA Prep →</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MessageSquare className="w-4 h-4" />
                Daily CPA Questions by Text
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                Pass the CPA{' '}
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  5 minutes a day
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Get CPA practice questions sent to your phone every morning. Answer by text, get instant feedback, and build exam readiness in microbursts.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href="#signup"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Start 3-Day Free Trial
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-3.5 rounded-xl font-semibold text-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  See How It Works
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-green-500" />
                  No credit card
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  First question in seconds
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-blue-500" />
                  Cancel by text
                </div>
              </div>
            </div>

            {/* Right: Phone mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Phone frame */}
                <div className="bg-slate-800 rounded-[2.5rem] p-3 shadow-2xl">
                  <div className="bg-slate-900 rounded-[2rem] overflow-hidden w-[300px] sm:w-[340px]">
                    {/* Status bar */}
                    <div className="bg-slate-800 px-6 py-2 flex justify-between items-center text-white text-xs">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2.5 border border-white rounded-sm"><div className="bg-green-400 h-full w-3/4 rounded-sm" /></div>
                      </div>
                    </div>
                    <div className="p-3">
                      <SampleQuestion />
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-bounce">
                  🔥 8-day streak
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">9,150+</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">CPA MCQs</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">6</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">CPA Sections</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">5 min</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Per Session</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">$4.99<span className="text-base font-medium text-slate-500">/mo</span></p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Starting Price</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              No app to open. No login required. Just text messages and instant learning.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Step {i + 1}</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Daily Questions Work */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Daily Microbursts Work</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Research shows spaced repetition and daily practice outperform marathon cramming.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <Target className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Spaced Repetition</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Missed questions come back at the right intervals — 1, 3, and 7 days later — so concepts stick long-term.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <Brain className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Adaptive Difficulty</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Questions get harder as you improve. If you're struggling, we ease up. Your practice always matches your level.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <TrendingUp className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Weak-Area Targeting</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                We track your accuracy by blueprint area and prioritize the topics where you need the most work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Simple Pricing</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              3-day free trial on every plan. 5 questions/day during trial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {TIERS.map(tier => (
              <div
                key={tier.id}
                className={clsx(
                  'relative rounded-2xl border-2 p-6 transition-all duration-200',
                  tier.popular
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 shadow-xl scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{tier.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">${tier.price}</span>
                  <span className="text-slate-500 dark:text-slate-400">/mo</span>
                </div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-6">
                  Up to {tier.daily} questions/day
                </p>
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#signup"
                  onClick={() => setForm(prev => ({ ...prev, tier: tier.id }))}
                  className={clsx(
                    'block text-center px-4 py-2.5 rounded-xl font-semibold text-sm transition-all',
                    tier.popular
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                  )}
                >
                  Start Free Trial
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
            All plans include a 3-day free trial with 5 questions/day. No credit card to start — only choose a plan if you keep going.
          </p>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup" className="bg-slate-50 dark:bg-slate-900/50 py-16 sm:py-24 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Start Your Free Trial</h2>
            <p className="text-slate-600 dark:text-slate-300">
              3 days free · 5 questions/day · No credit card required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-lg space-y-5">
            {/* Section Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                CPA Section *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SECTIONS.map(s => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, section: s.value }))}
                    className={clsx(
                      'px-3 py-3 rounded-xl border-2 text-center transition-all',
                      form.section === s.value
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300'
                    )}
                  >
                    <span className="block text-lg font-bold">{s.value}</span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{s.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={form.phone}
                onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
                autoComplete="tel"
              />
            </div>

            {/* Email (optional) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email <span className="text-slate-400">(optional, for account recovery)</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                autoComplete="email"
              />
            </div>

            {/* Send Time */}
            <div>
              <label htmlFor="sendTime" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Daily Start Time
              </label>
              <select
                id="sendTime"
                value={form.sendTime}
                onChange={e => setForm(prev => ({ ...prev, sendTime: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="06:00">6:00 AM</option>
                <option value="06:30">6:30 AM</option>
                <option value="07:00">7:00 AM</option>
                <option value="07:30">7:30 AM</option>
                <option value="08:00">8:00 AM</option>
                <option value="08:30">8:30 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="12:00">12:00 PM</option>
              </select>
            </div>

            {/* Pricing reference — informational only, no selection required.
                Trial is no-credit-card; users pick a plan post-trial via the upgrade page. */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                After your free trial
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TIERS.map(tier => (
                  <div
                    key={tier.id}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30 text-center"
                  >
                    <span className="block text-sm font-bold text-slate-900 dark:text-white">
                      ${tier.price}<span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">/mo</span>
                    </span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400">{tier.daily} questions/day</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                No credit card required to start. Choose a plan only if you keep going after day 3.
              </p>
            </div>

            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            {/* SMS Consent Checkbox — required for Telnyx 10DLC compliance */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.smsConsent}
                onChange={e => setForm(prev => ({ ...prev, smsConsent: e.target.checked }))}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0"
                required
              />
              <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                I agree to receive recurring automated SMS messages from VoraPrep at the number above.
                Message frequency varies. Msg &amp; data rates may apply. Reply{' '}
                <strong>STOP</strong> to cancel, <strong>HELP</strong> for help.{' '}
                <Link to="/terms" className="underline hover:text-slate-700 dark:hover:text-slate-200">Terms</Link>{' '}·{' '}
                <Link to="/privacy" className="underline hover:text-slate-700 dark:hover:text-slate-200">Privacy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting || !form.smsConsent}
              className={clsx(
                'w-full py-3.5 rounded-xl font-semibold text-lg transition-all duration-300',
                isSubmitting || !form.smsConsent
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl hover:-translate-y-0.5'
              )}
            >
              {isSubmitting ? 'Setting up...' : 'Start 3-Day Free Trial'}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: 'How does the 3-day free trial work?',
                a: 'Sign up, pick your CPA section, and receive up to 5 questions per day for 3 days — completely free. No credit card required. After the trial, choose your plan to continue.',
              },
              {
                q: 'What phone numbers are supported?',
                a: 'Currently US phone numbers only (+1). We plan to expand to international numbers in the future.',
              },
              {
                q: 'Can I change my CPA section later?',
                a: 'Yes. Contact support@voraprep.com and we can switch your section. Your streak and progress reset when you switch.',
              },
              {
                q: 'How do I cancel?',
                a: 'Reply STOP to any message to stop SMS immediately. If you\'re on a paid plan, email support@voraprep.com to end billing — no calls, no retention offers.',
              },
              {
                q: 'How are questions selected?',
                a: 'Our engine uses spaced repetition (missed questions return at optimal intervals), weak-area targeting (more practice where you need it), and adaptive difficulty (questions match your level).',
              },
              {
                q: 'Is this different from the full VoraPrep app?',
                a: 'Yes. Daily CPA is a standalone SMS service for quick daily practice. The full VoraPrep app includes simulations, study plans, lessons, analytics, and 9,150+ questions across all formats. Daily CPA users can upgrade to full VoraPrep anytime.',
              },
              {
                q: 'What time do questions arrive?',
                a: 'You choose your daily start time during signup (6 AM to 12 PM). Questions arrive one at a time — answer one, get the next.',
              },
            ].map((item, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  {item.q}
                  <ChevronDown className={clsx('w-5 h-5 text-slate-400 transition-transform shrink-0 ml-2', openFaq === i && 'rotate-180')} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Start building exam readiness today
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
            5 minutes a day. One CPA section. Instant feedback. No app required.
          </p>
          <a
            href="#signup"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-xl"
          >
            Start 3-Day Free Trial
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo-white.svg" alt="VoraPrep" className="h-6" />
            <span className="text-sm">Daily CPA</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/cpa" className="hover:text-white transition-colors">Full CPA Prep</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <a href="mailto:support@voraprep.com" className="hover:text-white transition-colors">Support</a>
          </div>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} VoraPrep. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DailyCPA;

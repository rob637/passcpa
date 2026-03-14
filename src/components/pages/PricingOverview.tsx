import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { useBreadcrumbs } from '../../hooks/useStructuredData';
import {
  CheckCircle,
  X,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  BookOpen,
  Brain,
  Users,
  Star,
} from 'lucide-react';
import { COURSE_DISPLAY_STATS, COURSE_STATS } from '../../config/contentStats';

// ============================================================================
// Pricing Data for All Exams
// ============================================================================

interface ExamPricing {
  id: string;
  name: string;
  fullName: string;
  path: string;
  color: string;
  bgGradient: string;
  monthlyPrice: number;
  yearlyPrice: number;
  founderPrice: number;
  questionCount: string;
  lessonCount: number;
  flashcardCount: number;
}

const EXAM_PRICING: ExamPricing[] = [
  {
    id: 'cpa',
    name: 'CPA',
    fullName: 'Certified Public Accountant',
    path: '/cpa',
    color: 'text-blue-600',
    bgGradient: 'from-blue-500 to-blue-600',
    monthlyPrice: 29,
    yearlyPrice: 249,
    founderPrice: 249,
    questionCount: COURSE_DISPLAY_STATS.cpa.questions,
    lessonCount: COURSE_STATS.cpa.lessons,
    flashcardCount: COURSE_STATS.cpa.flashcards,
  },
  {
    id: 'ea',
    name: 'EA',
    fullName: 'Enrolled Agent',
    path: '/ea-prep',
    color: 'text-emerald-600',
    bgGradient: 'from-emerald-500 to-emerald-600',
    monthlyPrice: 29,
    yearlyPrice: 149,
    founderPrice: 149,
    questionCount: COURSE_DISPLAY_STATS.ea.questions,
    lessonCount: COURSE_STATS.ea.lessons,
    flashcardCount: COURSE_STATS.ea.flashcards,
  },
  {
    id: 'cma',
    name: 'CMA',
    fullName: 'Certified Management Accountant',
    path: '/cma',
    color: 'text-purple-600',
    bgGradient: 'from-purple-500 to-purple-600',
    monthlyPrice: 29,
    yearlyPrice: 199,
    founderPrice: 199,
    questionCount: COURSE_DISPLAY_STATS.cma.questions,
    lessonCount: COURSE_STATS.cma.lessons,
    flashcardCount: COURSE_STATS.cma.flashcards,
  },
  {
    id: 'cia',
    name: 'CIA',
    fullName: 'Certified Internal Auditor',
    path: '/cia',
    color: 'text-amber-600',
    bgGradient: 'from-amber-500 to-amber-600',
    monthlyPrice: 29,
    yearlyPrice: 199,
    founderPrice: 199,
    questionCount: COURSE_DISPLAY_STATS.cia.questions,
    lessonCount: COURSE_STATS.cia.lessons,
    flashcardCount: COURSE_STATS.cia.flashcards,
  },
  {
    id: 'cfp',
    name: 'CFP',
    fullName: 'Certified Financial Planner',
    path: '/cfp',
    color: 'text-green-600',
    bgGradient: 'from-green-500 to-green-600',
    monthlyPrice: 29,
    yearlyPrice: 199,
    founderPrice: 199,
    questionCount: COURSE_DISPLAY_STATS.cfp.questions,
    lessonCount: COURSE_STATS.cfp.lessons,
    flashcardCount: COURSE_STATS.cfp.flashcards,
  },
  {
    id: 'cisa',
    name: 'CISA',
    fullName: 'Certified Information Systems Auditor',
    path: '/cisa',
    color: 'text-indigo-600',
    bgGradient: 'from-indigo-500 to-indigo-600',
    monthlyPrice: 29,
    yearlyPrice: 199,
    founderPrice: 199,
    questionCount: COURSE_DISPLAY_STATS.cisa.questions,
    lessonCount: COURSE_STATS.cisa.lessons,
    flashcardCount: COURSE_STATS.cisa.flashcards,
  },
];

// ============================================================================
// What's Included
// ============================================================================

const FEATURES = [
  { icon: BookOpen, label: 'Unlimited practice questions', included: true },
  { icon: Brain, label: 'AI-powered adaptive learning', included: true },
  { icon: Sparkles, label: 'AI tutor (24/7 help)', included: true },
  { icon: Clock, label: 'Exam simulators (AICPA format)', included: true },
  { icon: Users, label: 'Detailed explanations', included: true },
  { icon: Shield, label: 'Pass guarantee', included: true },
  { icon: Star, label: 'Flashcards & spaced repetition', included: true },
];

// ============================================================================
// Component
// ============================================================================

const PricingOverview = () => {
  useSEO({
    title: 'Pricing | VoraPrep - CPA, EA, CMA, CIA, CFP, CISA Exam Prep',
    description: 'VoraPrep pricing for all professional certification exams. CPA, EA, CMA, CIA, CFP, CISA prep starting at $29/month or $149/year. 97% more affordable than competitors.',
    canonicalUrl: 'https://voraprep.com/pricing',
    ogType: 'website',
  });

  useBreadcrumbs([
    { name: 'Home', url: 'https://voraprep.com/' },
    { name: 'Pricing', url: 'https://voraprep.com/pricing' },
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Founder pricing — limited time
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto">
            Professional exam prep that's <strong className="text-white">97% more affordable</strong> than traditional courses.
            No hidden fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your Exam
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            All plans include the full VoraPrep experience with AI tutor, adaptive learning, and pass guarantee.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAM_PRICING.map((exam) => (
            <div
              key={exam.id}
              className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-shadow"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${exam.bgGradient} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{exam.name}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{exam.name} Exam Prep</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{exam.fullName}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    ${exam.monthlyPrice}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">/month</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  or <strong className="text-emerald-600">${exam.yearlyPrice}/year</strong> (save {Math.round((1 - exam.yearlyPrice / (exam.monthlyPrice * 12)) * 100)}%)
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{exam.questionCount}</div>
                  <div className="text-xs text-slate-500">Questions</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{exam.lessonCount}+</div>
                  <div className="text-xs text-slate-500">Lessons</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{exam.flashcardCount}+</div>
                  <div className="text-xs text-slate-500">Flashcards</div>
                </div>
              </div>

              {/* CTA */}
              <Link
                to={`/register?course=${exam.id}`}
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r ${exam.bgGradient} text-white font-semibold hover:opacity-90 transition-opacity`}
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
                14-day free trial • No credit card required
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need to Pass
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Every plan includes our full suite of learning tools.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison with Competitors */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            VoraPrep vs. Traditional Courses
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            See why thousands of candidates choose VoraPrep.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-blue-600 dark:text-blue-400">VoraPrep</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">Others</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Annual Price (CPA)</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-emerald-600 font-bold">$249/yr</span>
                </td>
                <td className="px-6 py-4 text-center text-slate-500">$2,000 – $4,000</td>
              </tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-900/10">
                <td className="px-6 py-4 text-slate-700 dark:text-slate-300">AI Tutor (24/7)</td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-slate-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Adaptive Learning</td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                <td className="px-6 py-4 text-center text-slate-500">Basic</td>
              </tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-900/10">
                <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Free Trial</td>
                <td className="px-6 py-4 text-center text-emerald-600 font-medium">14 days (no card)</td>
                <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-slate-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Money-back Guarantee</td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                <td className="px-6 py-4 text-center text-slate-500">Limited</td>
              </tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-900/10">
                <td className="px-6 py-4 text-slate-700 dark:text-slate-300">Monthly Option</td>
                <td className="px-6 py-4 text-center text-emerald-600 font-medium">$29/mo</td>
                <td className="px-6 py-4 text-center text-slate-500">Rarely</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/compare"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            See detailed comparison by exam
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Studying?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of candidates who passed their exams with VoraPrep.
            Start your 14-day free trial today.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PricingOverview;

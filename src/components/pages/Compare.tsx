import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { useBreadcrumbs } from '../../hooks/useStructuredData';
import {
  CheckCircle,
  X,
  ArrowRight,
  Star,
  DollarSign,
  Brain,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react';

// ============================================================================
// Comparison Data
// ============================================================================

interface ComparisonRow {
  feature: string;
  voraprep: string | boolean;
  competitors: (string | boolean)[];
  highlight?: boolean;
}

interface ExamComparison {
  id: string;
  label: string;
  title: string;
  slug: string;
  competitors: string[];
  rows: ComparisonRow[];
  verdict: string;
}

const COMPARISONS: ExamComparison[] = [
  {
    id: 'cpa',
    label: 'CPA',
    title: 'CPA Exam Prep',
    slug: 'cpa',
    competitors: ['Becker', 'Roger CPA', 'Surgent'],
    rows: [
      { feature: 'Annual Price', voraprep: '$249/yr (founder)', competitors: ['$3,499', '$2,095', '$1,799'], highlight: true },
      { feature: 'Monthly Option', voraprep: '$29/mo', competitors: ['N/A', 'N/A', '$74/mo'] },
      { feature: 'Free Trial', voraprep: '14 days (no card)', competitors: ['No', 'No', 'No'], highlight: true },
      { feature: 'AI Tutor', voraprep: true, competitors: ['Extra $$$', false, 'Limited'], highlight: true },
      { feature: 'Adaptive Learning Engine', voraprep: 'Advanced AI', competitors: ['Extra $$$', false, 'Basic'], highlight: true },
      { feature: 'Spaced Repetition (SM-2)', voraprep: true, competitors: [false, false, false], highlight: true },
      { feature: 'Learning Approach', voraprep: 'Active Practice', competitors: ['Video-heavy', 'Video-heavy', 'Video-heavy'] },
      { feature: 'Task-Based Simulations', voraprep: '280+', competitors: ['200+', '175+', '150+'] },
      { feature: '2025 & 2026 Blueprint', voraprep: true, competitors: [true, true, true] },
      { feature: 'Prometric-Style Interface', voraprep: true, competitors: [true, false, false] },
      { feature: 'PWA + Mobile Access', voraprep: true, competitors: ['App', 'App', 'App'] },
      { feature: 'Pass Guarantee', voraprep: true, competitors: [true, true, true] },
    ],
    verdict: 'VoraPrep delivers AI-powered adaptive learning and an AI tutor for CPA exam prep at $249/year — while Becker charges $3,499 for a video-heavy course. If you learn best through active practice rather than watching lectures, VoraPrep is the clear choice.',
  },
  {
    id: 'ea',
    label: 'EA',
    title: 'EA Exam Prep',
    slug: 'ea-prep',
    competitors: ['Gleim', 'Passkey', 'Surgent'],
    rows: [
      { feature: 'Annual Price', voraprep: '$149/yr (founder)', competitors: ['$629', '$400', '$599'], highlight: true },
      { feature: 'Monthly Option', voraprep: '$19/mo', competitors: ['N/A', 'N/A', '$49/mo'] },
      { feature: 'Free Trial', voraprep: '14 days (no card)', competitors: ['Demo only', 'No', 'No'], highlight: true },
      { feature: 'AI Tutor', voraprep: true, competitors: [false, false, false], highlight: true },
      { feature: 'Adaptive Learning', voraprep: 'Advanced AI', competitors: ['Basic', false, 'Basic'], highlight: true },
      { feature: 'Spaced Repetition', voraprep: true, competitors: [false, false, false], highlight: true },
      { feature: 'All 3 SEE Parts', voraprep: true, competitors: [true, true, true] },
      { feature: 'Pass Guarantee', voraprep: true, competitors: [true, false, true] },
    ],
    verdict: 'For EA exam prep, VoraPrep offers AI-powered adaptive learning at $149/year vs. $400–$629 for traditional courses. With an AI tutor and spaced repetition — features no EA competitor offers — VoraPrep helps you study smarter, not just harder.',
  },
  {
    id: 'cma',
    label: 'CMA',
    title: 'CMA Exam Prep',
    slug: 'cma',
    competitors: ['Gleim', 'Hock', 'Wiley'],
    rows: [
      { feature: 'Annual Price', voraprep: '$199/yr (founder)', competitors: ['$1,599', '$1,100', '$1,500'], highlight: true },
      { feature: 'Monthly Option', voraprep: '$25/mo', competitors: ['N/A', 'N/A', 'N/A'] },
      { feature: 'Free Trial', voraprep: '14 days (no card)', competitors: ['Demo only', 'No', 'No'], highlight: true },
      { feature: 'AI Tutor', voraprep: true, competitors: [false, false, false], highlight: true },
      { feature: 'Adaptive Learning', voraprep: 'Advanced AI', competitors: ['Basic', false, false], highlight: true },
      { feature: 'Spaced Repetition', voraprep: true, competitors: [false, false, false], highlight: true },
      { feature: 'Both Parts Covered', voraprep: true, competitors: [true, true, true] },
      { feature: 'Essay/CBQ Practice', voraprep: true, competitors: [true, true, true] },
      { feature: 'Pass Guarantee', voraprep: true, competitors: [true, true, false] },
    ],
    verdict: 'VoraPrep CMA prep costs $199/year with AI-powered adaptive learning — competing courses charge $1,100–$1,599 for mostly static content. VoraPrep is the only CMA prep with an AI tutor and spaced repetition.',
  },
  {
    id: 'cia',
    label: 'CIA',
    title: 'CIA Exam Prep',
    slug: 'cia',
    competitors: ['Gleim', 'IIA Learning', 'Surgent'],
    rows: [
      { feature: 'Annual Price', voraprep: '$149/yr (founder)', competitors: ['$999', '$750', '$599'], highlight: true },
      { feature: 'Monthly Option', voraprep: '$19/mo', competitors: ['N/A', 'N/A', 'N/A'] },
      { feature: 'Free Trial', voraprep: '14 days (no card)', competitors: ['Demo only', 'No', 'No'], highlight: true },
      { feature: 'AI Tutor', voraprep: true, competitors: [false, false, false], highlight: true },
      { feature: 'Adaptive Learning', voraprep: 'Advanced AI', competitors: ['Basic', false, 'Basic'], highlight: true },
      { feature: 'All 3 Parts', voraprep: true, competitors: [true, true, true] },
      { feature: 'Pass Guarantee', voraprep: true, competitors: [true, false, true] },
    ],
    verdict: 'VoraPrep CIA prep offers AI tutoring and adaptive learning for $149/year — features that Gleim ($999) and IIA Learning ($750) don\'t provide. Study smarter with spaced repetition and a personalized study plan.',
  },
  {
    id: 'cfp',
    label: 'CFP',
    title: 'CFP Exam Prep',
    slug: 'cfp',
    competitors: ['Dalton', 'Kaplan', 'Danko'],
    rows: [
      { feature: 'Annual Price', voraprep: '$199/yr (founder)', competitors: ['$1,795', '$1,349', '$750'], highlight: true },
      { feature: 'Monthly Option', voraprep: '$25/mo', competitors: ['N/A', 'N/A', 'N/A'] },
      { feature: 'Free Trial', voraprep: '14 days (no card)', competitors: ['No', 'No', 'No'], highlight: true },
      { feature: 'AI Tutor', voraprep: true, competitors: [false, false, false], highlight: true },
      { feature: 'Adaptive Learning', voraprep: 'Advanced AI', competitors: [false, false, false], highlight: true },
      { feature: 'All 8 Domains', voraprep: true, competitors: [true, true, true] },
      { feature: 'Case Study Practice', voraprep: true, competitors: [true, true, true] },
      { feature: 'Pass Guarantee', voraprep: true, competitors: [true, 'Conditional', false] },
    ],
    verdict: 'CFP exam prep with VoraPrep costs $199/year — while Dalton charges $1,795 and Kaplan $1,349. VoraPrep is the only CFP prep course with an AI tutor and adaptive learning engine.',
  },
  {
    id: 'cisa',
    label: 'CISA',
    title: 'CISA Exam Prep',
    slug: 'cisa',
    competitors: ['ISACA Review', 'Hemang Doshi', 'Simplilearn'],
    rows: [
      { feature: 'Annual Price', voraprep: '$199/yr (founder)', competitors: ['$895', '$70', '$399'], highlight: true },
      { feature: 'Monthly Option', voraprep: '$25/mo', competitors: ['N/A', 'N/A', 'N/A'] },
      { feature: 'Free Trial', voraprep: '14 days (no card)', competitors: ['No', 'No', 'No'], highlight: true },
      { feature: 'AI Tutor', voraprep: true, competitors: [false, false, false], highlight: true },
      { feature: 'Adaptive Learning', voraprep: 'Advanced AI', competitors: [false, false, false], highlight: true },
      { feature: 'All 5 Domains', voraprep: true, competitors: [true, true, true] },
      { feature: 'Spaced Repetition', voraprep: true, competitors: [false, false, false], highlight: true },
      { feature: 'Pass Guarantee', voraprep: true, competitors: [false, false, false] },
    ],
    verdict: 'VoraPrep CISA prep offers adaptive AI learning and an AI tutor for $199/year. While ISACA\'s own review manual costs $895 with no interactive features, VoraPrep provides a fully interactive study experience with spaced repetition.',
  },
];

// ============================================================================
// Cell Renderer
// ============================================================================

const CellValue = ({ value, isVoraPrep = false }: { value: string | boolean; isVoraPrep?: boolean }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <CheckCircle className={`w-5 h-5 mx-auto ${isVoraPrep ? 'text-emerald-500' : 'text-slate-400'}`} />
    ) : (
      <X className={`w-5 h-5 mx-auto ${isVoraPrep ? 'text-red-400' : 'text-slate-300 dark:text-slate-600'}`} />
    );
  }
  return (
    <span className={isVoraPrep ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}>
      {value}
    </span>
  );
};

// ============================================================================
// Main Comparison Page
// ============================================================================

const Compare = () => {
  useSEO({
    title: 'Compare Exam Prep Courses',
    description:
      'Compare VoraPrep vs Becker, Roger, Surgent, Gleim, Wiley, and more. See pricing, features, and AI-powered tools side-by-side for CPA, EA, CMA, CIA, CFP, and CISA exam prep.',
    canonicalUrl: 'https://voraprep.com/compare',
  });

  useBreadcrumbs([
    { name: 'Home', url: 'https://voraprep.com/' },
    { name: 'Compare', url: 'https://voraprep.com/compare' },
  ]);

  const [activeExam, setActiveExam] = useState('cpa');
  const comparison = COMPARISONS.find((c) => c.id === activeExam)!;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Compare Exam Prep Courses
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            See how VoraPrep stacks up against traditional review courses — on price, features, and technology.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Key Differentiators */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: DollarSign, label: 'Up to 93% cheaper', desc: 'vs. traditional courses' },
            { icon: Brain, label: 'AI Adaptive Engine', desc: 'No competitor has this' },
            { icon: Sparkles, label: 'AI Tutor Included', desc: 'Others charge extra or don\'t offer' },
            { icon: Shield, label: '14-Day Free Trial', desc: 'No credit card required' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-4">
              <Icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">{label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Exam Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {COMPARISONS.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveExam(comp.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeExam === comp.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {comp.label}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {comparison.title}: VoraPrep vs {comparison.competitors.join(' vs ')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Feature-by-feature comparison • Prices as of 2026
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400 w-1/4">Feature</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-blue-600 dark:text-blue-400 w-1/4">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4" /> VoraPrep
                    </div>
                  </th>
                  {comparison.competitors.map((name) => (
                    <th key={name} className="text-center py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-slate-100 dark:border-slate-800 ${
                      row.highlight ? 'bg-blue-50/50 dark:bg-blue-950/10' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-center text-sm">
                      <CellValue value={row.voraprep} isVoraPrep />
                    </td>
                    {row.competitors.map((val, j) => (
                      <td key={j} className="py-3 px-4 text-center text-sm">
                        <CellValue value={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400 mt-3">
            *Founding member pricing — available to the first 300 subscribers per exam. Locked for as long as subscription is active. Competitor prices reflect standard annual rates as of February 2026.
          </p>
        </div>

        {/* Verdict */}
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-10">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            The Verdict
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {comparison.verdict}
          </p>
        </div>

        {/* Why VoraPrep Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Why Students Switch to VoraPrep
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Learn by Doing, Not Watching',
                desc: 'Traditional courses rely on 100+ hours of video lectures. VoraPrep uses active practice with immediate feedback — proven to be 2x more effective for retention than passive video watching.',
              },
              {
                title: 'AI That Knows Your Weak Spots',
                desc: 'Our adaptive engine analyzes every answer you give and builds a personalized study plan that focuses on what you don\'t know yet. No more wasting time on topics you\'ve already mastered.',
              },
              {
                title: 'Affordable Enough to Start Now',
                desc: 'Many candidates delay studying because of the $2,000+ cost of traditional courses. With VoraPrep starting at $19/month, you can start studying today without financial stress.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to see the difference?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Try VoraPrep free for 14 days. Full access, no credit card. See why students are switching from {comparison.competitors[0]}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={`/register?course=${comparison.id}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={`/${comparison.slug}`}
              className="inline-flex items-center justify-center gap-2 bg-blue-500/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-500/30 transition-colors border border-blue-400/30"
            >
              Learn More About {comparison.label} Prep
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-8 max-w-2xl mx-auto">
          VoraPrep is an independent educational platform. All product names, logos, and trademarks mentioned on this page are the property of their respective owners. VoraPrep is not affiliated with, endorsed by, or sponsored by any of the companies listed above. Pricing information is based on publicly available data as of February 2026 and may change.
        </p>
      </div>
    </div>
  );
};

export default Compare;

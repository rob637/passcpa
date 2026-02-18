import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { useOrganizationSchema } from '../../hooks/useStructuredData';
import { useBreadcrumbs } from '../../hooks/useStructuredData';
import { getFormattedTotal, getTotalLessons, getTotalFlashcards } from '../../utils/courseStats';
import {
  BookOpen,
  Brain,
  Target,
  Shield,
  Users,
  Sparkles,
  GraduationCap,
  Heart,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const SUPPORTED_EXAMS = [
  { id: 'cpa', name: 'CPA', fullName: 'Certified Public Accountant', path: '/cpa', color: 'bg-blue-500' },
  { id: 'ea', name: 'EA', fullName: 'Enrolled Agent', path: '/ea-prep', color: 'bg-emerald-500' },
  { id: 'cma', name: 'CMA', fullName: 'Certified Management Accountant', path: '/cma', color: 'bg-purple-500' },
  { id: 'cia', name: 'CIA', fullName: 'Certified Internal Auditor', path: '/cia', color: 'bg-amber-500' },
  { id: 'cfp', name: 'CFP', fullName: 'Certified Financial Planner', path: '/cfp', color: 'bg-green-500' },
  { id: 'cisa', name: 'CISA', fullName: 'Certified Information Systems Auditor', path: '/cisa', color: 'bg-indigo-500' },
];

const About = () => {
  useSEO({
    title: 'About VoraPrep',
    description: 'VoraPrep is an AI-powered exam prep platform for professional certifications. Learn about our mission, technology, and how we help thousands of candidates pass CPA, EA, CMA, CIA, CFP, and CISA exams.',
    canonicalUrl: 'https://voraprep.com/about',
  });
  useOrganizationSchema();
  useBreadcrumbs([
    { name: 'Home', url: 'https://voraprep.com/' },
    { name: 'About', url: 'https://voraprep.com/about' },
  ]);

  const totalQuestions = getFormattedTotal();
  const totalLessons = getTotalLessons();
  const totalFlashcards = getTotalFlashcards();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            About VoraPrep
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            AI-powered exam prep that makes professional certification accessible to everyone.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Professional certification exams like the CPA, EA, and CMA are gateways to better careers — but traditional prep courses cost $2,000–$4,000 and haven't evolved in decades.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              VoraPrep was built to change that. We use adaptive learning, spaced repetition, and AI to deliver a prep experience that's <strong className="text-slate-900 dark:text-white">more effective and 97% more affordable</strong> than legacy providers.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Every working professional deserves access to high-quality exam prep — regardless of budget.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalQuestions}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Practice Questions</div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{totalLessons.toLocaleString()}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Lessons</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalFlashcards.toLocaleString()}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Flashcards</div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">6</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Certifications</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-4">
            How VoraPrep Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Our platform adapts to your strengths and weaknesses to create a personalized study plan.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Brain, title: 'Adaptive Learning', desc: 'Our engine identifies weak areas and focuses your study time where it matters most.' },
              { icon: Target, title: 'Spaced Repetition', desc: 'SM-2 algorithm schedules reviews at optimal intervals so you retain more with less effort.' },
              { icon: Sparkles, title: 'AI Tutor', desc: 'Ask questions, get explanations, and work through problems with our Gemini-powered AI tutor.' },
              { icon: BookOpen, title: 'Full Coverage', desc: 'Questions, lessons, flashcards, and simulated exams aligned to current exam blueprints.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">
          What Sets Us Apart
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: 'Pass Guarantee',
              desc: 'Complete our study plan and don\'t pass? Get a full refund or extended access — no fine print.',
            },
            {
              icon: Heart,
              title: '14-Day Free Trial',
              desc: 'Full access to every feature. No credit card required. See the difference before you commit.',
            },
            {
              icon: GraduationCap,
              title: 'Blueprint Aligned',
              desc: 'Content is mapped to the latest exam blueprints (2025 & 2026) and updated as requirements change.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Exams */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-4">
            6 Professional Certifications
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            One platform, every major accounting and finance certification.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUPPORTED_EXAMS.map((exam) => (
              <Link
                key={exam.id}
                to={exam.path}
                className="flex items-center gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all group"
              >
                <div className={`w-10 h-10 ${exam.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{exam.name}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 dark:text-white">{exam.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 truncate">{exam.fullName}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">
          Our Values
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { title: 'Accessibility', desc: 'High-quality exam prep should be affordable for everyone, not just those with $3,000+ to spare.' },
            { title: 'Transparency', desc: 'No hidden fees, no auto-renewing gotchas. Free trial means free — no credit card required.' },
            { title: 'Evidence-Based', desc: 'Every feature is grounded in learning science: spaced repetition, active recall, and interleaving.' },
            { title: 'Always Current', desc: 'Exam blueprints change. Our content is continuously updated to match the latest requirements.' },
          ].map(({ title, desc }) => (
            <div key={title} className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-12 h-12 text-blue-200 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Studying?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join VoraPrep and get full access to {totalQuestions} questions, {totalLessons.toLocaleString()} lessons, and an AI tutor — free for 14 days.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;

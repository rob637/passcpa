import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Check,
  Shield,
  Eye,
  Globe,
  Scale,
  Brain,
  Target,
  Zap,
} from 'lucide-react';
import { useSEO, LANDING_SEO } from '../../hooks/useSEO';

const CIALanding = () => {
  const [isVisible, setIsVisible] = useState(false);

  useSEO({
    title: LANDING_SEO.cia.title,
    description: LANDING_SEO.cia.description,
    canonicalUrl: 'https://voraprep.com/cia',
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // CIA Exam parts info
  const ciaParts = [
    {
      part: 'Part 1',
      title: 'Essentials of Internal Auditing',
      topics: ['Foundations of Internal Auditing', 'Independence & Objectivity', 'Proficiency & Due Care', 'Quality Assurance', 'Governance & Risk', 'Fraud Risks'],
      questions: '125 MCQs',
      time: '2.5 hours',
      color: 'amber',
    },
    {
      part: 'Part 2',
      title: 'Practice of Internal Auditing',
      topics: ['Managing the Internal Audit Activity', 'Planning the Engagement', 'Performing the Engagement', 'Communicating Results', 'Monitoring Progress'],
      questions: '100 MCQs',
      time: '2 hours',
      color: 'orange',
    },
    {
      part: 'Part 3',
      title: 'Business Knowledge for Internal Auditing',
      topics: ['Business Acumen', 'Information Security', 'Information Technology', 'Financial Management'],
      questions: '100 MCQs',
      time: '2 hours',
      color: 'yellow',
    },
  ];

  // Why CIA section
  const whyCIA = [
    {
      icon: Globe,
      title: 'Global Recognition',
      description: 'The only globally recognized internal audit certification. Valued in 190+ countries.',
    },
    {
      icon: Shield,
      title: 'Risk & Governance',
      description: 'Master risk assessment, governance, and internal controls.',
    },
    {
      icon: Eye,
      title: 'Career Growth',
      description: 'CIAs earn 40% more than non-certified internal auditors.',
    },
    {
      icon: Scale,
      title: 'Ethics & Integrity',
      description: 'Uphold the highest standards of professional ethics and objectivity.',
    },
  ];

  // Why VoraPrep features
  const whyVoraPrep = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Vory adapts to your learning style and identifies weak areas in real-time.',
    },
    {
      icon: Target,
      title: 'Adaptive Practice',
      description: 'Questions get harder as you improve. Focus on topics where you struggle most.',
    },
    {
      icon: Zap,
      title: 'Spaced Repetition',
      description: 'SM-2 algorithm ensures you review concepts at the perfect moment.',
    },
    {
      icon: Shield,
      title: 'Exam-Day Ready',
      description: 'IIA-style interface so nothing surprises you on test day.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src="/logo.svg" alt="VoraPrep" className="h-10 dark:hidden" />
              <img src="/logo-white.svg" alt="VoraPrep" className="h-10 hidden dark:block" />
            </Link>
            <span className="text-amber-600 font-bold text-lg">CIA</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/login?course=cia" className="hidden md:block text-slate-600 dark:text-slate-300 hover:text-amber-600 px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-amber-600/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-6 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
          
          {/* Floating orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className={`max-w-7xl mx-auto relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Beta Badge */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/25">
                <Sparkles className="w-4 h-4" />
                FREE BETA — Full Access, No Credit Card
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-4 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                Become a
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Certified Internal Auditor
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
              The <span className="font-semibold text-amber-600">only globally recognized internal audit certification</span>.
              <br className="hidden md:block" />
              AI-powered prep for all 3 CIA exam parts — 100% free during beta.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link 
                to="/register" 
                className="group bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl text-base font-bold hover:shadow-2xl hover:shadow-amber-600/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start Studying Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/" 
                className="group border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl text-base font-bold hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View All Certifications
              </Link>
            </div>

            {/* No Credit Card Emphasis */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span>Full access during beta</span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-500" />
                1,100+ Practice Questions
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-500" />
                AI-Powered Adaptive Learning
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-500" />
                All 3 CIA Parts Covered
              </div>
            </div>
          </div>
        </section>

        {/* Why VoraPrep Section */}
        <section className="py-10 md:py-16 px-6 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Why Study with VoraPrep?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Modern AI-powered learning designed for CIA exam success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyVoraPrep.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Exam Parts Section */}
        <section className="py-10 md:py-16 px-6 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                The CIA Exam
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Three parts covering internal audit essentials, practice, and business knowledge.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {ciaParts.map((part, idx) => (
                <div key={idx} className={`bg-gradient-to-br from-${part.color}-50 to-white dark:from-${part.color}-900/20 dark:to-slate-900 border border-${part.color}-200 dark:border-${part.color}-800/50 rounded-2xl p-6`}>
                  <div className={`inline-flex items-center gap-2 bg-${part.color}-100 dark:bg-${part.color}-900/50 text-${part.color}-700 dark:text-${part.color}-300 px-3 py-1 rounded-full text-sm font-semibold mb-3`}>
                    {part.part}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{part.title}</h3>
                  <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span>{part.questions}</span>
                    <span>•</span>
                    <span>{part.time}</span>
                  </div>
                  <ul className="space-y-2">
                    {part.topics.slice(0, 4).map((topic, tidx) => (
                      <li key={tidx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle className={`w-4 h-4 text-${part.color}-500`} />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why CIA Section */}
        <section className="py-10 md:py-16 px-6 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Why Become a CIA?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyCIA.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-16 px-6 bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Become a CIA?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of candidates using VoraPrep. 100% free during beta!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="group bg-white text-amber-700 px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start Free Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/" 
                className="border-2 border-white/50 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all duration-300"
              >
                View All Certifications
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <img src="/logo-white.svg" alt="VoraPrep" className="h-8" />
            <div className="flex gap-6 text-sm text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">All Certifications</Link>
              <Link to="/cpa" className="hover:text-white transition-colors">CPA Prep</Link>
              <Link to="/ea-prep" className="hover:text-white transition-colors">EA Prep</Link>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} VoraPrep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CIALanding;

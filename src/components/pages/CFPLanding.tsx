import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  Sparkles,
  Check,
  TrendingUp,
  Target,
  Users,
  Briefcase,
  Brain,
  Zap,
  Shield,
} from 'lucide-react';

const CFPLanding = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // CFP Exam info
  const cfpDomains = [
    {
      title: 'Professional Conduct & Regulation',
      weight: '8%',
      topics: ['Code of Ethics', 'Standards of Conduct', 'Fiduciary Duty'],
      color: 'green',
    },
    {
      title: 'General Financial Planning',
      weight: '15%',
      topics: ['Financial Statements', 'Cash Flow', 'Debt Management', 'Education Planning'],
      color: 'emerald',
    },
    {
      title: 'Risk Management & Insurance',
      weight: '11%',
      topics: ['Life Insurance', 'Disability', 'Health Insurance', 'Property & Casualty'],
      color: 'teal',
    },
    {
      title: 'Investment Planning',
      weight: '17%',
      topics: ['Asset Allocation', 'Security Analysis', 'Portfolio Management', 'Tax Implications'],
      color: 'cyan',
    },
    {
      title: 'Tax Planning',
      weight: '14%',
      topics: ['Income Tax', 'Tax Reduction', 'AMT', 'Charitable Giving'],
      color: 'sky',
    },
    {
      title: 'Retirement & Income Planning',
      weight: '18%',
      topics: ['Social Security', 'Medicare', 'Qualified Plans', 'Distribution Strategies'],
      color: 'blue',
    },
     {
      title: 'Estate Planning',
      weight: '10%',
      topics: ['Wills & Trusts', 'Power of Attorney', 'Gift Tax', 'Estate Transfer'],
      color: 'indigo',
    },
    {
      title: 'Psychology of Financial Planning',
      weight: '7%',
      topics: ['Client Counseling', 'Behavioral Finance', 'Communication'],
      color: 'violet',
    },
  ];

  // Why CFP section
  const whyCFP = [
    {
      icon: Users,
      title: 'Client Trust',
      description: 'The standard for financial planning. Be the trusted advisor clients rely on.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'High demand for holistic planners as the population ages and wealth transfers.',
    },
    {
      icon: Target,
      title: 'Fiduciary Standard',
      description: 'Operate at the highest ethical level, always putting client interests first.',
    },
    {
      icon: Briefcase,
      title: 'Income Potential',
      description: 'CFP professionals earn significantly more than non-certified advisors.',
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
      description: 'CFP Board-style interface so nothing surprises you on test day.',
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
            <span className="text-green-600 font-bold text-lg">CFP®</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/login?course=cfp" className="hidden md:block text-slate-600 dark:text-slate-300 hover:text-green-600 px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-green-600/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative pb-12 md:pb-16 px-6 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
          
          {/* Floating orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className={`max-w-7xl mx-auto relative transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Beta Badge */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/25">
                <Sparkles className="w-4 h-4" />
                FREE BETA — Full Access, No Credit Card
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight text-center">
              Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">CFP® Exam</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed text-center">
              The premier resource for the Certified Financial Planner™ exam. 
              All 8 principal knowledge domains — 100% free during beta.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link 
                to="/register" 
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl text-base font-bold hover:shadow-2xl hover:shadow-green-600/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start Studying Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/" 
                className="group border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl text-base font-bold hover:border-green-600 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 flex items-center justify-center gap-2"
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
                <Check className="w-4 h-4 text-green-500" />
                2,000+ Practice Questions
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                AI-Powered Adaptive Learning
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                All 8 CFP Domains Covered
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
                Modern AI-powered learning designed for CFP exam success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyVoraPrep.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
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

        {/* Exam Domains */}
        <section className="py-10 md:py-16 px-6 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Complete Domain <span className="text-green-600">Mastery</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Our comprehensive study plan covers all 8 Principal Knowledge Domains tested on the CFP® exam.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cfpDomains.map((domain, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-green-900/5 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-${domain.color}-600 font-bold text-lg`}>{domain.weight}</span>
                    <div className={`w-2 h-2 rounded-full bg-${domain.color}-500`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 min-h-[56px]">{domain.title}</h3>
                  <ul className="space-y-2">
                    {domain.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Check className={`w-4 h-4 text-${domain.color}-500 shrink-0 mt-0.5`} />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why CFP Section */}
        <section className="py-10 md:py-16 px-6 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Why Become a CFP®?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyCFP.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
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
        <section className="py-10 md:py-16 px-6 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Become a CFP®?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of candidates using VoraPrep. 100% free during beta!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="group bg-white text-green-700 px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
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

export default CFPLanding;

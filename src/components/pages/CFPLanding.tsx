import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Check,
  TrendingUp,
  Target,
  Users,
  Briefcase,
} from 'lucide-react';

const CFPLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to Firebase
    setSubmitted(true);
    setEmail('');
  };

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
            <Link to="/login" className="hidden md:block text-slate-600 dark:text-slate-300 hover:text-green-600 px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-green-600/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              All Courses
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 text-green-600 dark:text-green-300 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Coming 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">CFP® Exam</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The premier resource for the Certified Financial Planner™ exam. 
              Comprehensive coverage of the 8 principal knowledge domains with adaptive AI learning.
            </p>

            {/* Email Capture */}
            <div className="max-w-md mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative">
                {submitted ? (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-4 flex items-center gap-3 border border-green-200 dark:border-green-800">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-900 dark:text-white">You're on the list!</p>
                      <p className="text-sm text-slate-500">We'll notify you when early access opens.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlist} className="relative flex items-center">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email for early access..."
                      className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-xl py-4 pl-5 pr-32 focus:outline-none focus:border-green-500 dark:focus:border-green-500 transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 rounded-lg font-semibold transition-all hover:shadow-lg active:scale-95 flex items-center gap-2"
                    >
                      Join
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
            
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Join 2,000+ candidates waiting for launch. No spam, ever.
            </p>
          </div>
        </div>

        {/* Why CFP Stats */}
        <div className="max-w-7xl mx-auto px-6 mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCFP.map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-green-200 dark:hover:border-green-800 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{stat.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Domains */}
        <div className="max-w-7xl mx-auto px-6 mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
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

        {/* Footer CTA */}
        <div className="mt-32 max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to become a CFP® professional?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Join the waitlist to get early access and exclusive launch pricing.
              </p>
              
              {!submitted && (
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg shadow-white/10"
                >
                  Get Early Access
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CFPLanding;

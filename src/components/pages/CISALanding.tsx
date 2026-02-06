import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Check,
  TrendingUp,
  Shield,
  Search,
  Lock,
} from 'lucide-react';

const CISALanding = () => {
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

  // CISA Domains info
  const cisaDomains = [
     {
      domain: 'Domain 1',
      title: 'Information Systems Auditing Process',
      weight: '21%',
      topics: ['Audit Standards', 'Risk Assessment', 'Control Self-Assessment', 'Audit Practice'],
      color: 'blue',
    },
    {
      domain: 'Domain 2',
      title: 'Governance and Management of IT',
      weight: '17%',
      topics: ['IT Governance', 'IT Strategy', 'Risk Management', 'Resource Management'],
      color: 'cyan',
    },
    {
      domain: 'Domain 3',
      title: 'Information Systems Acquisition, Development & Implementation',
      weight: '12%',
      topics: ['Project Management', 'Business Application Development', 'System Implementation'],
      color: 'sky',
    },
    {
      domain: 'Domain 4',
      title: 'Information Systems Operations and Business Resilience',
      weight: '23%',
      topics: ['IT Operations', 'Disaster Recovery', 'Business Continuity', 'Database Management'],
      color: 'indigo',
    },
    {
      domain: 'Domain 5',
      title: 'Protection of Information Assets',
      weight: '27%',
      topics: ['Information Security', 'Network Security', 'Cybersecurity', 'Privacy Principles'],
      color: 'violet',
    },
  ];

  // Why CISA section
  const whyCISA = [
    {
      icon: Shield,
      title: 'IT Audit Standard',
      description: 'The globally accepted standard of achievement among information systems audit, control and security professionals.',
    },
    {
      icon: TrendingUp,
      title: 'High Demand',
      description: 'Growing need for professionals who can assess vulnerabilities and institute technology controls.',
    },
    {
      icon: Lock,
      title: 'Security Focus',
      description: 'Bridge the gap between technical operations and strategic business objectives.',
    },
    {
      icon: Search,
      title: 'Audit Expertise',
      description: 'Master the process of auditing, controlling, monitoring, and assessing an organization’s information technology.',
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
            <span className="text-cyan-600 font-bold text-lg">CISA</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/login" className="hidden md:block text-slate-600 dark:text-slate-300 hover:text-cyan-600 px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/" 
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-cyan-600/25 transition-all duration-300 hover:-translate-y-0.5"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-100 dark:border-cyan-800 text-cyan-600 dark:text-cyan-300 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Coming 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Lead with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">CISA</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Certified Information Systems Auditor. Validate your expertise in audit, control, and information security.
            </p>

            {/* Email Capture */}
            <div className="max-w-md mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative">
                {submitted ? (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-4 flex items-center gap-3 border border-cyan-200 dark:border-cyan-800">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-cyan-600">
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
                      className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-xl py-4 pl-5 pr-32 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 rounded-lg font-semibold transition-all hover:shadow-lg active:scale-95 flex items-center gap-2"
                    >
                      Join
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
            
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Join 1,200+ candidates waiting for launch.
            </p>
          </div>
        </div>

        {/* Why CISA Stats */}
        <div className="max-w-7xl mx-auto px-6 mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCISA.map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-200 dark:hover:border-cyan-800 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
              5 Domains of <span className="text-cyan-600">IT Audit</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Master the five domains comprising the CISA exam structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cisaDomains.map((domain, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-cyan-900/5 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{domain.domain}</span>
                     <span className={`text-${domain.color}-600 font-bold text-lg`}>{domain.weight}</span>
                  </div>
                 
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
             <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to become CISA certified?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Join the waitlist to get early access and be the first to know when we launch.
              </p>
              
              {!submitted && (
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-cyan-50 transition-colors shadow-lg shadow-white/10"
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

export default CISALanding;

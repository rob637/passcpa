import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  CheckCircle,
  ArrowRight,
  Zap,
  Sparkles,
  Play,
  DollarSign,
  RefreshCw,
  Check,
  FileText,
  Users,
  Clock,
  Award,
  TrendingUp,
} from 'lucide-react';
import { Card } from '../common/Card';
import { useSEO, LANDING_SEO } from '../../hooks/useSEO';

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return <span>{count.toLocaleString()}{suffix}</span>;
};

const EALanding = () => {
  const [isVisible, setIsVisible] = useState(false);

  useSEO({
    title: LANDING_SEO.ea.title,
    description: LANDING_SEO.ea.description,
    canonicalUrl: 'https://voraprep.com/ea-prep',
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // EA Exam comparison data
  const comparisonData = [
    { feature: 'Annual Price', voraprep: 'Free (Beta)', gleim: '$629', passkey: '$599', surgent: '$499', highlight: true },
    { feature: 'AI Tutor Included', voraprep: true, gleim: false, passkey: false, surgent: false, highlight: true },
    { feature: 'Adaptive Learning', voraprep: 'Real-time AI', gleim: 'Basic', passkey: false, surgent: 'Limited', highlight: true },
    { feature: 'SM-2 Spaced Repetition', voraprep: true, gleim: false, passkey: false, surgent: false, highlight: true },
    { feature: 'All 3 SEE Parts', voraprep: true, gleim: true, passkey: true, surgent: true, highlight: false },
    { feature: 'Practice Questions', voraprep: '1,500+', gleim: '2,700+', passkey: '2,000+', surgent: '2,200+', highlight: false },
    { feature: 'Unlimited Practice Exams', voraprep: true, gleim: true, passkey: true, surgent: true, highlight: false },
    { feature: 'Mobile App', voraprep: 'PWA + Offline', gleim: 'Limited', passkey: 'Basic', surgent: 'Basic', highlight: true },
    { feature: 'Free Trial', voraprep: 'Full Access', gleim: '18 months', passkey: 'Demo', surgent: '5 days', highlight: true },
    { feature: 'No Credit Card to Start', voraprep: true, gleim: false, passkey: false, surgent: false, highlight: true },
  ];

  // Why VoraPrep section data
  const whyVoraPrep = [
    {
      icon: DollarSign,
      title: '100% Free (Beta)',
      description: 'Full access to all EA prep features during our public beta. No credit card required.',
      stat: '$0/yr',
      color: 'emerald'
    },
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Vory adapts to your learning style, identifies weak tax topics, and adjusts difficulty in real-time.',
      stat: 'AI-Powered',
      color: 'blue'
    },
    {
      icon: FileText,
      title: 'All 3 SEE Parts',
      description: 'Complete coverage of Individuals, Businesses, and Representation. Pass all parts and become an EA.',
      stat: '3 Parts',
      color: 'emerald'
    },
    {
      icon: RefreshCw,
      title: 'Spaced Repetition',
      description: 'SM-2 algorithm optimizes your review schedule. Study smarter, retain longer.',
      stat: '2x Retention',
      color: 'sky'
    },
    {
      icon: Target,
      title: 'IRS-Aligned Content',
      description: 'Questions based on actual IRS Circular 230, tax code, and representation rules.',
      stat: 'Current Rules',
      color: 'rose'
    },
    {
      icon: Zap,
      title: 'Personalized Study Plans',
      description: 'AI generates your daily study plan based on exam dates and weak areas.',
      stat: 'Auto-Plan',
      color: 'amber'
    },
  ];

  // SEE exam parts info
  const seeParts = [
    {
      part: 'SEE Part 1',
      title: 'Individuals',
      topics: ['Income & Adjustments', 'Itemized Deductions', 'Credits & Payments', 'Tax Computation'],
      questions: 100,
      time: '3.5 hours',
      color: 'blue',
    },
    {
      part: 'SEE Part 2',
      title: 'Businesses',
      topics: ['Business Entities', 'Business Income', 'Specialized Returns', 'Estate & Gift Tax'],
      questions: 100,
      time: '3.5 hours',
      color: 'purple',
    },
    {
      part: 'SEE Part 3',
      title: 'Representation',
      topics: ['Circular 230', 'Practice Before IRS', 'Specific Procedures', 'Ethics'],
      questions: 100,
      time: '3.5 hours',
      color: 'emerald',
    },
  ];

  // Stats
  const stats = [
    { value: 1500, label: 'Practice Questions', suffix: '+' },
    { value: 300, label: 'Tax Concepts', suffix: '+' },
    { value: 24, label: 'AI Tutor', suffix: '/7' },
    { value: 100, label: 'Free During Beta', suffix: '%' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
      {/* Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      
      {/* Navigation */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800"
        aria-label="Main navigation"
      >
        <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src="/logo.svg" alt="VoraPrep" className="h-10 dark:hidden" />
              <img src="/logo-white.svg" alt="VoraPrep" className="h-10 hidden dark:block" />
            </Link>
            <span className="text-emerald-600 font-bold text-lg">EA</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Features</a>
            <a href="#exam" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">The Exam</a>
            <a href="#comparison" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Compare</a>
            <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">All Exams</Link>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/login?course=ea" className="hidden md:block text-slate-600 dark:text-slate-300 hover:text-emerald-600 px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-emerald-600/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main id="main-content">
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-6 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
          
          {/* Floating orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-40 right-1/4 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

          <div className={`max-w-7xl mx-auto relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Beta Badge */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/25">
                <Sparkles className="w-4 h-4" />
                FREE BETA — No Credit Card Required
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-4 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                Become an
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Enrolled Agent
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 text-center mb-6 max-w-3xl mx-auto leading-relaxed">
              Pass all 3 parts of the <span className="font-semibold text-emerald-600">Special Enrollment Examination</span> with 
              <span className="font-semibold text-emerald-600"> AI-powered prep</span>.
              <br className="hidden md:block" />
              2,100+ questions. Adaptive learning. <span className="font-semibold text-emerald-600">100% Free</span> during Beta.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link 
                to="/register" 
                className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl text-base font-bold hover:shadow-2xl hover:shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start EA Prep Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#comparison" 
                className="group border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl text-base font-bold hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                See How We Compare
              </a>
            </div>

            {/* No Credit Card Emphasis */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="flex flex-wrap justify-center gap-4">
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
                  <span>All 3 SEE parts included</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is an EA Section */}
        <section className="py-12 md:py-16 px-6 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              Federal Credential
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What is an Enrolled Agent?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Enrolled Agents are <span className="font-semibold">federally-authorized tax practitioners</span> who can represent 
              taxpayers before the IRS. It's the highest credential awarded by the IRS and is recognized across all 50 states.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <Users className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Unlimited Representation</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Represent any taxpayer on any tax matter before the IRS</p>
              </Card>
              <Card className="p-6">
                <TrendingUp className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Growing Demand</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Tax complexity drives demand for qualified professionals</p>
              </Card>
              <Card className="p-6">
                <Clock className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Faster Path</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">No degree required — pass the exam and meet IRS standards</p>
              </Card>
            </div>
          </div>
        </section>

        {/* SEE Exam Parts Section */}
        <section id="exam" className="py-12 md:py-16 px-6 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                The Special Enrollment Examination
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Pass all 3 parts administered by Prometric on behalf of the IRS. We prepare you for each one.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {seeParts.map((part, idx) => (
                <div key={idx} className={`bg-gradient-to-br from-${part.color}-50 to-white dark:from-${part.color}-900/20 dark:to-slate-900 border border-${part.color}-200 dark:border-${part.color}-800/50 rounded-2xl p-6`}>
                  <div className={`inline-flex items-center gap-2 bg-${part.color}-100 dark:bg-${part.color}-900/50 text-${part.color}-700 dark:text-${part.color}-300 px-3 py-1 rounded-full text-sm font-semibold mb-3`}>
                    {part.part}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{part.title}</h3>
                  <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span>{part.questions} MCQs</span>
                    <span>•</span>
                    <span>{part.time}</span>
                  </div>
                  <ul className="space-y-2">
                    {part.topics.map((topic, tidx) => (
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

        {/* Why VoraPrep Section */}
        <section id="features" className="py-12 md:py-16 px-6 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Brain className="w-4 h-4" />
                AI-Powered EA Prep
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Why VoraPrep for EA?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyVoraPrep.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs font-bold text-emerald-600 mb-1">{item.stat}</div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-12 md:py-16 px-6 bg-white dark:bg-slate-950">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                How We Compare
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                See how VoraPrep stacks up against other EA prep courses
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Feature</th>
                    <th className="p-4 font-semibold text-emerald-600">VoraPrep</th>
                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Gleim</th>
                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Passkey</th>
                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Surgent</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className={`border-b border-slate-200 dark:border-slate-800 ${row.highlight ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''}`}>
                      <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        {typeof row.voraprep === 'boolean' ? (
                          row.voraprep ? <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" /> : <span className="text-slate-400">—</span>
                        ) : (
                          <span className="font-semibold text-emerald-600">{row.voraprep}</span>
                        )}
                      </td>
                      <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                        {typeof row.gleim === 'boolean' ? (
                          row.gleim ? <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" /> : <span className="text-slate-400">—</span>
                        ) : (
                          row.gleim
                        )}
                      </td>
                      <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                        {typeof row.passkey === 'boolean' ? (
                          row.passkey ? <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" /> : <span className="text-slate-400">—</span>
                        ) : (
                          row.passkey
                        )}
                      </td>
                      <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                        {typeof row.surgent === 'boolean' ? (
                          row.surgent ? <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" /> : <span className="text-slate-400">—</span>
                        ) : (
                          row.surgent
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Become an Enrolled Agent?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Start your EA prep journey today. Create a free account and access all features during our beta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="group bg-white text-emerald-700 px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start Free EA Prep
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
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="/logo-white.svg" alt="VoraPrep" className="h-8 mb-4" />
              <p className="text-slate-400 text-sm">
                AI-powered exam prep for accounting and finance professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">EA Prep</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#exam" className="hover:text-white transition-colors">SEE Part 1 - Individuals</a></li>
                <li><a href="#exam" className="hover:text-white transition-colors">SEE Part 2 - Businesses</a></li>
                <li><a href="#exam" className="hover:text-white transition-colors">SEE Part 3 - Representation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Other Certifications</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/cpa" className="hover:text-white transition-colors">CPA Exam Prep</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">All Certifications</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} VoraPrep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EALanding;

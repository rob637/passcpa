import { useState, useEffect } from 'react';
import logger from '../../utils/logger';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { 
  BookOpen, 
  Brain, 
  Target, 
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  X,
  Smartphone,
  Bot,
  BarChart3,
  CreditCard,
  Sparkles,
  Play,
  DollarSign,
  Layers,
  RefreshCw,
  Check
} from 'lucide-react';

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

const Landing = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await addDoc(collection(db, 'waitlist'), {
        email: email.toLowerCase().trim(),
        source: 'landing_page',
        createdAt: serverTimestamp(),
        userAgent: navigator.userAgent,
      });
      
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      logger.error('Waitlist signup error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  // Comprehensive competitor comparison data - focused on true differentiators
  const comparisonData = [
    { feature: 'Annual Price', voraprep: 'Free (Beta)', becker: '$3,499', roger: '$2,095', surgent: '$1,799', highlight: true },
    { feature: 'AI Tutor Included', voraprep: true, becker: 'Extra $$$', roger: false, surgent: 'Limited', highlight: true },
    { feature: 'Adaptive Learning Engine', voraprep: 'Real-time AI', becker: 'Extra $$$', roger: false, surgent: 'Basic', highlight: true },
    { feature: 'Weak Area Auto-Detection', voraprep: true, becker: false, roger: false, surgent: 'Limited', highlight: true },
    { feature: 'SM-2 Spaced Repetition', voraprep: true, becker: false, roger: false, surgent: false, highlight: true },
    { feature: 'AI Daily Study Plans', voraprep: true, becker: false, roger: false, surgent: false, highlight: true },
    { feature: 'Curriculum-Aware Practice', voraprep: true, becker: false, roger: false, surgent: false, highlight: true },
    { feature: 'Learning Style', voraprep: 'Active Practice', becker: 'Passive Video', roger: 'Passive Video', surgent: 'Passive Video', highlight: true },
    { feature: '2025 & 2026 Blueprint', voraprep: true, becker: true, roger: true, surgent: true, highlight: false },
    { feature: 'Task-Based Simulations', voraprep: '100+', becker: true, roger: true, surgent: true, highlight: false },
    { feature: 'Curated Mock Exams', voraprep: '18 Exams', becker: true, roger: true, surgent: true, highlight: false },
    { feature: 'Prometric-Style Interface', voraprep: true, becker: true, roger: false, surgent: false, highlight: true },
    { feature: 'PWA + Offline Mode', voraprep: true, becker: false, roger: false, surgent: false, highlight: true },
    { feature: 'Free Trial', voraprep: 'Full Access', becker: '14 days', roger: '3 days', surgent: '5 days', highlight: true },
    { feature: 'No Credit Card to Start', voraprep: true, becker: false, roger: false, surgent: false, highlight: true },
  ];

  // Why VoraPrep section data
  const whyVoraPrep = [
    {
      icon: DollarSign,
      title: '100% Free (Beta)',
      description: 'Get full access to all features during our public beta. No credit card required, valid through the entire beta period.',
      stat: '$0/yr',
      color: 'emerald'
    },
    {
      icon: Brain,
      title: 'True Adaptive Learning',
      description: 'Not just random questions. Our AI tracks your weak areas, adjusts difficulty in real-time, and focuses 70% of your practice on topics you struggle with most.',
      stat: 'AI-Powered',
      color: 'blue'
    },
    {
      icon: Bot,
      title: 'Meet Vory',
      description: 'Stuck on a concept? Vory, your AI study companion, explains it 10 different ways until it clicks. Available 24/7, never judges, infinitely patient.',
      stat: '24/7',
      color: 'blue'
    },
    {
      icon: RefreshCw,
      title: 'SM-2 Spaced Repetition',
      description: 'The same algorithm Anki uses. We calculate exactly when you\'re about to forget something and quiz you at the perfect moment for maximum retention.',
      stat: '2x Retention',
      color: 'sky'
    },
    {
      icon: Target,
      title: 'Curriculum-Aware Practice',
      description: 'We only quiz you on topics you\'ve actually studied. No frustrating questions on material you haven\'t learned yet — just logical, efficient progression.',
      stat: 'Smart Flow',
      color: 'rose'
    },
    {
      icon: Zap,
      title: 'Personalized Daily Plans',
      description: 'AI generates your daily study plan based on exam date, weak areas, and learning pace. Know exactly what to study each day — no guesswork.',
      stat: 'Auto-Plan',
      color: 'amber'
    },
    {
      icon: Smartphone,
      title: 'Study Anywhere',
      description: 'Full offline mode with PWA support. Study on the subway, in a coffee shop, or anywhere without WiFi. Progress syncs automatically.',
      stat: 'Offline Ready',
      color: 'orange'
    },
    {
      icon: Layers,
      title: '2026 Blueprint Native',
      description: 'Built from scratch for the new CPA exam format. Not retrofitted, not updated — designed specifically for Core + Discipline structure.',
      stat: 'Day 1 Ready',
      color: 'red'
    },
    {
      icon: CreditCard,
      title: 'No Credit Card Needed',
      description: 'Start studying immediately. No payment info required. No "free trial" that auto-charges. Just sign up and go.',
      stat: '100% Free Start',
      color: 'teal'
    },
  ];

  // Mock testimonials - commented out until we have verified real testimonials
  // Uncomment when ready to display testimonials section
  /*
  const testimonials = [
    {
      quote: "Finally, a CPA prep course that doesn't require a second mortgage. Vory is like having a patient professor available 24/7. I went from dreading study sessions to actually looking forward to them.",
      author: "Sarah M.",
      role: "CPA Candidate • Big 4 Audit",
      avatar: "SM",
      rating: 5
    },
    {
      quote: "I switched from Becker after failing FAR twice. VoraPrep's adaptive learning helped me identify exactly where I was weak. Passed with an 82 on my third attempt!",
      author: "Michael T.",
      role: "Staff Accountant • Houston, TX",
      avatar: "MT",
      rating: 5
    },
    {
      quote: "The 2025 vs 2026 blueprint toggle is genius. I knew exactly what to study for my January exam date. No other platform handles the transition this well.",
      author: "Jennifer L.",
      role: "MS Accounting Graduate",
      avatar: "JL",
      rating: 5
    },
  ];
  */

  // Stats section - highlight our real strengths
  const stats = [
    { value: 2900, label: 'Practice Questions', suffix: '+' },
    { value: 950, label: 'Lessons', suffix: '+' },
    { value: 24, label: 'Vory AI', suffix: '/7' },
    { value: 100, label: 'Free vs Becker', suffix: '%' },
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
            <img 
              src="/logo.svg" 
              alt="VoraPrep" 
              className="h-10 dark:hidden" 
            />
            <img 
              src="/logo-white.svg" 
              alt="VoraPrep" 
              className="h-10 hidden dark:block" 
            />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#comparison" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Compare</a>
            <Link to="/pricing" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/login" className="hidden md:block text-slate-600 dark:text-slate-300 hover:text-blue-600 px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5"
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoMnY0aC0yem0tNiA2di00aDJ2NGgtMnptMC02di00aDJ2NGgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        <div className={`max-w-7xl mx-auto relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Beta Badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/25">
              <Sparkles className="w-4 h-4" />
              🎉 FREE BETA — No Credit Card Required
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-4 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Pass Your CPA Exam
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Without Breaking the Bank
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 text-center mb-6 max-w-3xl mx-auto leading-relaxed">
            The <span className="font-semibold text-blue-600">AI-powered</span> CPA prep platform that's 
            <span className="font-semibold text-emerald-600"> 100% Free</span> during Beta.
            <br className="hidden md:block" />
            2,900+ questions. <span className="font-semibold text-blue-600">True adaptive learning</span>. SM-2 spaced repetition. Zero credit card.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link 
              to="/register" 
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl text-base font-bold hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Start Studying Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#comparison" 
              className="group border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl text-base font-bold hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-2"
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
                <span>Full access during beta</span>
              </div>
            </div>
            
            {/* Login Link - visible on mobile */}
            <p className="md:hidden text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">Sign In</Link>
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Bar - Removed until we have real user data */}

      {/* Why VoraPrep Section */}
      <section id="features" className="py-12 md:py-16 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Brain className="w-4 h-4" />
              AI-Powered Adaptive Learning
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Learn Smarter, Not Longer
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our AI doesn't just track your progress — it actively adapts to how <em>you</em> learn. Every question, every session, optimized for <em>your</em> path to 75+.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyVoraPrep.map((item, index) => {
              const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
                emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
                blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
                primary: { bg: 'bg-primary-100 dark:bg-primary-900/30', text: 'text-primary-600 dark:text-primary-400', border: 'border-primary-200 dark:border-primary-800' },
                sky: { bg: 'bg-sky-100 dark:bg-sky-900/30', text: 'text-sky-600 dark:text-sky-400', border: 'border-sky-200 dark:border-sky-800' },
                rose: { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-800' },
                amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
                orange: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' },
                red: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', border: 'border-red-200 dark:border-red-800' },
                teal: { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-600 dark:text-teal-400', border: 'border-teal-200 dark:border-teal-800' },
              };
              const colors = colorClasses[item.color];
              
              return (
                <div 
                  key={index}
                  className={`group p-8 rounded-3xl border-2 ${colors.border} bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-12 h-12 ${colors.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <item.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className={`px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm font-bold`}>
                      {item.stat}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comprehensive Comparison Section */}
      <section id="comparison" className="py-12 md:py-20 px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <BarChart3 className="w-4 h-4" />
              Honest Comparison
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              VoraPrep vs. The Competition
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We're not trying to hide anything. Here's exactly how we stack up against the big names.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    <th className="px-6 py-5 text-left text-slate-600 dark:text-slate-300 font-semibold">Feature</th>
                    <th className="px-6 py-5 text-center">
                      <div className="flex flex-col items-center">
                        <img 
                          src="/logo-icon.svg" 
                          alt="VoraPrep" 
                          className="w-10 h-10 mb-2"
                        />
                        <span className="text-blue-600 dark:text-blue-400 font-bold">VoraPrep</span>
                      </div>
                    </th>
                    <th className="px-6 py-5 text-center text-slate-600 dark:text-slate-300">Becker</th>
                    <th className="px-6 py-5 text-center text-slate-600 dark:text-slate-300">Roger</th>
                    <th className="px-6 py-5 text-center text-slate-600 dark:text-slate-300">Surgent</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-t border-slate-100 dark:border-slate-800 ${row.highlight ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <span className={`font-medium ${row.highlight ? 'text-blue-900 dark:text-blue-100' : 'text-slate-700 dark:text-slate-300'}`}>
                          {row.feature}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.voraprep === 'boolean' ? (
                          row.voraprep ? (
                            <div className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full">
                              <X className="w-5 h-5 text-red-500 dark:text-red-400" />
                            </div>
                          )
                        ) : (
                          <span className={`font-bold ${row.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                            {row.voraprep}
                          </span>
                        )}
                      </td>
                      {[row.becker, row.roger, row.surgent].map((value, i) => (
                        <td key={i} className="px-6 py-4 text-center">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-slate-600 dark:text-slate-300">{value}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom line */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl">
              <p className="text-lg font-bold">
                💰 Save $3,400+ compared to Becker — same results, fraction of the price
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Adaptive Learning Works */}
      <section className="py-12 md:py-20 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              The VoraPrep Difference
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              How Our AI Learns You
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Most prep courses give you random questions. We give you the <em>right</em> questions at the <em>right</em> time.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'You Study a Lesson',
                description: 'Complete lessons at your own pace. Our system tracks exactly what topics you\'ve covered.',
                icon: BookOpen,
                color: 'from-blue-500 to-blue-600'
              },
              {
                step: '2',
                title: 'AI Unlocks Questions',
                description: 'We only quiz you on material you\'ve learned. No frustrating questions on topics you haven\'t studied yet.',
                icon: Target,
                color: 'from-sky-500 to-sky-600'
              },
              {
                step: '3',
                title: 'We Find Your Weak Spots',
                description: 'Our engine detects topics where you\'re below 70% accuracy and automatically prioritizes them.',
                icon: Brain,
                color: 'from-rose-500 to-rose-600'
              },
              {
                step: '4',
                title: 'Spaced Repetition Kicks In',
                description: 'The SM-2 algorithm schedules reviews right before you\'d forget. Maximum retention, minimum time.',
                icon: RefreshCw,
                color: 'from-emerald-500 to-emerald-600'
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className={`absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {item.step}
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 pt-10 h-full border border-slate-200 dark:border-slate-800">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-6 md:p-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              The Result? Study 40% Less, Retain 2x More
            </h3>
            <p className="text-base text-white/90 mb-5 max-w-2xl mx-auto">
              Stop wasting time on topics you already know. Stop being frustrated by questions you haven't studied. 
              Our adaptive system means every minute counts toward your 75+.
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 bg-white text-teal-600 px-6 py-3 rounded-xl text-base font-bold hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Experience Smart Learning
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CPA Sections Coverage */}
      <section className="py-12 md:py-16 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Layers className="w-4 h-4" />
              Complete Coverage
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              All 7 CPA Exam Sections
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              6 sections for the 2026 Blueprint (Core + Discipline), plus BEC for candidates on the 2025 Blueprint
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { code: 'FAR', name: 'Financial Accounting & Reporting', questions: 463, type: 'Core', color: 'from-blue-600 to-blue-700' },
              { code: 'AUD', name: 'Auditing & Attestation', questions: 425, type: 'Core', color: 'from-sky-500 to-sky-600' },
              { code: 'REG', name: 'Regulation', questions: 460, type: 'Core', color: 'from-emerald-500 to-teal-500' },
              { code: 'BAR', name: 'Business Analysis & Reporting', questions: 393, type: 'Discipline', color: 'from-orange-500 to-amber-500' },
              { code: 'ISC', name: 'Information Systems & Controls', questions: 388, type: 'Discipline', color: 'from-red-500 to-rose-500' },
              { code: 'TCP', name: 'Tax Compliance & Planning', questions: 379, type: 'Discipline', color: 'from-cyan-500 to-teal-500' },
              { code: 'BEC', name: 'Business Environment & Concepts', questions: 119, type: '2025 Only', color: 'from-slate-500 to-slate-600' },
            ].map((section) => (
              <div 
                key={section.code}
                className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-block bg-gradient-to-r ${section.color} text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4`}>
                  {section.code}
                </div>
                <span className="ml-2 text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  {section.type}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {section.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {section.questions}+ practice questions
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture / CTA Section */}
      <section className="py-12 md:py-20 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoMnY0aC0yem0tNiA2di00aDJ2NGgtMnptMC02di00aDJ2NGgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-bold mb-8">
            <Sparkles className="w-4 h-4" />
            Limited Beta Access
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Get to 75+?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of CPA candidates who chose the smarter, more affordable path.
            <br />
            <span className="font-bold text-white">No credit card required. Start studying in 60 seconds.</span>
          </p>

          {/* Email capture form */}
          {submitted ? (
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6 inline-flex items-center gap-3 mb-8">
              <CheckCircle className="w-6 h-6 text-emerald-300" />
              <span className="text-white text-lg font-semibold">You're on the list! Check your email for next steps.</span>
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-4 justify-center mb-8 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to get started"
                required
                className="flex-1 px-6 py-4 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/30 placeholder:text-slate-600"
              />
              <button
                type="submit"
                className="group bg-white text-blue-600 px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          {error && (
            <p className="text-red-200 text-sm mb-4 bg-red-500/20 px-4 py-2 rounded-lg inline-block">{error}</p>
          )}

          {/* Or sign up directly */}
          <p className="text-blue-200 mb-8">
            Or{' '}
            <Link to="/register" className="text-white underline hover:no-underline font-semibold">
              create an account directly →
            </Link>
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              <span>No payment required</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 bg-slate-950 text-slate-600" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">VoraPrep</span>
              </div>
              <p className="text-slate-600 max-w-md mb-6">
                The AI-powered CPA exam prep platform that's 97% cheaper than traditional review courses.
                Pass your exam without breaking the bank.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle className="w-5 h-5" />
                No credit card required to start
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><Link to="/register" className="hover:text-white transition-colors">Start Free</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#comparison" className="hover:text-white transition-colors">Compare</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><a href="mailto:support@voraprep.com" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © {new Date().getFullYear()} VoraPrep. All rights reserved. Not affiliated with AICPA.
            </p>
            <p className="text-sm text-slate-600">
              Made with ❤️ for CPA candidates everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

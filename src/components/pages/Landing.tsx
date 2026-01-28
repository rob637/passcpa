import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { 
  BookOpen, 
  Brain, 
  Target, 
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
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
  MessageSquare,
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
      console.error('Waitlist signup error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  // Comprehensive competitor comparison data
  const comparisonData = [
    { feature: 'Annual Price', voraprep: '$99/yr', becker: '$3,499', roger: '$2,095', surgent: '$1,799', highlight: true },
    { feature: 'Price per Month', voraprep: '$8.25', becker: '$292', roger: '$175', surgent: '$150', highlight: false },
    { feature: 'AI-Powered Tutor', voraprep: true, becker: false, roger: false, surgent: 'Limited', highlight: true },
    { feature: 'Practice Questions', voraprep: '2,500+', becker: '9,200+', roger: '6,000+', surgent: '7,700+', highlight: false },
    { feature: 'Task-Based Simulations', voraprep: '30+', becker: '400+', roger: '100+', surgent: '200+', highlight: false },
    { feature: 'Video Lessons', voraprep: 'AI Explains', becker: '190+ hrs', roger: '100+ hrs', surgent: '350+ hrs', highlight: false },
    { feature: '2026 Blueprint Ready', voraprep: true, becker: true, roger: true, surgent: true, highlight: false },
    { feature: 'Adaptive Learning', voraprep: true, becker: 'Extra $$$', roger: false, surgent: true, highlight: true },
    { feature: 'Spaced Repetition', voraprep: true, becker: false, roger: false, surgent: false, highlight: true },
    { feature: 'Mobile App', voraprep: true, becker: true, roger: true, surgent: true, highlight: false },
    { feature: 'Offline Mode', voraprep: true, becker: false, roger: false, surgent: false, highlight: true },
    { feature: 'Progress Analytics', voraprep: true, becker: true, roger: true, surgent: true, highlight: false },
    { feature: 'Free Trial', voraprep: 'Full Access', becker: '14 days', roger: '3 days', surgent: '5 days', highlight: true },
    { feature: 'Credit Card Required', voraprep: false, becker: true, roger: true, surgent: true, highlight: true },
    { feature: 'Pass Guarantee', voraprep: true, becker: true, roger: true, surgent: true, highlight: false },
    { feature: 'Flashcards', voraprep: true, becker: true, roger: true, surgent: true, highlight: false },
    { feature: 'Study Planner', voraprep: true, becker: true, roger: true, surgent: true, highlight: false },
  ];

  // Why VoraPrep section data
  const whyVoraPrep = [
    {
      icon: DollarSign,
      title: '97% Cheaper',
      description: 'Why pay $3,500+ when you can get the same results for $99/year? We believe quality education shouldn\'t cost a fortune.',
      stat: '$99/yr',
      color: 'emerald'
    },
    {
      icon: Bot,
      title: 'AI That Actually Helps',
      description: 'Stuck on a concept? Our AI tutor explains it 10 different ways until it clicks. Available 24/7, never judges, infinitely patient.',
      stat: '24/7',
      color: 'blue'
    },
    {
      icon: Brain,
      title: 'Learn Smarter, Not Harder',
      description: 'Our spaced repetition algorithm shows you questions right before you\'d forget them. Science-backed, efficiency-maximized.',
      stat: '40% Faster',
      color: 'purple'
    },
    {
      icon: Smartphone,
      title: 'Study Anywhere',
      description: 'Full offline mode. Study on the subway, in a coffee shop, or anywhere without WiFi. Your progress syncs when you\'re back online.',
      stat: 'Offline Ready',
      color: 'orange'
    },
    {
      icon: Target,
      title: '2026 Blueprint Native',
      description: 'Built from scratch for the new CPA exam format. Not retrofitted, not updated — designed specifically for you.',
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

  // Testimonials (placeholder for beta - will add real ones)
  const testimonials = [
    {
      quote: "Finally, a CPA prep course that doesn't require a second mortgage. The AI tutor is like having a patient professor available 24/7.",
      author: "Sarah M.",
      role: "CPA Candidate, Big 4",
      avatar: "SM",
      rating: 5
    },
    {
      quote: "I switched from Becker after failing FAR twice. VoraPrep's adaptive learning helped me identify my weak spots. Passed with an 82!",
      author: "Michael T.",
      role: "Staff Accountant",
      avatar: "MT",
      rating: 5
    },
    {
      quote: "The offline mode is a game-changer for my commute. I get an extra hour of study time every day that I was wasting before.",
      author: "Jennifer L.",
      role: "Graduate Student",
      avatar: "JL",
      rating: 5
    },
  ];

  // Stats section
  const stats = [
    { value: 2508, label: 'Practice Questions', suffix: '+' },
    { value: 303, label: 'Lessons', suffix: '' },
    { value: 217, label: 'Study Hours', suffix: '' },
    { value: 30, label: 'TBS Simulations', suffix: '+' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
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
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoMnY0aC0yem0tNiA2di00aDJ2NGgtMnptMC02di00aDJ2NGgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        <div className={`max-w-7xl mx-auto relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Beta Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/25">
              <Sparkles className="w-4 h-4" />
              🎉 FREE BETA — No Credit Card Required
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Pass Your CPA Exam
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Without Breaking the Bank
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            The <span className="font-semibold text-blue-600">AI-powered</span> CPA prep platform that's 
            <span className="font-semibold text-emerald-600"> 97% cheaper</span> than Becker.
            <br className="hidden md:block" />
            2,500+ questions. Adaptive learning. Zero credit card required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/register" 
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Start Studying Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#comparison" 
              className="group border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-2xl text-lg font-bold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              See How We Compare
            </a>
          </div>

          {/* No Credit Card Emphasis */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-600" />
              </div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-600" />
              </div>
              <span>Full access during beta</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-600" />
              </div>
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['SM', 'MT', 'JL', 'AK'].map((initials, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-slate-900">
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-slate-600 dark:text-slate-400 text-sm">Join 1,000+ students</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-slate-600 dark:text-slate-400 text-sm">4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <span className="text-slate-600 dark:text-slate-400 text-sm">92% pass rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <span className="text-slate-600 dark:text-slate-400 text-sm">Pass guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why VoraPrep Section */}
      <section id="features" className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap className="w-4 h-4" />
              Why Students Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              The Smarter Way to Pass
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We built VoraPrep because paying $3,500 for exam prep is insane. Here's why we're different.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyVoraPrep.map((item, index) => {
              const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
                emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
                blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
                purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
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
                  <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <div className={`inline-block px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm font-bold mb-4`}>
                    {item.stat}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comprehensive Comparison Section */}
      <section id="comparison" className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
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
                    <th className="px-6 py-5 text-left text-slate-600 dark:text-slate-400 font-semibold">Feature</th>
                    <th className="px-6 py-5 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-2">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">VoraPrep</span>
                      </div>
                    </th>
                    <th className="px-6 py-5 text-center text-slate-500 dark:text-slate-400">Becker</th>
                    <th className="px-6 py-5 text-center text-slate-500 dark:text-slate-400">Roger</th>
                    <th className="px-6 py-5 text-center text-slate-500 dark:text-slate-400">Surgent</th>
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
                            <span className="text-slate-500 dark:text-slate-400">{value}</span>
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

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <MessageSquare className="w-4 h-4" />
              What Students Say
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Real Results, Real Stories
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{testimonial.author}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CPA Sections Coverage */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Layers className="w-4 h-4" />
              Complete Coverage
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              All 6 CPA Exam Sections
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Updated for the 2026 CPA Exam Blueprint with both Core and Discipline sections
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { code: 'FAR', name: 'Financial Accounting & Reporting', questions: 463, type: 'Core', color: 'from-blue-500 to-cyan-500' },
              { code: 'AUD', name: 'Auditing & Attestation', questions: 425, type: 'Core', color: 'from-purple-500 to-pink-500' },
              { code: 'REG', name: 'Regulation', questions: 460, type: 'Core', color: 'from-emerald-500 to-teal-500' },
              { code: 'BAR', name: 'Business Analysis & Reporting', questions: 393, type: 'Discipline', color: 'from-orange-500 to-amber-500' },
              { code: 'ISC', name: 'Information Systems & Controls', questions: 388, type: 'Discipline', color: 'from-red-500 to-rose-500' },
              { code: 'TCP', name: 'Tax Compliance & Planning', questions: 379, type: 'Discipline', color: 'from-indigo-500 to-violet-500' },
            ].map((section) => (
              <div 
                key={section.code}
                className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-block bg-gradient-to-r ${section.color} text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4`}>
                  {section.code}
                </div>
                <span className="ml-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {section.type}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {section.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {section.questions}+ practice questions
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture / CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
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
                className="flex-1 px-6 py-4 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/30 placeholder:text-slate-400"
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

      {/* Footer */}
      <footer className="py-16 px-6 bg-slate-950 text-slate-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">VoraPrep</span>
              </div>
              <p className="text-slate-400 max-w-md mb-6">
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
            <p className="text-sm text-slate-500">
              Made with ❤️ for CPA candidates everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

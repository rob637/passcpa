import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Brain, 
  Target, 
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  CheckCircle,
  Award,
  TrendingUp,
  Calculator,
  FileText,
  BarChart3,
  Search,
  Lock,
  Globe,
} from 'lucide-react';

// Course card data for the 6 certification programs
interface CourseInfo {
  id: string;
  name: string;
  fullName: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  stats: { questions: string; passRate?: string };
  features: string[];
  path: string;
  available: boolean;
}

const COURSES: CourseInfo[] = [
  {
    id: 'cpa',
    name: 'CPA',
    fullName: 'Certified Public Accountant',
    description: 'The gold standard for accountants. Master financial reporting, auditing, taxation, and business concepts.',
    icon: Calculator,
    color: 'blue',
    bgGradient: 'from-blue-500 to-blue-600',
    stats: { questions: '2,900+', passRate: '50%' },
    features: ['2025 & 2026 Blueprint', 'Core + Discipline Format', 'TBS Simulations', 'Written Communication'],
    path: '/cpa',
    available: true,
  },
  {
    id: 'ea',
    name: 'EA',
    fullName: 'Enrolled Agent',
    description: 'Become a federally-authorized tax practitioner. Represent taxpayers before the IRS.',
    icon: FileText,
    color: 'emerald',
    bgGradient: 'from-emerald-500 to-emerald-600',
    stats: { questions: '1,500+', passRate: '70%' },
    features: ['SEE Parts 1-3', 'Tax Code Coverage', 'IRS Procedures', 'Representation Rules'],
    path: '/ea-prep',
    available: true,
  },
  {
    id: 'cma',
    name: 'CMA',
    fullName: 'Certified Management Accountant',
    description: 'Excel in management accounting and financial strategy. Drive business decisions.',
    icon: BarChart3,
    color: 'emerald',
    bgGradient: 'from-emerald-600 to-emerald-700',
    stats: { questions: '550+', passRate: '45%' },
    features: ['Financial Planning', 'Performance Management', 'Cost Management', 'Internal Controls'],
    path: '/cma',
    available: true,
  },
  {
    id: 'cia',
    name: 'CIA',
    fullName: 'Certified Internal Auditor',
    description: 'The only globally recognized internal audit certification. Lead audit excellence.',
    icon: Search,
    color: 'amber',
    bgGradient: 'from-amber-500 to-amber-600',
    stats: { questions: '1,800+', passRate: '40%' },
    features: ['Internal Audit Basics', 'Practice of Internal Auditing', 'Business Knowledge', 'Risk Management'],
    path: '/cia',
    available: true,
  },
  {
    id: 'cfp',
    name: 'CFP',
    fullName: 'Certified Financial Planner',
    description: 'The standard for financial planning. Master wealth management, tax, and estate planning.',
    icon: TrendingUp,
    color: 'green',
    bgGradient: 'from-green-500 to-green-600',
    stats: { questions: '2,000+', passRate: '67%' },
    features: ['8 Knowledge Domains', 'Wealth Management', 'Financial Planning', 'Fiduciary Standards'],
    path: '/cfp',
    available: true,
  },
  {
    id: 'cisa',
    name: 'CISA',
    fullName: 'Cert. Info Systems Auditor',
    description: 'The gold standard for IT audit, control, and information security.',
    icon: Shield,
    color: 'cyan',
    bgGradient: 'from-cyan-500 to-cyan-600',
    stats: { questions: '1,200+', passRate: '50%' },
    features: ['IT Audit Process', 'Governance & Mgmt', 'System Acquisition', 'Asset Protection'],
    path: '/cisa',
    available: true,
  },
];

// Why VoraPrep section data
const WHY_VORAPREP = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Vory, our AI tutor, adapts to your learning style and identifies your weak areas in real-time.',
  },
  {
    icon: Target,
    title: 'Adaptive Practice',
    description: 'Questions get harder as you improve. 70% of practice focuses on topics where you struggle most.',
  },
  {
    icon: Zap,
    title: 'Spaced Repetition',
    description: 'SM-2 algorithm ensures you review concepts at the perfect moment for maximum retention.',
  },
  {
    icon: Shield,
    title: 'Exam-Day Ready',
    description: 'Prometric-style interface and timed exams so nothing surprises you on test day.',
  },
];

// Course Card Component
const CourseCard = ({ course }: { course: CourseInfo }) => {
  const Icon = course.icon;
  
  return (
    <div className={`relative group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${!course.available ? 'opacity-75' : ''}`}>
      {/* Color bar at top */}
      <div className={`h-2 bg-gradient-to-r ${course.bgGradient}`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.bgGradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          {!course.available && (
            <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-xs font-medium">
              <Lock className="w-3 h-3" />
              Coming Soon
            </span>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {course.name} <span className="text-base font-normal text-slate-500">Exam Prep</span>
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{course.fullName}</p>
        
        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        {/* Stats */}
        <div className="flex gap-4 mb-4">
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">{course.stats.questions}</div>
            <div className="text-xs text-slate-500">Questions</div>
          </div>
          {course.stats.passRate && (
            <div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">{course.stats.passRate}</div>
              <div className="text-xs text-slate-500">Nat'l Pass Rate</div>
            </div>
          )}
        </div>
        
        {/* Features */}
        <div className="space-y-2 mb-6">
          {course.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <CheckCircle className={`w-4 h-4 text-${course.color}-500`} />
              {feature}
            </div>
          ))}
        </div>
        
        {/* CTA */}
        {course.available ? (
          <Link
            to={course.path}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r ${course.bgGradient} text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 group-hover:shadow-${course.color}-500/25`}
          >
            Explore {course.name} Prep
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-400 font-semibold py-3 px-4 rounded-xl cursor-not-allowed"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};

const VoraPrep = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
            <a href="#courses" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Exams</a>
            <a href="#why" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Why VoraPrep</a>
            <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/login" className="hidden md:block text-slate-600 dark:text-slate-300 hover:text-blue-600 px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main id="main-content">
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 px-6 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
          
          {/* Floating orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-40 right-1/4 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

          <div className={`max-w-7xl mx-auto relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Beta Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/25">
                <Sparkles className="w-4 h-4" />
                FREE BETA — All Courses, Full Access
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                Your Path to
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Professional Certification
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
              <span className="font-semibold">AI-powered exam prep</span> for accounting and finance professionals.
              <br className="hidden md:block" />
              CPA, EA, CMA, CIA, CFP, and CISA — all on one platform.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  10,000+
                </div>
                <div className="text-sm text-slate-500">Practice Questions</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  <Award className="w-6 h-6 text-emerald-600" />
                  6
                </div>
                <div className="text-sm text-slate-500">Certifications</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  <Brain className="w-6 h-6 text-purple-600" />
                  24/7
                </div>
                <div className="text-sm text-slate-500">AI Tutor</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  <Globe className="w-6 h-6 text-amber-600" />
                  $0
                </div>
                <div className="text-sm text-slate-500">During Beta</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <a 
                href="#courses" 
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
              >
                Choose Your Certification
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* Course Selection Section */}
        <section id="courses" className="py-8 md:py-12 px-6 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                <Award className="w-4 h-4" />
                Professional Certifications
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Choose Your Exam
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Each certification has its own dedicated prep program with tailored content, 
                practice exams, and AI-powered study tools.
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COURSES.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Why VoraPrep Section */}
        <section id="why" className="py-8 md:py-12 px-6 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Why VoraPrep?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                We built the study platform we wished existed when we were candidates.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_VORAPREP.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
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

        {/* About VoraPrep Section */}
        <section id="about" className="py-8 md:py-12 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Built by CPAs, for Candidates
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              VoraPrep was founded by accounting professionals who experienced firsthand the frustration 
              of expensive, outdated exam prep. We believe everyone deserves access to high-quality 
              study materials — not just those who can afford $4,000+ review courses.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-2xl font-bold text-white">100% Free</div>
                <div className="text-sm text-white/80">During Beta</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-2xl font-bold text-white">AI-First</div>
                <div className="text-sm text-white/80">Adaptive Learning</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-2xl font-bold text-white">Modern</div>
                <div className="text-sm text-white/80">Current Blueprints</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 md:py-12 px-6 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Start?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Create a free account and begin your certification journey today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login" 
                className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl text-lg font-bold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Sign In
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
              <h4 className="font-semibold text-white mb-4">Certifications</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/cpa" className="hover:text-white transition-colors">CPA Exam Prep</Link></li>
                <li><Link to="/ea-prep" className="hover:text-white transition-colors">EA Exam Prep</Link></li>
                <li><Link to="/cma" className="hover:text-white transition-colors">CMA Exam Prep</Link></li>
                <li><Link to="/cia" className="hover:text-white transition-colors">CIA Exam Prep</Link></li>
                <li><Link to="/cfp" className="hover:text-white transition-colors">CFP Exam Prep</Link></li>
                <li><Link to="/cisa" className="hover:text-white transition-colors">CISA Exam Prep</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
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

export default VoraPrep;

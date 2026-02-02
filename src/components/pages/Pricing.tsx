import { Link } from 'react-router-dom';
import { Check, Gift, Sparkles, Users, BookOpen, Brain, Calculator, FileText, ClipboardCheck } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const Pricing = () => {
  useDocumentTitle('Pricing');

  const features = [
    { icon: BookOpen, text: 'All 6 CPA exam sections' },
    { icon: Brain, text: '2,500+ practice questions' },
    { icon: Sparkles, text: 'AI tutor (Vory) - unlimited' },
    { icon: Check, text: 'Task-based simulations' },
    { icon: Check, text: 'Written communication practice' },
    { icon: Check, text: 'Full exam simulations' },
    { icon: Check, text: 'Progress tracking & analytics' },
    { icon: Check, text: 'Spaced repetition learning' },
    { icon: Check, text: 'Mobile app + offline mode' },
    { icon: Check, text: '2025 & 2026 Blueprint ready' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="VoraPrep" className="h-10 dark:hidden" />
            <img src="/logo-white.svg" alt="VoraPrep" className="h-10 hidden dark:block" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link>
            <Link to="/#comparison" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Compare</Link>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Pricing</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-bold mb-6">
              <Gift className="w-4 h-4" />
              BETA - 100% FREE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Free During Beta
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Full access to everything. No credit card required. Help us build the best CPA review platform.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-12">
            
            {/* Price Section */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-center text-white">
              <div className="text-6xl font-bold mb-2">$0</div>
              <div className="text-green-100 text-lg">Everything included • No credit card</div>
            </div>

            {/* Features Grid */}
            <div className="p-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 text-center">
                Everything you need to pass the CPA exam
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Gift className="w-5 h-5" />
                  Start Free Today
                </Link>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Join CPA candidates preparing smarter • No credit card required
                </p>
              </div>
            </div>
          </div>

          {/* Why Free Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-12 border border-blue-100 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
              Why is VoraPrep free?
            </h2>
            <div className="max-w-2xl mx-auto space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                We're in beta and building something special. We need your feedback to make VoraPrep 
                the best CPA prep platform available.
              </p>
              <p>
                In exchange for your input, you get full access to everything — no limits, no catches. 
                When we're ready for paid plans, beta users keep their access.
              </p>
              <div className="flex items-center gap-3 pt-4">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-slate-900 dark:text-white">Be a founding member. Shape the future of CPA prep.</span>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              More Exams Coming Soon
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              We're expanding to help you pass more professional certifications.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Calculator, name: 'CMA', subtitle: 'Certified Management Accountant' },
                { icon: FileText, name: 'EA', subtitle: 'Enrolled Agent' },
                { icon: ClipboardCheck, name: 'CIA', subtitle: 'Certified Internal Auditor' },
              ].map((exam) => {
                const Icon = exam.icon;
                return (
                  <div
                    key={exam.name}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
                      <Icon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{exam.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{exam.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
              Questions?
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Is it really free?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Yes. During beta, everything is 100% free with no credit card required. We're focused 
                  on building a great product and getting your feedback.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  What happens after beta?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  We'll introduce paid plans for new users. Beta users who helped us build VoraPrep 
                  will be taken care of.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  How does VoraPrep compare to Becker?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Becker costs $3,000+ and access expires. VoraPrep covers the same material with modern 
                  AI-powered learning. And right now, it's free.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-300 mb-2">
              Questions? We'd love to hear from you.
            </p>
            <a
              href="mailto:support@voraprep.com"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              support@voraprep.com
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;

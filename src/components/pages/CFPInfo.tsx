import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  ExternalLink, 
  FileText, 
  GraduationCap, 
  Info,
  Users,
  Target,
  Heart
} from 'lucide-react';

const CFPInfo = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
            About the CFP Exam
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Everything you need to know about the Certified Financial Planner certification.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.cfp.net/get-certified/certification-process/register-for-exam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-green-400 transition-colors"
          >
            <Calendar size={18} />
            Schedule Exam
          </a>
          <a
            href="https://www.cfp.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <ExternalLink size={18} />
            CFP Board
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* What is a CFP? */}
          <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                <GraduationCap size={24} />
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">What is a CFP?</h2>
                <p className="text-gray-300 leading-relaxed">
                  A Certified Financial Planner (CFP) is a professional designation granted by the CFP Board to individuals who meet rigorous education, examination, experience, and ethics requirements. CFP professionals provide comprehensive financial planning services including retirement, investment, tax, estate, and insurance planning.
                </p>
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
                  <p className="text-sm text-gray-400 italic">
                    "CFP certification is the standard of excellence for financial planning. It tells clients that you have the knowledge, skills, and ethics to provide professional financial planning services in their best interest." — CFP Board
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Fiduciary Standard */}
          <section className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-700/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl text-green-400">
                <Heart size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Fiduciary Standard</h2>
                <p className="text-sm text-green-300">Client's best interest always comes first</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              CFP professionals are held to a fiduciary standard, meaning they must act in their clients' best interests at all times when providing financial planning advice. This includes a duty of loyalty, duty of care, and duty to follow client instructions.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                <span className="text-xs text-green-400 font-medium">Duty of Loyalty</span>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                <span className="text-xs text-green-400 font-medium">Duty of Care</span>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                <span className="text-xs text-green-400 font-medium">Duty to Follow</span>
              </div>
            </div>
          </section>

          {/* Exam Structure */}
          <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <BookOpen size={24} />
              </div>
              <h2 className="text-xl font-semibold text-white">Exam Domains</h2>
            </div>
            
            <p className="text-gray-400 text-sm mb-6">
              The CFP exam tests knowledge across 8 principal knowledge domains, with questions integrated across topics to reflect real-world financial planning scenarios.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-green-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">Professional Conduct & Regulation</h3>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">~13%</span>
                </div>
                <p className="text-sm text-gray-400">
                  CFP Board Standards, fiduciary duty, compliance, and regulatory requirements.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-green-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">General Financial Planning Principles</h3>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">~17%</span>
                </div>
                <p className="text-sm text-gray-400">
                  Financial planning process, communication, behavioral finance, and economics.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-green-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">Risk Management & Insurance</h3>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">~11%</span>
                </div>
                <p className="text-sm text-gray-400">
                  Life, health, disability, property, liability insurance, and risk analysis.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-green-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">Investment Planning</h3>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">~17%</span>
                </div>
                <p className="text-sm text-gray-400">
                  Investment products, theory, portfolio management, and asset allocation.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-green-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">Tax Planning</h3>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">~14%</span>
                </div>
                <p className="text-sm text-gray-400">
                  Income tax fundamentals, calculations, planning strategies, and tax-advantaged accounts.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-green-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">Retirement Savings & Income Planning</h3>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">~18%</span>
                </div>
                <p className="text-sm text-gray-400">
                  Qualified plans, Social Security, distribution strategies, and retirement income.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-green-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">Estate Planning</h3>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">~10%</span>
                </div>
                <p className="text-sm text-gray-400">
                  Estate transfer documents, trusts, gift and estate taxes, and incapacity planning.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-green-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">Psychology of Financial Planning</h3>
                  <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">Throughout</span>
                </div>
                <p className="text-sm text-gray-400">
                  Client behavior, communication techniques, counseling skills (integrated across domains).
                </p>
              </div>
            </div>
          </section>

          {/* Steps to Become a CFP */}
          <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                <CheckCircle size={24} />
              </div>
              <h2 className="text-xl font-semibold text-white">Steps to CFP Certification</h2>
            </div>

            <ol className="relative border-l border-gray-700 ml-3 space-y-8">
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full -left-3 border border-gray-600 ring-4 ring-gray-900">
                  <span className="text-xs font-bold text-gray-400">E</span>
                </span>
                <h3 className="font-medium text-white mb-1">Education</h3>
                <p className="text-sm text-gray-400">Complete a CFP Board-registered education program covering all principal knowledge topics (bachelor's degree also required).</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full -left-3 border border-gray-600 ring-4 ring-gray-900">
                  <span className="text-xs font-bold text-gray-400">E</span>
                </span>
                <h3 className="font-medium text-white mb-1">Exam</h3>
                <p className="text-sm text-gray-400">Pass the CFP exam: 170 multiple-choice questions across two 3-hour sessions in one testing day.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full -left-3 border border-gray-600 ring-4 ring-gray-900">
                  <span className="text-xs font-bold text-gray-400">E</span>
                </span>
                <h3 className="font-medium text-white mb-1">Experience</h3>
                <p className="text-sm text-gray-400">Complete 6,000 hours of professional experience (4,000 in an apprenticeship) in financial planning or related fields.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full -left-3 border border-gray-600 ring-4 ring-gray-900">
                  <span className="text-xs font-bold text-gray-400">E</span>
                </span>
                <h3 className="font-medium text-white mb-1">Ethics</h3>
                <p className="text-sm text-gray-400">Agree to abide by CFP Board's Standards of Conduct and complete a background check.</p>
              </li>
            </ol>
          </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          
          {/* Quick Stats */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Info size={18} className="text-cyan-400" />
              Quick Facts
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400 text-sm">Testing Windows</span>
                <span className="text-white text-sm font-medium">3x/year</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400 text-sm">Exam Fee</span>
                <span className="text-white text-sm font-medium">$925</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400 text-sm">Total Time</span>
                <span className="text-white text-sm font-medium">~6 Hours</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400 text-sm">Questions</span>
                <span className="text-white text-sm font-medium">170 MCQs</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400 text-sm">Passing Score</span>
                <span className="text-white text-sm font-medium">~65% (est.)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400 text-sm">Case Studies</span>
                <span className="text-white text-sm font-medium">2-3 per exam</span>
              </div>
            </div>
          </div>

          {/* Pass Rates */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Users size={18} className="text-green-400" />
              Recent Pass Rates
            </h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>First-Time Takers</span>
                  <span>~67%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Repeat Takers</span>
                  <span>~52%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '52%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Overall</span>
                  <span>~62%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">Based on CFP Board published data</p>
            </div>
          </div>

          {/* Exam Format */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Target size={18} className="text-amber-400" />
              Exam Format
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">Morning Session</div>
                <p className="text-gray-400 text-xs">85 questions, 3 hours</p>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">Break</div>
                <p className="text-gray-400 text-xs">40-minute scheduled break</p>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">Afternoon Session</div>
                <p className="text-gray-400 text-xs">85 questions, 3 hours</p>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">Case Studies</div>
                <p className="text-gray-400 text-xs">Integrated throughout both sessions</p>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FileText size={18} className="text-amber-400" />
              Essential Resources
            </h3>
            <div className="space-y-2">
              <a href="https://www.cfp.net/get-certified/certification-process/exam-requirement/exam-topics" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
                <div className="text-sm font-medium text-white">Principal Knowledge Topics</div>
                <div className="text-xs text-gray-500">Official exam topic list</div>
              </a>
              <a href="https://www.cfp.net/get-certified" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
                <div className="text-sm font-medium text-white">CFP Certification Path</div>
                <div className="text-xs text-gray-500">Complete requirements guide</div>
              </a>
              <a href="https://www.cfp.net/get-certified/certification-process/register-for-exam" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
                <div className="text-sm font-medium text-white">Register for Exam</div>
                <div className="text-xs text-gray-500">Schedule your testing date</div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CFPInfo;

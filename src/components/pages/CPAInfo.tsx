import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  ExternalLink, 
  FileText, 
  GraduationCap, 
  Info,
  Users,
  Clock,
  Award
} from 'lucide-react';

const CPAInfo = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            About the CPA Exam
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Everything you need to know about the Uniform CPA Examination.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.prometric.com/test-takers/search/aicpa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-blue-400 transition-colors"
          >
            <Calendar size={18} />
            Schedule Exam
          </a>
          <a
            href="https://www.aicpa-cima.com/resources/landing/cpa-exam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ExternalLink size={18} />
            AICPA Information
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* What is a CPA? */}
          <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <GraduationCap size={24} />
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">What is a CPA?</h2>
                <p className="text-gray-300 leading-relaxed">
                  A Certified Public Accountant (CPA) is a licensed accounting professional who has met education and experience requirements and passed the Uniform CPA Examination. CPAs can provide a wide range of services including auditing, tax planning, financial consulting, and business advisory services.
                </p>
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
                  <p className="text-sm text-gray-400 italic">
                    "The CPA credential is the gold standard in accounting and one of the most respected designations in business. CPAs are trusted advisors who help individuals and businesses navigate complex financial and regulatory landscapes." — AICPA
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CPA Evolution 2024 */}
          <section className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-2xl p-6 border border-blue-700/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                <Award size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">CPA Evolution (2024+)</h2>
                <p className="text-sm text-blue-300">New exam structure effective January 2024</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              The CPA Exam has evolved to include 3 Core sections all candidates must pass, plus 1 Discipline section of your choice. This allows CPAs to demonstrate deeper knowledge in a specialized area.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-900/50 p-3 rounded-lg">
                <span className="text-xs text-blue-400 font-medium">Core Sections</span>
                <p className="text-white text-sm">AUD, FAR, REG</p>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg">
                <span className="text-xs text-indigo-400 font-medium">Discipline Choices</span>
                <p className="text-white text-sm">BAR, ISC, or TCP</p>
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={14} className="text-emerald-400" />
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">Blueprint Coverage</span>
              </div>
              <p className="text-gray-300 text-xs">
                Our content covers <strong className="text-white">both</strong> the current blueprint (through June 30, 2026) and the new blueprint (July 1, 2026+). You're prepared for either version.
              </p>
            </div>
          </section>

          {/* Exam Structure */}
          <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                <BookOpen size={24} />
              </div>
              <h2 className="text-xl font-semibold text-white">Exam Sections</h2>
            </div>
            
            <div className="space-y-4">
              {/* Core Sections */}
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Core Sections (Required)</h3>
              
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">AUD - Auditing and Attestation</h3>
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">4 Hours</span>
                </div>
                <p className="text-sm text-gray-400">
                  Ethics, professional responsibilities, audit engagements, attestation engagements, and review services.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">FAR - Financial Accounting and Reporting</h3>
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">4 Hours</span>
                </div>
                <p className="text-sm text-gray-400">
                  Conceptual framework, financial statements, assets, liabilities, equity, transactions, governmental accounting.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">REG - Taxation and Regulation</h3>
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">4 Hours</span>
                </div>
                <p className="text-sm text-gray-400">
                  Ethics, professional responsibilities, federal taxation, business law, and federal tax procedures.
                </p>
              </div>

              {/* Discipline Sections */}
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mt-6">Discipline Sections (Choose One)</h3>
              
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-indigo-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">BAR - Business Analysis and Reporting</h3>
                  <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">4 Hours</span>
                </div>
                <p className="text-sm text-gray-400">
                  Technical accounting and reporting, financial statements, select transactions, and state and local government concepts.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-indigo-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">ISC - Information Systems and Controls</h3>
                  <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">4 Hours</span>
                </div>
                <p className="text-sm text-gray-400">
                  Information systems, IT infrastructure, security, availability, processing integrity, data management.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-indigo-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">TCP - Tax Compliance and Planning</h3>
                  <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">4 Hours</span>
                </div>
                <p className="text-sm text-gray-400">
                  Tax compliance, planning strategies for individuals, entities, property transactions, and special tax situations.
                </p>
              </div>
            </div>
          </section>

          {/* Steps to Become a CPA */}
          <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                <CheckCircle size={24} />
              </div>
              <h2 className="text-xl font-semibold text-white">Steps to Become a CPA</h2>
            </div>

            <ol className="relative border-l border-gray-700 ml-3 space-y-8">
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full -left-3 border border-gray-600 ring-4 ring-gray-900">
                  <span className="text-xs font-bold text-gray-400">1</span>
                </span>
                <h3 className="font-medium text-white mb-1">Meet Education Requirements</h3>
                <p className="text-sm text-gray-400">150 semester hours (usually bachelor's + 30 credits), including specific accounting and business courses.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full -left-3 border border-gray-600 ring-4 ring-gray-900">
                  <span className="text-xs font-bold text-gray-400">2</span>
                </span>
                <h3 className="font-medium text-white mb-1">Pass the CPA Exam</h3>
                <p className="text-sm text-gray-400">Pass all 4 sections (3 Core + 1 Discipline) with a score of 75 or higher within an 18-month rolling window.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full -left-3 border border-gray-600 ring-4 ring-gray-900">
                  <span className="text-xs font-bold text-gray-400">3</span>
                </span>
                <h3 className="font-medium text-white mb-1">Gain Experience</h3>
                <p className="text-sm text-gray-400">Complete 1-2 years of relevant work experience under a licensed CPA (varies by state).</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full -left-3 border border-gray-600 ring-4 ring-gray-900">
                  <span className="text-xs font-bold text-gray-400">4</span>
                </span>
                <h3 className="font-medium text-white mb-1">Apply for License</h3>
                <p className="text-sm text-gray-400">Submit application to your state board of accountancy and pass ethics exam if required.</p>
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
                <span className="text-gray-400 text-sm">Testing Window</span>
                <span className="text-white text-sm font-medium">Year-round</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400 text-sm">Exam Fee</span>
                <span className="text-white text-sm font-medium">~$240/section</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400 text-sm">Time per Section</span>
                <span className="text-white text-sm font-medium">4 Hours</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400 text-sm">Question Format</span>
                <span className="text-white text-sm font-medium">MCQs + TBS</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400 text-sm">Passing Score</span>
                <span className="text-white text-sm font-medium">75 (scaled)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400 text-sm">Credit Window</span>
                <span className="text-white text-sm font-medium">18 months</span>
              </div>
            </div>
          </div>

          {/* Pass Rates */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Users size={18} className="text-blue-400" />
              Recent Pass Rates (2024)
            </h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>AUD</span>
                  <span>~46%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '46%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>FAR</span>
                  <span>~43%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '43%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>REG</span>
                  <span>~59%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '59%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Disciplines (Avg)</span>
                  <span>~55%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">Based on NASBA published data</p>
            </div>
          </div>

          {/* Exam Format */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Clock size={18} className="text-amber-400" />
              Section Format
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">Testlets</div>
                <p className="text-gray-400 text-xs">5 testlets: 2 MCQ + 3 TBS</p>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">MCQs</div>
                <p className="text-gray-400 text-xs">50-60% of score weight</p>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <div className="font-medium text-white mb-1">Task-Based Simulations</div>
                <p className="text-gray-400 text-xs">40-50% of score weight</p>
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
              <a href="https://www.aicpa-cima.com/resources/download/cpa-exam-blueprints" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-amber-500/50 transition-colors">
                <div className="text-sm font-medium text-white">CPA Exam Blueprints</div>
                <div className="text-xs text-gray-500">Official exam content guides</div>
              </a>
              <a href="https://nasba.org/exams/cpaexam/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-amber-500/50 transition-colors">
                <div className="text-sm font-medium text-white">NASBA CPA Portal</div>
                <div className="text-xs text-gray-500">Application & scoring info</div>
              </a>
              <a href="https://www.prometric.com/test-takers/search/aicpa" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-amber-500/50 transition-colors">
                <div className="text-sm font-medium text-white">Prometric Scheduling</div>
                <div className="text-xs text-gray-500">Book your exam date</div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CPAInfo;

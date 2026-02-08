import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  ExternalLink, 
  FileText, 
  GraduationCap, 
  Info,
  Users
} from 'lucide-react';

const EAInfo = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
            About the Enrolled Agent Exam
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Everything you need to know about the Special Enrollment Examination (SEE).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.prometric.com/test-takers/search/irs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-emerald-400 transition-colors"
          >
            <Calendar size={18} />
            Schedule Exam
          </a>
          <a
            href="https://www.irs.gov/tax-professionals/enrolled-agents/become-an-enrolled-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <ExternalLink size={18} />
            IRS Information
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* What is an EA? */}
          <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <GraduationCap size={24} />
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">What is an Enrolled Agent?</h2>
                <p className="text-gray-300 leading-relaxed">
                  An Enrolled Agent (EA) is a federally-authorized tax practitioner who has technical expertise in the field of taxation and who is empowered by the U.S. Department of the Treasury to represent taxpayers before all administrative levels of the Internal Revenue Service for audits, collections, and appeals.
                </p>
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
                  <p className="text-sm text-gray-400 italic">
                    "Enrolled agent status is the highest credential the IRS awards. Individuals who obtain this status must adhere to ethical standards and complete 72 hours of continuing education courses every three years." — IRS.gov
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Exam Structure */}
          <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <BookOpen size={24} />
              </div>
              <h2 className="text-xl font-semibold text-white">Exam Structure (The SEE)</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">Part 1: Individuals</h3>
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">100 MCQs</span>
                </div>
                <p className="text-sm text-gray-400">
                  Taxpayer data, income, deductions, credits, taxation, and advice for individuals.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">Part 2: Businesses</h3>
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">100 MCQs</span>
                </div>
                <p className="text-sm text-gray-400">
                  Business entities, partnerships, corporations, business financial information, specific business items.
                </p>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">Part 3: Representation, Practices and Procedures</h3>
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">100 MCQs</span>
                </div>
                <p className="text-sm text-gray-400">
                  Practice before the IRS, requirements for enrolled agents, representation, ethics (Circular 230), completion of filing process.
                </p>
              </div>
            </div>
          </section>

          {/* Steps to Become an EA */}
          <section className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                <CheckCircle size={24} />
              </div>
              <h2 className="text-xl font-semibold text-white">Steps to Become an EA</h2>
            </div>

            <ol className="relative border-l border-gray-700 ml-3 space-y-8">
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full -left-3 border border-gray-600 ring-4 ring-gray-900">
                  <span className="text-xs font-bold text-gray-400">1</span>
                </span>
                <h3 className="font-medium text-white mb-1">Obtain a PTIN</h3>
                <p className="text-sm text-gray-400">Get a Preparer Tax Identification Number from the IRS.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full -left-3 border border-gray-600 ring-4 ring-gray-900">
                  <span className="text-xs font-bold text-gray-400">2</span>
                </span>
                <h3 className="font-medium text-white mb-1">Pass the SEE</h3>
                <p className="text-sm text-gray-400">Pass all 3 parts of the Special Enrollment Examination within a 2-year period.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full -left-3 border border-gray-600 ring-4 ring-gray-900">
                  <span className="text-xs font-bold text-gray-400">3</span>
                </span>
                <h3 className="font-medium text-white mb-1">Apply for Enrollment</h3>
                <p className="text-sm text-gray-400">Submit Form 23 and pay the enrollment fee. Must pass a tax compliance check.</p>
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
                <span className="text-white text-sm font-medium">May 1 - Feb 28</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400 text-sm">Exam Fee</span>
                <span className="text-white text-sm font-medium">$206 per part</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400 text-sm">Time per Part</span>
                <span className="text-white text-sm font-medium">3.5 Hours</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400 text-sm">Questions</span>
                <span className="text-white text-sm font-medium">100 MCQs/part</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400 text-sm">Passing Score</span>
                <span className="text-white text-sm font-medium">105 (scaled)</span>
              </div>
            </div>
          </div>

          {/* Pass Rates */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Users size={18} className="text-emerald-400" />
              Recent Pass Rates
            </h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Part 1 (Individuals)</span>
                  <span>~68%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Part 2 (Businesses)</span>
                  <span>~73%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '73%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Part 3 (Representation)</span>
                  <span>~84%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">Based on recent Prometric data</p>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
             <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FileText size={18} className="text-amber-400" />
              Essential Resources
            </h3>
            <div className="space-y-2">
              <a href="https://www.irs.gov/pub/irs-pdf/p4704.pdf" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-amber-500/50 transition-colors">
                <div className="text-sm font-medium text-white">Candidate Info Bulletin</div>
                <div className="text-xs text-gray-500">Official Prometric Guide</div>
              </a>
               <a href="https://www.irs.gov/tax-professionals/enrolled-agents/enrolled-agent-news" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-amber-500/50 transition-colors">
                <div className="text-sm font-medium text-white">IRS EA News</div>
                <div className="text-xs text-gray-500">Latest updates</div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EAInfo;

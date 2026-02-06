import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calculator, 
  FileText,
  PieChart,
  HelpCircle
} from 'lucide-react';

const MOCK_CASE = {
  id: 'CS-102',
  title: 'The Hamilton Family: Retirement & Education Funding',
  scenario: `
    John (52) and Mary (48) Hamilton have approached you for a comprehensive financial plan. 
    John is a software engineer earning $180,000/yr, and Mary is a freelance graphic designer earning roughly $60,000/yr.
    
    They have two children: Sarah (14) and Michael (11).
    
    Assets:
    - Primary Residence: $850,000 (Mortgage: $320,000 @ 3.5%, 15 years remaining)
    - 401(k) John: $650,000 (60% Equities / 40% Bonds)
    - IRA Mary: $120,000 (100% Equities)
    - 529 Plan Sarah: $45,000
    - 529 Plan Michael: $25,000
    - Cash/Emergency Fund: $35,000
    
    Goals:
    1. Retire when John is 62 (10 years).
    2. Fund 100% of in-state public university for both children.
    3. Purchase a vacation home in 5 years ($500k budget).
    
    Mary is concerned about her freelance income stability and lack of disability insurance. 
    John believes his group life policy (1x Salary) is sufficient.
  `,
  questions: [
    {
      id: 1,
      text: "Based on the Hamilton's current asset allocation and time horizon (10 years to retirement), which adjustment is most appropriate?",
      options: [
        "A) Shift John's 401(k) to 90% Equities to maximize growth for the vacation home.",
        "B) Maintain current allocation but increase savings rate.",
        "C) Rebalance Mary's IRA to include fixed income to reduce volatility risk as retirement approaches.",
        "D) Liquidate the 529 plans to pay down the mortgage."
      ],
      correct: 2,
      rationale: "Mary's IRA is 100% equities which presents significant sequence of returns risk as retirement approaches. Adding fixed income improves diversification."
    },
    {
        id: 2,
        text: "Regarding their insurance coverage, what is the most pressing gap?",
        options: [
            "A) John's life insurance is adequate.",
            "B) Mary needs long-term disability insurance given her freelance status.",
            "C) They need umbrella liability insurance.",
            "D) The children need whole life policies."
        ],
        correct: 1,
        rationale: "Freelancers often lack disability coverage. Loss of Mary's income would jeopardize the education funding goals."
    }
  ]
};

export default function CFPCaseStudy() {
  const [activeTab, setActiveTab] = useState<'scenario' | 'questions'>('scenario');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
       <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/cfp/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Case Study Workshop
              </h1>
            </div>
          </div>
          
           <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium">
               <Calculator className="w-4 h-4" />
               <span className="hidden sm:inline">TVM Calc</span>
             </button>
           </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-4rem)]">
        
        {/* Left Panel: Scenario */}
        <div className={`flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden h-full ${activeTab === 'questions' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                <h2 className="font-semibold text-slate-900 dark:text-white">Case Scenario</h2>
                <span className="text-xs font-mono bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300">{MOCK_CASE.id}</span>
            </div>
            <div className="p-6 overflow-y-auto prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">{MOCK_CASE.title}</h3>
                <div className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    {MOCK_CASE.scenario}
                </div>
                
                {/* Embedded Exhibits Mock */}
                <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 rounded-lg">
                    <h4 className="flex items-center gap-2 text-yellow-800 dark:text-yellow-500 font-bold text-sm uppercase tracking-wide mb-2">
                        <PieChart className="w-4 h-4" /> Exhibit A: Asset Allocation
                    </h4>
                    <div className="h-4 bg-slate-200 rounded-full flex overflow-hidden">
                        <div className="w-[60%] bg-blue-500" title="Equities"></div>
                        <div className="w-[30%] bg-green-500" title="Fixed Income"></div>
                        <div className="w-[10%] bg-slate-400" title="Cash"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1 text-slate-500">
                        <span>Equities</span>
                        <span>Fixed Income</span>
                        <span>Cash</span>
                    </div>
                </div>
            </div>
            
            {/* Mobile Switcher */}
            <div className="lg:hidden p-4 border-t border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setActiveTab('questions')}
                    className="w-full btn btn-primary py-3"
                >
                    Proceed to Questions
                </button>
            </div>
        </div>

        {/* Right Panel: Questions */}
        <div className={`flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden h-full ${activeTab === 'scenario' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                <h2 className="font-semibold text-slate-900 dark:text-white">Analysis Questions</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">2 Questions</span>
                </div>
            </div>
            
            <div className="p-6 overflow-y-auto flex-2 space-y-8">
                {MOCK_CASE.questions.map((q, idx) => (
                    <div key={q.id} className="space-y-4">
                        <div className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500">
                                {idx + 1}
                            </span>
                            <p className="font-medium text-slate-900 dark:text-slate-100 pt-1">{q.text}</p>
                        </div>
                        
                        <div className="pl-12 space-y-3">
                            {q.options.map((opt, optIdx) => (
                                <button
                                    key={optIdx}
                                    onClick={() => !showResults && setAnswers(prev => ({...prev, [q.id]: optIdx}))}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                        answers[q.id] === optIdx
                                            ? showResults 
                                                ? optIdx === q.correct 
                                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                                : 'border-green-600 bg-green-50 dark:bg-green-900/10'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>

                        {showResults && (
                            <div className="ml-12 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm">
                                <p className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4" /> Explanation
                                </p>
                                <p className="text-slate-600 dark:text-slate-400">{q.rationale}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                <button 
                    onClick={() => setActiveTab('scenario')}
                    className="lg:hidden btn btn-secondary"
                >
                    Back to Scenario
                </button>
                
                {!showResults ? (
                     <button 
                        onClick={() => setShowResults(true)}
                        disabled={Object.keys(answers).length < MOCK_CASE.questions.length}
                        className="ml-auto btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        Submit Case Analysis
                     </button>
                ) : (
                    <Link to="/cfp/dashboard" className="ml-auto btn btn-secondary">
                        Return to Dashboard
                    </Link>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}

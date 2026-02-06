import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Target, 
  BarChart, 
  BookOpen, 
  Play
} from 'lucide-react';

export default function CISAInfo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white pt-20 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-xl mb-6 shadow-lg border border-indigo-500">
               <ShieldCheck className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Master the CISA Exam
            </h1>
            <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
              The gold standard for IS audit, control, and security professionals. 
              Our AI-driven platform adapts to your learning style.
            </p>
            <button 
              className="inline-flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              onClick={() => navigate('/cisa/dashboard')}
            >
              <Play className="h-5 w-5" /> Start Studying
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon={<Target className="h-8 w-8 text-indigo-600" />} title="5 Domains" description="Comprehensive coverage of all 5 CISA domains with weighted question distribution." />
          <FeatureCard icon={<BarChart className="h-8 w-8 text-indigo-600" />} title="Adaptive Testing" description="Smart algorithms focus on your weak areas to maximize study efficiency." />
          <FeatureCard icon={<BookOpen className="h-8 w-8 text-indigo-600" />} title="Current Content" description="Updated for the latest CISA job practice areas and standards." />
        </div>
      </div>
      
      {/* Domains */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">What You'll Master</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DomainCard num="1" title="Information Systems Auditing Process" weight="21%" />
          <DomainCard num="2" title="Governance and Management of IT" weight="17%" />
          <DomainCard num="3" title="IS Acquisition, Development & Implementation" weight="12%" />
          <DomainCard num="4" title="IS Operations & Business Resilience" weight="23%" />
          <DomainCard num="5" title="Protection of Information Assets" weight="27%" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
      <div className="bg-indigo-50 dark:bg-indigo-900/30 w-16 h-16 rounded-lg flex items-center justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function DomainCard({ num, title, weight }: { num: string; title: string; weight: string }) {
  return (
    <div className="flex items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 w-10 h-10 rounded-full flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold mr-4">{num}</div>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h4>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">{weight} of Exam</span>
      </div>
    </div>
  );
}

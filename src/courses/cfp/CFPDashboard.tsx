import { 
  BookOpen, 
  Target, 
  Clock, 
  Award, 
  ChevronRight,
  BarChart2,
  Briefcase,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCFPProgress } from '../../hooks/useCFPProgress';
import { CFP_SECTIONS } from './config';
import { PageLoader } from '../../components/common/PageLoader';

export default function CFPDashboard() {
  const navigate = useNavigate();
  const { progress, loading } = useCFPProgress();

  if (loading) {
    return <PageLoader />;
  }

  // Calculate generic progress
  const overallReadiness = progress?.readinessScore || 0;
  const questionsBank = progress?.totalQuestionsAttempted || 0;
  const streak = progress?.streakDays || 0;
  const accuracy = Math.round(progress?.overallAccuracy || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">CFP® Dashboard</h1>
             <span className="px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold border border-green-200 dark:border-green-800">
                2026 Curriculum
             </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">Certified Financial Planner™ Exam Prep</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/cfp/cases')}
            className="group btn border-2 border-slate-200 dark:border-slate-700 hover:border-green-500 hover:text-green-600 flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
          >
            <FileText className="w-4 h-4 text-slate-500 group-hover:text-green-500 transition-colors" />
            Case Studies
          </button>
          <button 
            onClick={() => navigate('/cfp/practice/quick')}
            className="btn bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 flex items-center gap-2"
          >
            <Target className="w-4 h-4" />
            Quick Practice
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6 border-green-100 dark:border-green-900/30 bg-gradient-to-br from-white to-green-50/30 dark:from-slate-800 dark:to-green-900/10">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Overall Readiness</div>
              <Award className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{overallReadiness}%</div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${overallReadiness}%` }}></div>
            </div>
        </div>
        
        <div className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-slate-500">Questions Bank</div>
              <BookOpen className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{questionsBank} <span className="text-sm font-normal text-slate-400">/ 2,400</span></div>
            <p className="text-xs text-slate-500 mt-1">Across 8 Domains</p>
        </div>

        <div className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-slate-500">Study Streak</div>
              <Clock className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{streak} <span className="text-sm font-normal text-slate-400">Days</span></div>
            <p className="text-xs text-slate-500 mt-1">Keep it up!</p>
        </div>

        <div className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-slate-500">Accuracy</div>
              <BarChart2 className="h-4 w-4 text-teal-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{accuracy}%</div>
            <p className="text-xs text-slate-500 mt-1">Last 50 questions</p>
        </div>
      </div>

      {/* Domain Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-slate-500" />
            Knowledge Domains
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {CFP_SECTIONS.map((section) => (
                <div 
                    key={section.id} 
                    className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:border-green-500 dark:hover:border-green-500 transition-all cursor-pointer hover:shadow-lg hover:shadow-green-900/5 relative overflow-hidden"
                    onClick={() => navigate(`/cfp/domain/${section.id}`)}
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 opacity-20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                             section.id.includes('ETHICS') ? 'bg-amber-100 text-amber-600' :
                             section.id.includes('TAX') ? 'bg-red-100 text-red-600' :
                             section.id.includes('INV') ? 'bg-blue-100 text-blue-600' :
                             'bg-green-100 text-green-600'
                        } dark:bg-opacity-20`}>
                             <span className="font-bold text-sm">{section.shortName.substring(0, 2)}</span>
                        </div>
                        <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
                             Weight: {section.weight}
                        </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-green-600 transition-colors line-clamp-1">{section.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 min-h-[40px]">
                        Master {section.blueprintAreas?.length || 3} key topic areas including {section.blueprintAreas?.[0]?.name || 'fundamentals'}.
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400">Progress</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">0%</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

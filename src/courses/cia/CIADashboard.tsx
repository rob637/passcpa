
import React from 'react';
import { 
  BookOpen, 
  Target, 
  Clock, 
  Award, 
  ChevronRight,
  BarChart2,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCIAProgress } from '../../hooks/useCIAProgress';
import { CIA_SECTION_CONFIG, CIASectionId } from '../../utils/ciaStudyPlanner';
import { PageLoader } from '../../components/common/PageLoader';

export default function CIADashboard() {
  const navigate = useNavigate();
  const { progress, loading } = useCIAProgress();

  if (loading) {
    return <PageLoader />;
  }

  const sections: CIASectionId[] = ['CIA1', 'CIA2', 'CIA3'];

  // Calculate generic progress if minimal data
  const overallReadiness = progress?.overall.readinessScore || 0;
  const questionsBank = progress?.overall.totalQuestionsAttempted || 0;
  const streak = progress?.overall.streakDays || 0;
  const accuracy = Math.round(progress?.overall.overallAccuracy || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">CIA Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Certified Internal Auditor Exam Prep</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/cia/study-plan')}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Study Plan
          </button>
          <button 
            onClick={() => navigate('/cia/practice/quick')}
            className="btn btn-primary flex items-center gap-2"
          >
            <Target className="w-4 h-4" />
            Quick Practice
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-slate-500">Overall Readiness</div>
              <Award className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{overallReadiness}%</div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${overallReadiness}%` }}></div>
            </div>
        </div>
        
        <div className="card p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-slate-500">Questions Bank</div>
              <BookOpen className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{questionsBank}</div>
            <p className="text-xs text-slate-500 mt-1">Questions answered</p>
        </div>

        <div className="card p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-slate-500">Study Streak</div>
              <Clock className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{streak}</div>
            <p className="text-xs text-slate-500 mt-1">Current day streak</p>
        </div>

        <div className="card p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-slate-500">Average Score</div>
              <BarChart2 className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{accuracy}%</div>
            <p className="text-xs text-slate-500 mt-1">Across all sections</p>
        </div>
      </div>

      {/* Parts Sections */}
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4">Exam Parts</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sections.map((sectionId) => {
            const secProgress = progress?.sections[sectionId]?.progressPercent || 0;
            const secQuestions = progress?.sections[sectionId]?.questionsAttempted || 0;
            const secAccuracy = Math.round(progress?.sections[sectionId]?.accuracy || 0);
            
            return (
          <div 
            key={sectionId} 
            className="card card-interactive p-0 flex flex-col h-full cursor-pointer hover:scale-[1.01] transition-transform" 
            onClick={() => navigate(`/cia/section/${sectionId}`)}
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: CIA_SECTION_CONFIG[sectionId].color }}>
                        {CIA_SECTION_CONFIG[sectionId].shortName}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 leading-tight">{CIA_SECTION_CONFIG[sectionId].name}</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </div>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-end space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Progress</span>
                            <span className="font-medium text-slate-900 dark:text-slate-100">{secProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="h-2 rounded-full" style={{ width: `${secProgress}%`, backgroundColor: CIA_SECTION_CONFIG[sectionId].color }}></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded text-center">
                             <div className="text-xs text-slate-500">Questions</div>
                             <div className="font-semibold text-slate-900 dark:text-slate-100">{secQuestions}</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded text-center">
                             <div className="text-xs text-slate-500">Accuracy</div>
                             <div className="font-semibold text-slate-900 dark:text-slate-100">{secAccuracy}%</div>
                        </div>
                    </div>
                    <button 
                        className="btn btn-outline w-full mt-2" 
                        style={{ borderColor: CIA_SECTION_CONFIG[sectionId].color, color: CIA_SECTION_CONFIG[sectionId].color }}
                    >
                        Study {sectionId}
                    </button>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}

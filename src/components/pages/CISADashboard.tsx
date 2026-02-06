import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Target, 
  Calendar, 
  TrendingUp, 
  Clock,
  ChevronRight,
} from 'lucide-react';
import { CISA_SECTIONS } from '../../courses/cisa';

export default function CISADashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const progress = {
    overall: 15,
    readiness: 42,
    studyStreak: 3,
    sections: {
      CISA1: { progress: 35, mastery: 60 },
      CISA2: { progress: 10, mastery: 25 },
      CISA3: { progress: 0, mastery: 0 },
      CISA4: { progress: 0, mastery: 0 },
      CISA5: { progress: 0, mastery: 0 },
    } as Record<string, { progress: number; mastery: number }>
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CISA Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Certified Information Systems Auditor</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/cisa/study-plan')}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Calendar className="h-4 w-4" /> Study Plan
          </button>
          <button 
            onClick={() => navigate('/cisa-exam')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Play className="h-4 w-4" /> Launch Exam Sim
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Overall Progress" value={`${progress.overall}%`} subtitle="Keep going!" icon={<Target className="h-6 w-6 text-indigo-600" />} bg="bg-indigo-50 dark:bg-indigo-900/30" />
        <StatCard title="Exam Readiness" value={`${progress.readiness}%`} subtitle="Based on mock exams" icon={<TrendingUp className="h-6 w-6 text-green-600" />} bg="bg-green-50 dark:bg-green-900/30" />
        <StatCard title="Study Streak" value={`${progress.studyStreak} Days`} subtitle="Consistency is key" icon={<Clock className="h-6 w-6 text-amber-600" />} bg="bg-amber-50 dark:bg-amber-900/30" />
        <StatCard title="Days to Exam" value="128" subtitle="June 15, 2026" icon={<Calendar className="h-6 w-6 text-blue-600" />} bg="bg-blue-50 dark:bg-blue-900/30" />
      </div>

      {/* Domains */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Exam Domains</h2>
        <div className="grid grid-cols-1 gap-4">
          {CISA_SECTIONS.map((section) => (
            <button 
              key={section.id} 
              onClick={() => navigate(`/cisa/section/${section.id}`)}
              className="group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer flex items-center gap-4 w-full text-left"
            >
              <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center text-white font-bold shrink-0`}>
                {section.id.replace('CISA', '')}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">{section.title}</h3>
                <p className="text-sm text-gray-500 truncate">{section.description}</p>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <div className="flex flex-col items-end w-24">
                  <span className="text-xs text-gray-400 mb-1">Progress</span>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${progress.sections[section.id]?.progress || 0}%` }}></div>
                  </div>
                </div>
                <div className="flex flex-col items-center w-16">
                  <span className="text-xs text-gray-400 mb-1">Weight</span>
                  <span className="text-sm font-medium bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">{section.weight}%</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, bg }: { title: string; value: string; subtitle: string; icon: React.ReactNode; bg: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${bg}`}>{icon}</div>
      </div>
    </div>
  );
}

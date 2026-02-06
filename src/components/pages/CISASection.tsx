import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, BookOpen, Target, CheckCircle } from 'lucide-react';
import { CISA_SECTION_CONFIG, CISASectionId } from '../../courses/cisa';

export default function CISASection() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const sectionId = id as CISASectionId;
  const config = CISA_SECTION_CONFIG[sectionId];

  if (!config) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Section not found</p>
        <button onClick={() => navigate('/cisa/dashboard')} className="mt-4 text-indigo-600 hover:underline">Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <button 
        onClick={() => navigate('/cisa/dashboard')}
        className="inline-flex items-center gap-1 text-gray-500 hover:text-indigo-600 mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                {config.shortTitle}
              </span>
              <span className="text-gray-500 text-sm">{config.weight}% of Exam</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{config.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{config.description}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Key Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.topics.map((topic, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modules placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Study Modules</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:border-indigo-200 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600">Module {item}: Concepts & Application</p>
                      <p className="text-sm text-gray-500">20 mins · 5 practice questions</p>
                    </div>
                  </div>
                  <Play className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-4">
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Your Progress</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Completion</span>
                  <span className="font-semibold text-gray-900 dark:text-white">35%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Mastery Score</span>
                  <span className="font-semibold text-green-600">60%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100 dark:border-gray-700 space-y-3">
                <button 
                  onClick={() => navigate('/cisa-exam')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Play className="w-4 h-4" /> Practice Domain
                </button>
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Target className="w-4 h-4" /> Take Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { generateCISAStudyPlan } from '../../utils/cisaStudyPlanner';

export default function CISAStudyPlanSetup() {
  const navigate = useNavigate();
  const [examDate, setExamDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examDate) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const plan = generateCISAStudyPlan(new Date(examDate));
    console.log('Generated Plan:', plan);
    
    setLoading(false);
    navigate('/cisa/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Set Your CISA Target
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          We'll build a personalized roadmap covering all 5 domains.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="exam-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                When is your exam?
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  id="exam-date"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:[color-scheme:dark]"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Undecided? Pick a tentative date 3-4 months out.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !examDate}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Generate My Plan'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

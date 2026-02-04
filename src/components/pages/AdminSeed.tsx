import { Link } from 'react-router-dom';
import { ArrowLeft, Database, CheckCircle } from 'lucide-react';

/**
 * AdminSeed - Legacy page, seeding is no longer needed
 * Questions are now stored in local TypeScript files
 */
const AdminSeed: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <Link 
          to="/admin/cms" 
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </Link>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Seeding Not Required
              </h1>
              <p className="text-slate-600 dark:text-slate-300">Questions use local storage</p>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Local-First Architecture</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Questions are stored in TypeScript files at <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">src/data/questions/</code> for:
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 list-disc list-inside space-y-1">
                  <li>Fast loading (no network delay)</li>
                  <li>Offline support</li>
                  <li>Version control via git</li>
                  <li>Zero database costs</li>
                </ul>
              </div>
            </div>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            To add or modify questions:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300 mb-6">
            <li>Edit files in <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">src/data/questions/</code></li>
            <li>Run <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">npm run build</code></li>
            <li>Deploy with <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">firebase deploy</code></li>
          </ol>
          
          <Link 
            to="/admin/questions"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Question Bank →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSeed;

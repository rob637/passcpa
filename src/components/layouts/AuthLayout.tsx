import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo.svg" 
              alt="VoraPrep" 
              className="h-10 dark:hidden" 
            />
            <img 
              src="/logo-white.svg" 
              alt="VoraPrep" 
              className="h-10 hidden dark:block" 
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 px-4 py-2 transition-colors text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen pt-20 pb-8 px-4 safe-top safe-bottom">
        <div className="w-full max-w-md">
          <Outlet />
          
          {/* Footer */}
          <p className="text-center text-slate-400 dark:text-slate-500 text-sm mt-8">
            © {new Date().getFullYear()} VoraPrep. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

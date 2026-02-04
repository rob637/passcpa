import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      
      {/* Navigation - NOT fixed, flows with content */}
      <nav 
        className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800"
        aria-label="Main navigation"
      >
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
      <main id="main-content" className="py-8 px-4">
        <div className="w-full max-w-md mx-auto">
          <Outlet />
          
          {/* Footer */}
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-8">
            © {new Date().getFullYear()} VoraPrep. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;

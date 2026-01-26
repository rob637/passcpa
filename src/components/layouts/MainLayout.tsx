import { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Target, BarChart3, Settings, Flame } from 'lucide-react';
import { useStudy } from '../../hooks/useStudy';
import { useRouteTitle, ROUTE_TITLES } from '../../hooks/useDocumentTitle';
import { usePageTracking } from '../../hooks/usePageTracking';
import clsx from 'clsx';

// Navigation items with tour IDs
const NAV_ITEMS = [
  { path: '/dashboard', icon: Home, label: 'Dashboard', tourId: 'dashboard' },
  { path: '/study', icon: BookOpen, label: 'Study', tourId: 'study' },
  { path: '/practice', icon: Target, label: 'Practice', tourId: 'practice' },
  { path: '/progress', icon: BarChart3, label: 'Progress', tourId: 'progress' },
  { path: '/settings', icon: Settings, label: 'Settings', tourId: 'settings' },
];

interface ProgressRingProps {
  progress?: number;
  size?: number;
  strokeWidth?: number;
}

// Mini progress ring component
const ProgressRing = ({ progress = 0, size = 32, strokeWidth = 3 }: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="progress-ring transform -rotate-90">
      <circle
        className="text-slate-200"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="text-primary-600 transition-all duration-500 ease-out"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
        }}
      />
    </svg>
  );
};

const MainLayout = () => {
  const location = useLocation();
  const { currentStreak, dailyProgress } = useStudy();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Set document title based on route
  useRouteTitle();

  // Track page views for analytics
  usePageTracking();

  // Skip to main content handler
  const handleSkipToMain = () => {
    mainRef.current?.focus();
    mainRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Track scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate nav indicator
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;


    const activeIndex = NAV_ITEMS.findIndex(
      (item) => location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    );

    if (activeIndex >= 0) {
      const navItems = navRef.current.querySelectorAll('.nav-link');
      const activeItem = navItems[activeIndex];

      if (activeItem) {
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        // 24 is roughly half width of indicator if it's 48px? No, 24 is offset.
        // If indicator is w-12 (48px), center is 24px.
        const left = itemRect.left - navRect.left + itemRect.width / 2 - 24;

        indicatorRef.current.style.transform = `translateX(${left}px)`;
        indicatorRef.current.style.opacity = '1';
      }
    }
  }, [location.pathname]);


  // Get current page title
  const getPageTitle = () => {
    const current = NAV_ITEMS.find(
      (item) => location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    );
    if (current) return current.label;
    
    // Fallback using ROUTE_TITLES
    const path = location.pathname;
    return ROUTE_TITLES[path] || 'PassCPA';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row safe-top safe-bottom">
      {/* Skip Navigation Link - Accessibility */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          handleSkipToMain();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Desktop Sidebar */}
      <aside 
        className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-screen sticky top-0 z-40"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-soft-md">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h1 className="font-bold text-xl text-slate-900">PassCPA</h1>
          </div>

          <div className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium',
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Daily Goal
              </span>
              <span className="text-xs font-bold text-primary-600">{dailyProgress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${dailyProgress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{currentStreak} day streak!</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header
        className={clsx(
          'md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-800 z-40 transition-shadow duration-200 safe-top',
          scrolled && 'shadow-md'
        )}
        role="banner"
      >
        <div className="flex items-center justify-between px-4 h-16">
          <div className="font-bold text-lg text-slate-900 dark:text-slate-100">{getPageTitle()}</div>
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 dark:bg-orange-900/30 rounded-lg border border-orange-100 dark:border-orange-800"
              aria-label={`${currentStreak} day streak`}
            >
              <Flame className="w-4 h-4 text-orange-500" aria-hidden="true" />
              <span className="text-sm font-bold text-orange-700 dark:text-orange-400">{currentStreak}</span>
            </div>
            <ProgressRing progress={dailyProgress} size={32} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        role="main"
        aria-label="Main content"
        className="flex-1 w-full max-w-5xl mx-auto p-4 pb-24 md:p-8 md:pb-8 pt-20 md:pt-8 focus:outline-none"
      >
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav
        ref={navRef}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 pb-safe z-50 safe-bottom"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="relative flex items-center justify-around h-16">
          {/* Active Indicator */}
          <div
            ref={indicatorRef}
            className="absolute top-0 w-12 h-1 bg-primary-600 rounded-b-full transition-all duration-300 ease-out opacity-0 pointer-events-none"
            style={{ left: 0 }}
            aria-hidden="true"
          />

          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              aria-label={item.label}
              className={({ isActive }) =>
                clsx(
                  'nav-link flex flex-col items-center justify-center w-full h-full gap-1',
                  isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500'
                )
              }
            >
              <item.icon className="w-6 h-6" aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;

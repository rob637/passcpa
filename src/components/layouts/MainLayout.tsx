import { useState, useEffect, useRef, useMemo } from 'react';
import { Outlet, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { Home, BookOpen, User, Flame, Compass, WifiOff } from 'lucide-react';
import { useStudy } from '../../hooks/useStudy';
import { useRouteTitle, ROUTE_TITLES } from '../../hooks/useDocumentTitle';
import { usePageTracking } from '../../hooks/usePageTracking';
import { useTheme } from '../../providers/ThemeProvider';
import { CourseSelector } from '../common/CourseSelector';
import { useCourse } from '../../providers/CourseProvider';
import { CourseId } from '../../types/course';
import { detectCourseFromPath, COURSE_HOME_PATHS } from '../../utils/courseNavigation';
import clsx from 'clsx';

// Course-specific navigation paths (extended from shared utility)
const COURSE_NAV_PATHS: Record<CourseId, { home: string; learn: string; you: string; strategy: string }> = {
  cpa: { home: '/home', learn: '/learn', you: '/you', strategy: '/lessons?section=PREP' },
  ea: { home: '/ea', learn: '/ea', you: '/you', strategy: '/ea' },
  cma: { home: '/cma/dashboard', learn: '/cma/dashboard', you: '/you', strategy: '/cma/dashboard' },
  cia: { home: '/cia/dashboard', learn: '/cia/dashboard', you: '/you', strategy: '/cia/dashboard' },
  cfp: { home: '/cfp/dashboard', learn: '/cfp/dashboard', you: '/you', strategy: '/cfp/dashboard' },
  cisa: { home: '/cisa/dashboard', learn: '/cisa/dashboard', you: '/you', strategy: '/cisa/dashboard' },
};

// Base nav item structure
interface NavItem {
  icon: typeof Home;
  label: string;
  tourId: string;
}

const NAV_ITEM_CONFIG: NavItem[] = [
  { icon: Home, label: 'Home', tourId: 'home' },
  { icon: BookOpen, label: 'Learn', tourId: 'learn' },
  { icon: User, label: 'You', tourId: 'you' },
];

// Check if current path is active for a given nav type in a course
const isNavActiveForCourse = (navType: 'home' | 'learn' | 'you', pathname: string, courseId: CourseId): boolean => {
  const paths = COURSE_NAV_PATHS[courseId];
  const targetPath = paths[navType];
  
  // For CPA, check the various CPA-specific paths
  if (courseId === 'cpa') {
    if (navType === 'home') {
      return ['/home', '/practice', '/flashcards', '/quiz', '/exam', '/tbs', '/written-communication', '/ai-tutor', '/tutor'].some(p => 
        pathname === p || pathname.startsWith(p + '/')
      );
    }
    if (navType === 'learn') {
      return ['/learn', '/lessons'].some(p => pathname === p || pathname.startsWith(p + '/'));
    }
    if (navType === 'you') {
      return ['/you', '/progress', '/settings', '/achievements', '/community'].some(p => 
        pathname === p || pathname.startsWith(p + '/')
      );
    }
  }
  
  // For other courses, match the base path
  return pathname === targetPath || pathname.startsWith(targetPath.split('?')[0]);
};

// Check if Strategy nav is active (only for CPA)
const isStrategyActive = (pathname: string, searchParams: URLSearchParams, courseId: CourseId): boolean => {
  if (courseId !== 'cpa') return false;
  return pathname === '/lessons' && searchParams.get('section') === 'PREP';
};

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
  const [searchParams] = useSearchParams();
  const { currentStreak, dailyProgress } = useStudy();
  const { courseId: providerCourseId } = useCourse();
  
  // Detect course from URL - this takes precedence to prevent bleeding
  const currentCourseId = useMemo(() => detectCourseFromPath(location.pathname), [location.pathname]);
  
  // Get course-specific nav paths
  const navPaths = useMemo(() => COURSE_NAV_PATHS[currentCourseId], [currentCourseId]);
  
  // Build nav items with course-specific paths
  const navItems = useMemo(() => [
    { path: navPaths.home, icon: Home, label: 'Home', tourId: 'home', navType: 'home' as const },
    { path: navPaths.learn, icon: BookOpen, label: 'Learn', tourId: 'learn', navType: 'learn' as const },
    { path: navPaths.you, icon: User, label: 'You', tourId: 'you', navType: 'you' as const },
  ], [navPaths]);
  const { darkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  
  // Check if Strategy section is active (CPA only)
  const strategyActive = isStrategyActive(location.pathname, searchParams, currentCourseId);
  
  // Strategy nav path (CPA only)
  const strategyNavPath = navPaths.strategy;

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

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Animate nav indicator
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;

    // Find active index - check Strategy first (CPA only), then regular nav items
    let activeIndex = -1;
    
    if (strategyActive && currentCourseId === 'cpa') {
      // Strategy is the 4th item (index 3) for CPA
      activeIndex = navItems.length;
    } else {
      activeIndex = navItems.findIndex(
        (item) => isNavActiveForCourse(item.navType, location.pathname, currentCourseId)
      );
    }

    if (activeIndex >= 0) {
      const navElements = navRef.current.querySelectorAll('.nav-link');
      const activeItem = navElements[activeIndex];

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
  }, [location.pathname, strategyActive, navItems, currentCourseId]);


  // Get current page title
  const getPageTitle = () => {
    // Check Strategy first (CPA only)
    if (strategyActive && currentCourseId === 'cpa') return 'Exam Strategy';
    
    const current = navItems.find(
      (item) => isNavActiveForCourse(item.navType, location.pathname, currentCourseId)
    );
    if (current) return current.label;
    
    // Fallback using ROUTE_TITLES
    const path = location.pathname;
    return ROUTE_TITLES[path] || 'VoraPrep';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
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

      {/* Offline Status Banner */}
      {!isOnline && (
        <div 
          className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium shadow-lg animate-slide-down"
          role="alert"
          aria-live="polite"
        >
          <WifiOff className="w-4 h-4" aria-hidden="true" />
          <span>You're offline. Some features may be limited.</span>
        </div>
      )}

      {/* App Shell - Max width container that centers the entire app */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row safe-top safe-bottom min-h-screen">
        {/* Desktop Sidebar */}
        <aside 
          className="hidden md:flex flex-col w-64 flex-shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-screen sticky top-0 z-40"
          role="navigation"
          aria-label="Main navigation"
        >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={darkMode ? "/logo-white.svg" : "/logo.svg"} 
              alt="VoraPrep" 
              className="h-10" 
            />
          </div>
          
          {/* Course Selector */}
          <div className="mb-6">
            <CourseSelector />
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={() =>
                  clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium',
                    isNavActiveForCourse(item.navType, location.pathname, currentCourseId) && !strategyActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700'
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
          
          {/* Exam Strategy Section - CPA Only */}
          {currentCourseId === 'cpa' && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
            <span className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Exam Strategy
            </span>
            <NavLink
              to={strategyNavPath}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium mt-2',
                strategyActive
                  ? 'bg-primary-50 text-primary-700 shadow-sm dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-700'
              )}
            >
              <Compass className="w-5 h-5" />
              Strategy & Tips
            </NavLink>
          </div>
          )}
        </div>

        <div className="mt-auto p-6 border-t border-slate-100 dark:border-slate-700">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Daily Goal
              </span>
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{dailyProgress}%</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${dailyProgress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{currentStreak} day streak!</span>
            </div>
          </div>
          {/* Legal Disclaimer */}
          <p className="mt-4 text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
            Not affiliated with AICPA, NASBA, or any state board. For educational purposes only.{' '}
            <NavLink to="/terms" className="underline hover:text-slate-700 dark:hover:text-slate-300">Terms</NavLink>
          </p>
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
          <div className="flex items-center gap-2">
            <CourseSelector compact showComingSoon={false} />
            <div className="font-bold text-lg text-slate-900 dark:text-slate-100">{getPageTitle()}</div>
          </div>
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
        className="flex-1 min-w-0 p-4 pb-24 md:p-8 md:pb-8 pt-20 md:pt-8 focus:outline-none"
      >
        <Outlet />
      </main>
      </div>{/* End App Shell */}

      {/* Mobile Bottom Navigation - course-aware */}
      <nav
        ref={navRef}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur dark:bg-slate-800/95 border-t border-slate-200 dark:border-slate-700 pb-safe z-50 safe-bottom"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="relative flex items-center justify-around h-14">
          {/* Active Indicator */}
          <div
            ref={indicatorRef}
            className="absolute top-0 w-12 h-1 bg-primary-600 rounded-b-full transition-all duration-300 ease-out opacity-0 pointer-events-none"
            style={{ left: 0 }}
            aria-hidden="true"
          />

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              aria-label={item.label}
              className={() =>
                clsx(
                  'nav-link flex flex-col items-center justify-center w-full h-full gap-0.5',
                  isNavActiveForCourse(item.navType, location.pathname, currentCourseId) && !strategyActive 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-slate-500 dark:text-slate-400'
                )
              }
            >
              <item.icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          ))}
          
          {/* Strategy Tab - CPA Only */}
          {currentCourseId === 'cpa' && (
            <NavLink
              to={strategyNavPath}
              aria-label="Exam Strategy"
              className={clsx(
                'nav-link flex flex-col items-center justify-center w-full h-full gap-0.5',
                strategyActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400'
              )}
            >
              <Compass className="w-5 h-5" aria-hidden="true" />
              <span className="text-[10px] font-medium">Strategy</span>
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;

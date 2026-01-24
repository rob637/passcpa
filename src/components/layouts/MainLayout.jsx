import { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Target, BarChart3, Settings, Flame } from 'lucide-react';
import { useStudy } from '../../hooks/useStudy';
import { useRouteTitle, ROUTE_TITLES } from '../../hooks/useDocumentTitle';
import { usePageTracking } from '../../hooks/usePageTracking';
import clsx from 'clsx';

// Navigation items with tour IDs
const NAV_ITEMS = [
  { path: '/dashboard', icon: Home, label: 'Home', tourId: 'dashboard' },
  { path: '/study', icon: BookOpen, label: 'Study', tourId: 'study' },
  { path: '/practice', icon: Target, label: 'Practice', tourId: 'practice' },
  { path: '/progress', icon: BarChart3, label: 'Progress', tourId: 'progress' },
  { path: '/settings', icon: Settings, label: 'Settings', tourId: 'settings' },
];

// Mini progress ring component
const ProgressRing = ({ progress = 0, size = 32, strokeWidth = 3 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="progress-ring">
      <circle
        className="progress-ring-bg"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="progress-ring-fill"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
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
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const mainRef = useRef(null);

  // Set document title based on route
  useRouteTitle();

  // Track page views for analytics
  usePageTracking();

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
    return current?.label || 'PassCPA';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col transition-colors duration-300">
      {/* Skip Link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Screen reader announcements */}
      <div
        id="route-announcement"
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Header - Minimal, clean */}
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-200 safe-top',
          scrolled
            ? 'glass border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm'
            : 'bg-slate-50 dark:bg-slate-900'
        )}
        role="banner"
      >
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right side - Progress & Streak */}
          <div className="flex items-center gap-4">
            {/* Daily Progress Ring */}
            <NavLink
              to="/progress"
              className="relative flex items-center justify-center touch-target"
              aria-label={`Daily progress: ${dailyProgress}%`}
            >
              <ProgressRing progress={dailyProgress} size={36} strokeWidth={3} />
              <span className="absolute text-xs font-bold text-slate-700 dark:text-slate-300">
                {dailyProgress}%
              </span>
            </NavLink>

            {/* Streak Badge */}
            {currentStreak > 0 && (
              <NavLink
                to="/progress"
                className="streak-badge"
                aria-label={`${currentStreak} day streak`}
              >
                <Flame className="w-4 h-4 streak-flame" />
                <span>{currentStreak}</span>
              </NavLink>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        id="main-content"
        ref={mainRef}
        className="flex-1 pt-14 pb-20"
        style={{
          paddingTop: 'calc(56px + var(--safe-top))',
          paddingBottom: 'calc(80px + var(--safe-bottom))',
        }}
        role="main"
        tabIndex={-1}
      >
        <Outlet />
      </main>

      {/* Bottom Navigation - Google-style */}
      <nav
        ref={navRef}
        className={clsx(
          'fixed bottom-0 left-0 right-0 z-50',
          'bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700',
          'safe-bottom'
        )}
        style={{
          boxShadow: '0 -1px 2px rgba(0,0,0,0.03), 0 -2px 8px rgba(0,0,0,0.04)',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Active indicator */}
        <div
          ref={indicatorRef}
          className="absolute top-0 w-12 h-0.5 bg-primary-600 rounded-full opacity-0 transition-all duration-300"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        />

        <div className="max-w-lg mx-auto px-2">
          <div className="flex items-center justify-around h-16">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path || location.pathname.startsWith(item.path + '/');

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="nav-link flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 touch-target"
                  style={{ minWidth: '64px' }}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  data-tour={item.tourId}
                >
                  <Icon
                    className={clsx(
                      'w-6 h-6 transition-all duration-200',
                      isActive ? 'text-primary-600' : 'text-slate-400 dark:text-slate-500'
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                    aria-hidden="true"
                  />
                  <span
                    className={clsx(
                      'text-xs mt-1 font-medium transition-colors duration-200',
                      isActive ? 'text-primary-600' : 'text-slate-500 dark:text-slate-400'
                    )}
                  >
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;

import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ChevronRight, Home, BookOpen, Target, User, FileText, Map, Zap, Award, Settings, HelpCircle } from 'lucide-react';
import clsx from 'clsx';

interface ContextItem {
  label: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Map paths to context items
const getContextFromPath = (pathname: string, searchParams: URLSearchParams): ContextItem[] => {
  const context: ContextItem[] = [];
  const section = searchParams.get('section');
  
  // Always start with Home for non-home pages
  if (pathname !== '/home' && !pathname.match(/^\/(cpa|ea|cma|cia|cfp|cisa)$/)) {
    context.push({ label: 'Home', path: '/home', icon: Home });
  }
  
  // Lessons flow
  if (pathname.startsWith('/lessons')) {
    context.push({ label: 'Lessons', path: '/lessons', icon: BookOpen });
    
    // If section param exists, show it
    if (section && !pathname.match(/\/lessons\/[^/]+/)) {
      context.push({ label: section, path: `/lessons?section=${section}` });
    }
    
    // Specific lesson - extract ID
    const lessonMatch = pathname.match(/\/lessons\/([^/]+)/);
    if (lessonMatch) {
      if (section) {
        context.push({ label: section, path: `/lessons?section=${section}` });
      }
      context.push({ label: 'Lesson', path: pathname });
    }
  }
  
  // Practice flow
  if (pathname.startsWith('/practice')) {
    context.push({ label: 'Practice', path: '/practice', icon: Target });
    
    // If section param exists, show it
    if (section) {
      context.push({ label: section, path: `/practice?section=${section}` });
    }
  }
  
  // Flashcards
  if (pathname.startsWith('/flashcards')) {
    context.push({ label: 'Flashcards', path: '/flashcards', icon: Zap });
    
    if (section) {
      context.push({ label: section, path: `/flashcards?section=${section}` });
    }
  }
  
  // TBS Simulator
  if (pathname.startsWith('/tbs')) {
    context.push({ label: 'TBS', path: '/tbs', icon: FileText });
    
    if (section) {
      context.push({ label: section, path: `/tbs?section=${section}` });
    }
  }
  
  // Study Plan
  if (pathname.startsWith('/study-plan')) {
    context.push({ label: 'Study Plan', path: '/study-plan', icon: Map });
  }
  
  // You section
  if (pathname.startsWith('/you') || pathname.startsWith('/settings') || 
      pathname.startsWith('/achievements') || pathname.startsWith('/progress')) {
    context.push({ label: 'You', path: '/you', icon: User });
    
    if (pathname.startsWith('/settings')) {
      context.push({ label: 'Settings', path: '/settings', icon: Settings });
    }
    if (pathname.startsWith('/achievements')) {
      context.push({ label: 'Achievements', path: '/achievements', icon: Award });
    }
    if (pathname.startsWith('/progress')) {
      context.push({ label: 'Progress', path: '/progress' });
    }
  }
  
  // AI Tutor
  if (pathname.startsWith('/ai-tutor') || pathname.startsWith('/tutor')) {
    context.push({ label: 'AI Tutor', path: '/ai-tutor', icon: HelpCircle });
  }
  
  // Resources / Strategy
  if (pathname.startsWith('/resources')) {
    context.push({ label: 'Resources', path: '/resources', icon: FileText });
  }
  
  return context;
};

// Pages where we should hide the context bar
const HIDDEN_ON_PAGES = [
  '/home',
  '/cpa',
  '/ea', 
  '/cma',
  '/cia',
  '/cfp',
  '/cisa',
  '/login',
  '/signup',
  '/onboarding',
];

export interface MobileContextBarProps {
  className?: string;
}

export const MobileContextBar: React.FC<MobileContextBarProps> = ({ className }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Don't show on home/landing pages
  const shouldHide = HIDDEN_ON_PAGES.some(page => 
    location.pathname === page || location.pathname === `${page}/`
  );
  
  if (shouldHide) return null;
  
  const contextItems = getContextFromPath(location.pathname, searchParams);
  
  // Don't render if no meaningful context
  if (contextItems.length === 0) return null;
  
  return (
    <nav
      aria-label="Page location"
      className={clsx(
        'md:hidden bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700',
        'px-4 py-2 overflow-x-auto scrollbar-hide',
        className
      )}
    >
      <ol className="flex items-center gap-1 text-sm whitespace-nowrap">
        {contextItems.map((item, index) => {
          const isLast = index === contextItems.length - 1;
          const Icon = item.icon;
          
          return (
            <li key={item.path} className="flex items-center">
              {isLast ? (
                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-medium text-xs">
                  {Icon && <Icon className="w-3 h-3" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span className="text-xs">{item.label}</span>
                </Link>
              )}
              
              {!isLast && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 mx-0.5 flex-shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default MobileContextBar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useNavigation, Crumb } from './NavigationProvider';
import clsx from 'clsx';

export interface BreadcrumbsProps {
  /** Static breadcrumbs (override dynamic) */
  items?: Crumb[];
  /** Show home icon as first item */
  showHome?: boolean;
  /** Additional className */
  className?: string;
  /** Max items to show (rest collapsed) */
  maxItems?: number;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHome = true,
  className,
  maxItems = 4,
}) => {
  const { session } = useNavigation();
  const location = useLocation();
  
  // Use provided items or session breadcrumbs
  const crumbs = items || session.breadcrumbs;
  
  // If no crumbs, don't render
  if (crumbs.length === 0 && !showHome) {
    return null;
  }
  
  // Prepare display items
  let displayCrumbs = [...crumbs];
  let collapsed = false;
  
  if (displayCrumbs.length > maxItems) {
    // Keep first and last (maxItems - 1) items
    const firstItem = displayCrumbs[0];
    const lastItems = displayCrumbs.slice(-(maxItems - 2));
    displayCrumbs = [firstItem, { label: '...', path: '' }, ...lastItems];
    collapsed = true;
  }
  
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={clsx(
        'hidden sm:flex items-center gap-1 text-sm',
        className
      )}
    >
      <ol className="flex items-center gap-1">
        {/* Home icon */}
        {showHome && (
          <li className="flex items-center">
            <Link
              to="/home"
              className={clsx(
                'p-1 rounded transition-colors',
                location.pathname === '/home'
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              )}
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
            </Link>
            {displayCrumbs.length > 0 && (
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 ml-1" />
            )}
          </li>
        )}
        
        {/* Breadcrumb items */}
        {displayCrumbs.map((crumb, index) => {
          const isLast = index === displayCrumbs.length - 1;
          const isCollapsed = collapsed && index === 1;
          const isCurrent = crumb.path === location.pathname;
          
          return (
            <li key={crumb.path || index} className="flex items-center">
              {isCollapsed ? (
                <span 
                  className="px-1 text-slate-400 dark:text-slate-500"
                  aria-hidden="true"
                >
                  •••
                </span>
              ) : isLast || isCurrent ? (
                <span 
                  className="px-1 font-medium text-slate-900 dark:text-white truncate max-w-[200px]"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="px-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors truncate max-w-[150px]"
                >
                  {crumb.label}
                </Link>
              )}
              
              {!isLast && (
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

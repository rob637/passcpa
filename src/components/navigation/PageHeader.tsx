import React, { ReactNode } from 'react';
import BackButton, { BackButtonProps } from './BackButton';
import Breadcrumbs from './Breadcrumbs';
import { Crumb, useNavigation } from './NavigationProvider';
import clsx from 'clsx';

export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Show back button (default: true) */
  showBack?: boolean;
  /** Back button props */
  backProps?: BackButtonProps;
  /** Show breadcrumbs on desktop */
  showBreadcrumbs?: boolean;
  /** Static breadcrumb items */
  breadcrumbs?: Crumb[];
  /** Right-side actions */
  actions?: ReactNode;
  /** Session indicator (e.g., "Daily Plan" badge) */
  sessionBadge?: boolean;
  /** Additional className */
  className?: string;
  /** Sticky header */
  sticky?: boolean;
  /** Compact variant (less padding) */
  compact?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  backProps,
  showBreadcrumbs = false,
  breadcrumbs,
  actions,
  sessionBadge = true,
  className,
  sticky = false,
  compact = false,
}) => {
  const { session } = useNavigation();
  
  const showSessionBadge = sessionBadge && session.mode === 'daily-plan';
  
  return (
    <header
      className={clsx(
        'bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700',
        sticky && 'sticky top-0 z-40',
        className
      )}
    >
      <div className={clsx(
        'max-w-5xl mx-auto',
        compact ? 'px-4 py-3' : 'px-4 sm:px-6 py-4'
      )}>
        {/* Back button row (mobile shows back, desktop shows breadcrumbs) */}
        {(showBack || showBreadcrumbs) && (
          <div className="flex items-center justify-between mb-2">
            {/* Mobile: Back button */}
            {showBack && (
              <div className="sm:hidden">
                <BackButton size="sm" {...backProps} />
              </div>
            )}
            
            {/* Desktop: Breadcrumbs or Back button */}
            <div className="hidden sm:block">
              {showBreadcrumbs ? (
                <Breadcrumbs items={breadcrumbs} />
              ) : showBack ? (
                <BackButton {...backProps} />
              ) : null}
            </div>
            
            {/* Session indicator */}
            {showSessionBadge && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
                  Daily Plan
                </span>
              </div>
            )}
          </div>
        )}
        
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className={clsx(
              'font-bold text-slate-900 dark:text-white truncate',
              compact ? 'text-lg' : 'text-xl sm:text-2xl'
            )}>
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Actions */}
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;

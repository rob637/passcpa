import React, { HTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

export type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info'
  | 'secondary';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Badge variant/color scheme */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Optional icon to display before text */
  icon?: LucideIcon;
  /** Use pill shape (fully rounded) instead of rounded corners */
  pill?: boolean;
  /** Add a dot indicator before the text */
  dot?: boolean;
  /** Badge text content */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  secondary: 'bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-200',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-slate-500',
  primary: 'bg-primary-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  secondary: 'bg-slate-500',
};

const sizeClasses: Record<BadgeSize, { badge: string; icon: string; dot: string }> = {
  sm: { badge: 'text-xs px-2 py-0.5', icon: 'w-3 h-3', dot: 'w-1.5 h-1.5' },
  md: { badge: 'text-xs px-2.5 py-1', icon: 'w-3.5 h-3.5', dot: 'w-2 h-2' },
  lg: { badge: 'text-sm px-3 py-1.5', icon: 'w-4 h-4', dot: 'w-2 h-2' },
};

/**
 * Badge component for status labels, tags, and indicators.
 * 
 * Replaces inline patterns like:
 * - `<span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Weak</span>`
 * - `<span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-lg">Recommended</span>`
 * 
 * @example
 * // Basic badge
 * <Badge variant="success">Completed</Badge>
 * 
 * // With icon
 * <Badge variant="warning" icon={AlertTriangle}>Needs Review</Badge>
 * 
 * // Pill shape with dot
 * <Badge variant="primary" pill dot>In Progress</Badge>
 * 
 * // Status indicators
 * <Badge variant="success" size="sm">✓ Passed</Badge>
 * <Badge variant="error" size="sm">✗ Failed</Badge>
 * <Badge variant="warning" size="sm">⚠ Weak Area</Badge>
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  icon: Icon,
  pill = false,
  dot = false,
  children,
  className,
  ...props
}) => {
  const sizeConfig = sizeClasses[size];

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium',
        sizeConfig.badge,
        variantClasses[variant],
        pill ? 'rounded-full' : 'rounded-lg',
        className
      )}
      {...props}
    >
      {/* Status dot */}
      {dot && (
        <span 
          className={clsx('rounded-full flex-shrink-0', sizeConfig.dot, dotColors[variant])} 
          aria-hidden="true"
        />
      )}
      
      {/* Icon */}
      {Icon && !dot && (
        <Icon className={clsx('flex-shrink-0', sizeConfig.icon)} aria-hidden="true" />
      )}
      
      {/* Text content */}
      {children}
    </span>
  );
};

/**
 * Semantic badge variants for common use cases.
 */

/** For items that are recommended or highlighted */
export const RecommendedBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge variant="primary" {...props} />
);

/** For successful/completed states */
export const SuccessBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge variant="success" {...props} />
);

/** For warnings or weak areas */
export const WarningBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge variant="warning" {...props} />
);

/** For errors or failed states */
export const ErrorBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge variant="error" {...props} />
);

/** For informational indicators */
export const InfoBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge variant="info" {...props} />
);

export default Badge;

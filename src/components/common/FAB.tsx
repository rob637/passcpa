import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import * as feedback from '../../services/feedback';

export interface FABProps {
  /** Icon to display */
  icon: LucideIcon;
  /** Click handler */
  onClick: () => void;
  /** Accessible label */
  label: string;
  /** Extended FAB with text label */
  extended?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'surface';
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
  /** Additional className */
  className?: string;
  /** Whether FAB is visible */
  visible?: boolean;
  /** Disable FAB */
  disabled?: boolean;
}

const sizeClasses = {
  sm: {
    button: 'w-10 h-10',
    icon: 'w-5 h-5',
    extended: 'h-10 px-4 gap-2',
    text: 'text-sm',
  },
  md: {
    button: 'w-14 h-14',
    icon: 'w-6 h-6',
    extended: 'h-14 px-5 gap-3',
    text: 'text-base',
  },
  lg: {
    button: 'w-16 h-16',
    icon: 'w-7 h-7',
    extended: 'h-16 px-6 gap-3',
    text: 'text-lg',
  },
};

const variantClasses = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30',
  secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-lg shadow-secondary-500/30',
  surface: 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white shadow-lg border border-slate-200 dark:border-slate-700',
};

const positionClasses = {
  'bottom-right': 'bottom-20 right-4 md:bottom-6 md:right-6',
  'bottom-center': 'bottom-20 left-1/2 -translate-x-1/2 md:bottom-6',
  'bottom-left': 'bottom-20 left-4 md:bottom-6 md:left-6',
};

/**
 * FAB - Floating Action Button (Google Material Design)
 * 
 * Represents the primary action on a screen.
 * Positioned above bottom navigation on mobile.
 */
export const FAB: React.FC<FABProps> = ({
  icon: Icon,
  onClick,
  label,
  extended = false,
  size = 'md',
  variant = 'primary',
  position = 'bottom-right',
  className,
  visible = true,
  disabled = false,
}) => {
  const sizes = sizeClasses[size];

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: visible ? 1 : 0, 
        opacity: visible ? 1 : 0 
      }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 25 
      }}
      onClick={() => {
        feedback.tap();
        onClick();
      }}
      disabled={disabled}
      aria-label={label}
      className={clsx(
        'fixed z-40 rounded-full flex items-center justify-center',
        'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'active:scale-95',
        extended ? sizes.extended : sizes.button,
        variantClasses[variant],
        positionClasses[position],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <Icon className={sizes.icon} />
      {extended && (
        <span className={clsx('font-medium', sizes.text)}>{label}</span>
      )}
    </motion.button>
  );
};

export default FAB;

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Icon to show before children */
  leftIcon?: LucideIcon;
  /** Icon to show after children */
  rightIcon?: LucideIcon;
  /** Make button fill container width */
  fullWidth?: boolean;
  /** Additional class names */
  className?: string;
  /** Button contents */
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
  success: 'btn-success',
  outline: 'btn-secondary', // Outline uses secondary styling
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: '', // Default size, no additional class needed
  lg: 'btn-lg',
  icon: 'btn-icon',
};

/**
 * Button component with consistent styling, loading states, and accessibility.
 * 
 * Uses the design system classes from globals.css for haptic feedback,
 * ripple effects, and smooth transitions.
 * 
 * @example
 * // Primary button
 * <Button variant="primary">Save Changes</Button>
 * 
 * // With icon
 * <Button variant="secondary" leftIcon={Plus}>Add Item</Button>
 * 
 * // Loading state
 * <Button variant="primary" loading>Saving...</Button>
 * 
 * // Icon-only button
 * <Button variant="ghost" size="icon" aria-label="Settings">
 *   <Settings className="w-5 h-5" />
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    
    // Icon size based on button size
    const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={clsx(
          // Base button class from globals.css
          'btn',
          // Variant styles
          variantClasses[variant],
          // Size styles
          sizeClasses[size],
          // Full width
          fullWidth && 'w-full',
          // Disabled/loading states
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          // Focus-visible ring (accessibility)
          'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          // Custom classes
          className
        )}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <Loader2 className={clsx(iconSize, 'animate-spin', children && 'mr-2')} />
        )}
        
        {/* Left icon */}
        {!loading && LeftIcon && (
          <LeftIcon className={clsx(iconSize, children && 'mr-2')} />
        )}
        
        {/* Button content */}
        {children}
        
        {/* Right icon */}
        {RightIcon && !loading && (
          <RightIcon className={clsx(iconSize, children && 'ml-2')} />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Show error styling */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Helper text below input */
  helperText?: string;
  /** Label text */
  label?: string;
  /** Icon to show on the left */
  leftIcon?: LucideIcon;
  /** Make input full width of container */
  fullWidth?: boolean;
  /** Additional class names for the input */
  className?: string;
  /** Additional class names for the wrapper */
  wrapperClassName?: string;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Show error styling */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Helper text below textarea */
  helperText?: string;
  /** Label text */
  label?: string;
  /** Make textarea full width of container */
  fullWidth?: boolean;
  /** Additional class names */
  className?: string;
  /** Additional class names for the wrapper */
  wrapperClassName?: string;
}

/**
 * Input component with consistent styling and accessibility.
 * 
 * Uses the design system classes from globals.css for focus rings,
 * error states, and smooth transitions.
 * 
 * @example
 * // Basic input
 * <Input placeholder="Enter your name" />
 * 
 * // With label and helper text
 * <Input 
 *   label="Email" 
 *   type="email" 
 *   helperText="We'll never share your email"
 * />
 * 
 * // With icon
 * <Input leftIcon={Search} placeholder="Search..." />
 * 
 * // Error state
 * <Input error errorMessage="This field is required" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error = false,
      errorMessage,
      helperText,
      label,
      leftIcon: LeftIcon,
      fullWidth = true,
      className,
      wrapperClassName,
      id,
      ...props
    },
    ref
  ) => {
    // Generate ID for label association if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={clsx(fullWidth && 'w-full', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
          </label>
        )}

        {/* Input wrapper for icon positioning */}
        <div className={clsx(LeftIcon && 'input-group', 'relative')}>
          {/* Left icon */}
          {LeftIcon && (
            <LeftIcon className="input-group-icon w-5 h-5" />
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'input',
              LeftIcon && 'pl-12',
              error && 'input-error border-error-500',
              className
            )}
            aria-invalid={error}
            aria-describedby={
              errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
        </div>

        {/* Error message */}
        {errorMessage && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-error-600 dark:text-error-400"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        {/* Helper text (only show if no error) */}
        {helperText && !errorMessage && (
          <p
            id={`${inputId}-helper`}
            className="mt-1.5 text-sm text-slate-500 dark:text-slate-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea component with consistent styling.
 * 
 * @example
 * <Textarea 
 *   label="Description" 
 *   placeholder="Enter a description..."
 *   rows={4}
 * />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error = false,
      errorMessage,
      helperText,
      label,
      fullWidth = true,
      className,
      wrapperClassName,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={clsx(fullWidth && 'w-full', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
          </label>
        )}

        {/* Textarea element */}
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            'input resize-none',
            error && 'input-error border-error-500',
            className
          )}
          aria-invalid={error}
          aria-describedby={
            errorMessage ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />

        {/* Error message */}
        {errorMessage && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-sm text-error-600 dark:text-error-400"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        {/* Helper text */}
        {helperText && !errorMessage && (
          <p
            id={`${textareaId}-helper`}
            className="mt-1.5 text-sm text-slate-500 dark:text-slate-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Input;

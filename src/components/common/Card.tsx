import React, { forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';

export type CardVariant = 'default' | 'elevated' | 'interactive';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style variant */
  variant?: CardVariant;
  /** Remove default padding */
  noPadding?: boolean;
  /** Additional class names */
  className?: string;
  /** Card contents */
  children: React.ReactNode;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Header contents */
  children: React.ReactNode;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Body contents */
  children: React.ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Footer contents */
  children: React.ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'card',
  elevated: 'card-elevated',
  interactive: 'card-interactive',
};

/**
 * Card component with consistent styling and elevation.
 * 
 * Uses the design system classes from globals.css for premium shadows
 * and hover effects.
 * 
 * @example
 * // Basic card
 * <Card>
 *   <p>Card content</p>
 * </Card>
 * 
 * // With sections
 * <Card noPadding>
 *   <CardHeader>
 *     <h3>Title</h3>
 *   </CardHeader>
 *   <CardBody>
 *     <p>Content</p>
 *   </CardBody>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * 
 * // Interactive card (clickable)
 * <Card variant="interactive" onClick={handleClick}>
 *   <p>Click me</p>
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      noPadding = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          variantClasses[variant],
          !noPadding && 'p-5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card header section with bottom border.
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('card-header', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * Card body section with standard padding.
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('card-body', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

/**
 * Card footer section with top border and muted background.
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('card-footer', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;

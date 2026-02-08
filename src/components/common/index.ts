/**
 * Common UI Components - Design System Primitives
 * 
 * These components encapsulate the design system defined in globals.css
 * and ensure consistent styling across the application.
 * 
 * @example
 * import { Button, Card, CardHeader, CardBody, Input, Modal } from '../common';
 */

// Button
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

// Card
export { Card, CardHeader, CardBody, CardFooter } from './Card';
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps, CardVariant } from './Card';

// Input
export { Input, Textarea } from './Input';
export type { InputProps, TextareaProps } from './Input';

// Modal
export { Modal } from './Modal';
export type { ModalProps, ModalSize } from './Modal';

// Badge
export { Badge, RecommendedBadge, SuccessBadge, WarningBadge, ErrorBadge, InfoBadge } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './Badge';

// Existing components
export { CourseSelector } from './CourseSelector';
export { default as ErrorBoundary } from './ErrorBoundary';
export { default as CourseErrorBoundary, withCourseErrorBoundary } from './CourseErrorBoundary';
export { default as GlobalSearch } from './GlobalSearch';
export { default as InstallPrompt } from './InstallPrompt';
export { default as PageLoader } from './PageLoader';
export { QuestionFlagging, QuickFlagButton } from './QuestionFlagging';
export type { FlagType, QuestionFlag } from './QuestionFlagging';
export { Skeleton, SkeletonText, SkeletonCard, SkeletonQuestion, SkeletonDashboard } from './Skeleton';
export { default as Toast } from './Toast';
export { UpdateBanner, triggerUpdateBanner } from './UpdateBanner';
export { BookmarkButton, NotesButton, NotesPanel, useBookmarks } from './Bookmarks';
export type { BookmarkData, NoteData } from './Bookmarks';

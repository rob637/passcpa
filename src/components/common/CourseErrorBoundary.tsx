import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from './Button';
import { CourseId } from '../../types/course';
import logger from '../../utils/logger';

interface CourseErrorBoundaryProps {
  children: ReactNode;
  courseId: CourseId;
  courseName?: string;
  onRetry?: () => void;
  onNavigateBack?: () => void;
}

interface CourseErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Course-Level Error Boundary
 * 
 * Catches errors specific to course content loading/rendering and provides
 * a course-aware fallback UI that allows users to retry or navigate away.
 */
class CourseErrorBoundary extends Component<CourseErrorBoundaryProps, CourseErrorBoundaryState> {
  constructor(props: CourseErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<CourseErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { courseId } = this.props;
    
    logger.error(`CourseErrorBoundary [${courseId}]:`, error, errorInfo);
    
    this.setState({ errorInfo });

    // Track course-specific errors
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: `Course Error [${courseId}]: ${error.toString()}`,
        fatal: false,
        course_id: courseId,
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    this.props.onRetry?.();
  };

  handleNavigateBack = () => {
    if (this.props.onNavigateBack) {
      this.props.onNavigateBack();
    } else {
      window.history.back();
    }
  };

  handleGoToDashboard = () => {
    window.location.href = '/dashboard';
  };

  render() {
    const { hasError, error } = this.state;
    const { children, courseId, courseName } = this.props;

    if (hasError) {
      const displayName = courseName || courseId.toUpperCase();
      
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            {/* Error Icon */}
            <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>

            {/* Error Title */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {displayName} Content Error
            </h2>

            {/* Error Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We encountered an issue loading the {displayName} content. 
              This might be a temporary problem.
            </p>

            {/* Error Details (Development Only) */}
            {import.meta.env.DEV && error && (
              <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
                  {error.message}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleRetry}
                variant="primary"
                leftIcon={RefreshCw}
              >
                Try Again
              </Button>
              
              <Button
                onClick={this.handleNavigateBack}
                variant="secondary"
                leftIcon={ArrowLeft}
              >
                Go Back
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={this.handleGoToDashboard}
                variant="ghost"
                size="sm"
                leftIcon={BookOpen}
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default CourseErrorBoundary;

/**
 * Higher-order component for wrapping course pages with error boundary
 */
export function withCourseErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  courseId: CourseId,
  courseName?: string
) {
  return function WithCourseErrorBoundary(props: P) {
    return (
      <CourseErrorBoundary courseId={courseId} courseName={courseName}>
        <WrappedComponent {...props} />
      </CourseErrorBoundary>
    );
  };
}

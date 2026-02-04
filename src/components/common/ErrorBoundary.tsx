import { Component, ReactNode, ErrorInfo } from 'react';
import logger from '../../utils/logger';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackMessage?: string;
  variant?: 'page' | 'inline';
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  eventId: string | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs them, and displays a fallback UI instead of crashing.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error, errorInfo: null, eventId: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console in development
    logger.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({ errorInfo });

    // Log to analytics/error tracking service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: true,
      });
    }

    // Could also send to Sentry, LogRocket, etc.
    // if (window.Sentry) {
    //   const eventId = window.Sentry.captureException(error, { extra: errorInfo });
    //   this.setState({ eventId });
    // }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  handleReportBug = () => {
    const { error, errorInfo } = this.state;
    const subject = encodeURIComponent('Bug Report: VoraPrep App Error');
    const body = encodeURIComponent(`
Error: ${error?.toString()}

Stack: ${errorInfo?.componentStack || 'N/A'}

URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Time: ${new Date().toISOString()}

Steps to reproduce:
1. 
2. 
3. 
    `);
    window.open(`mailto:support@voraprep.com?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      const { variant = 'page' } = this.props;

      // Full page error (for route-level boundaries)
      if (variant === 'page') {
        return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-8 h-8 text-error-600" />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h1>

                {/* Description */}
                <p className="text-slate-600 mb-6">
                  We're sorry, but something unexpected happened. Our team has been notified.
                </p>

                {/* Error details (dev only) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mb-6 p-4 bg-slate-100 rounded-xl text-left overflow-auto max-h-40">
                    <p className="text-sm font-mono text-error-600 break-words">
                      {this.state.error.toString()}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={this.handleReload}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>

                  <button
                    onClick={this.handleGoHome}
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Go to Dashboard
                  </button>

                  <button
                    onClick={this.handleReportBug}
                    className="w-full text-sm text-slate-600 hover:text-slate-700 flex items-center justify-center gap-2 py-2"
                  >
                    <Bug className="w-4 h-4" />
                    Report this issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // Inline error (for component-level boundaries)
      return (
        <div className="p-4 bg-error-50 border border-error-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-error-800">This section couldn't load</p>
              <p className="text-sm text-error-600 mt-1">
                {this.props.fallbackMessage || 'Please try refreshing the page.'}
              </p>
              <button
                onClick={this.handleReload}
                className="mt-3 text-sm font-medium text-error-700 hover:text-error-800 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

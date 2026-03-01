import { Component, ReactNode, ErrorInfo } from 'react';
import logger from '../../utils/logger';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from './Button';

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
    
    // Check if this is a chunk loading error (PWA update issue)
    const errorMessage = error.message || '';
    const isChunkError = 
      errorMessage.includes('Failed to fetch dynamically imported module') ||
      errorMessage.includes('Loading chunk') ||
      errorMessage.includes('Loading CSS chunk') ||
      errorMessage.includes('ChunkLoadError');
    
    if (isChunkError) {
      // Check if we've already tried reloading
      const hasReloaded = sessionStorage.getItem('chunk-reload-attempted');
      if (!hasReloaded) {
        // Auto-reload to get fresh chunks
        logger.warn('Chunk load error detected, auto-reloading...');
        sessionStorage.setItem('chunk-reload-attempted', Date.now().toString());
        
        // Clear caches and reload
        if ('caches' in window) {
          caches.keys().then(names => {
            Promise.all(names.map(name => caches.delete(name))).then(() => {
              window.location.reload();
            });
          }).catch(() => {
            window.location.reload();
          });
        } else {
          window.location.reload();
        }
        return;
      }
    }

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
  
  // Check if error is a chunk loading error
  isChunkError = (): boolean => {
    const errorMessage = this.state.error?.message || '';
    return (
      errorMessage.includes('Failed to fetch dynamically imported module') ||
      errorMessage.includes('Loading chunk') ||
      errorMessage.includes('Loading CSS chunk') ||
      errorMessage.includes('ChunkLoadError')
    );
  };

  handleHardReload = async () => {
    // Clear all caches before reloading
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      } catch {
        // Ignore cache clear errors
      }
    }
    // Clear the reload attempt flag
    sessionStorage.removeItem('chunk-reload-attempted');
    // Force reload
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
      const isChunkError = this.isChunkError();

      // Full page error (for route-level boundaries)
      if (variant === 'page') {
        return (
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-8 text-center">
                {/* Icon */}
                <div className={`w-16 h-16 ${isChunkError ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-error-100 dark:bg-error-900/30'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  {isChunkError ? (
                    <RefreshCw className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-error-600 dark:text-error-400" />
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {isChunkError ? 'App Updated' : 'Something went wrong'}
                </h1>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {isChunkError 
                    ? 'A new version of VoraPrep is available. Please refresh to load the latest version.'
                    : "We're sorry, but something unexpected happened. Our team has been notified."
                  }
                </p>

                {/* Error details (dev only) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-900 rounded-xl text-left overflow-auto max-h-40">
                    <p className="text-sm font-mono text-error-600 dark:text-error-400 break-words">
                      {this.state.error.toString()}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={this.handleHardReload}
                    variant="primary"
                    fullWidth
                    leftIcon={RefreshCw}
                  >
                    {isChunkError ? 'Refresh Now' : 'Try Again'}
                  </Button>

                  {!isChunkError && (
                    <>
                      <Button
                        onClick={this.handleGoHome}
                        variant="secondary"
                        fullWidth
                        leftIcon={Home}
                      >
                        Go to Dashboard
                      </Button>

                      <Button
                        onClick={this.handleReportBug}
                        variant="ghost"
                        fullWidth
                        size="sm"
                        leftIcon={Bug}
                      >
                        Report this issue
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      // Inline error (for component-level boundaries)
      return (
        <div className={`p-4 ${isChunkError ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800' : 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800'} border rounded-xl`}>
          <div className="flex items-start gap-3">
            {isChunkError ? (
              <RefreshCw className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-error-600 dark:text-error-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`font-medium ${isChunkError ? 'text-primary-800 dark:text-primary-300' : 'text-error-800 dark:text-error-300'}`}>
                {isChunkError ? 'Update available' : "This section couldn't load"}
              </p>
              <p className={`text-sm ${isChunkError ? 'text-primary-600 dark:text-primary-400' : 'text-error-600 dark:text-error-400'} mt-1`}>
                {isChunkError 
                  ? 'A new version is available. Please refresh.' 
                  : (this.props.fallbackMessage || 'Please try refreshing the page.')
                }
              </p>
              <Button
                onClick={this.handleHardReload}
                variant="ghost"
                size="sm"
                leftIcon={RefreshCw}
                className={`mt-3 ${isChunkError ? 'text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300' : 'text-error-700 dark:text-error-400 hover:text-error-800 dark:hover:text-error-300'}`}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import clsx from 'clsx';

/**
 * PageLoader - Suspense fallback for lazy-loaded pages
 * Shows a skeleton loader that matches the general page layout
 */
interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div className={clsx('p-4 sm:p-6 lg:p-8 animate-pulse', className)}>
      {/* Header skeleton */}
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-48 mb-6" />

      {/* Cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-soft">
            <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4" />
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-xl w-24 mb-2" />
            <div className="h-4 bg-slate-100 dark:bg-slate-600 rounded-lg w-32" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-soft">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-xl w-32 mb-4" />
        <div className="space-y-3">
          <div className="h-4 bg-slate-100 dark:bg-slate-600 rounded-lg w-full" />
          <div className="h-4 bg-slate-100 dark:bg-slate-600 rounded-lg w-5/6" />
          <div className="h-4 bg-slate-100 dark:bg-slate-600 rounded-lg w-4/6" />
        </div>
      </div>
    </div>
  );
};

/**
 * SpinnerLoader - Simple centered spinner
 */
interface SpinnerLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SpinnerLoader = ({ size = 'md', className }: SpinnerLoaderProps) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <div className={clsx('flex items-center justify-center py-12', className)}>
      <div
        className={clsx('animate-spin rounded-full border-b-2 border-primary-600', sizes[size])}
      />
    </div>
  );
};

/**
 * FullPageLoader - Full screen loading state
 */
export const FullPageLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4" />
      <p className="text-slate-600 text-sm">Loading...</p>
    </div>
  );
};

/**
 * CardLoader - Skeleton for card content
 */
interface CardLoaderProps {
  rows?: number;
}

export const CardLoader = ({ rows = 3 }: CardLoaderProps) => {
  return (
    <div className="animate-pulse">
      <div className="h-5 bg-slate-200 rounded w-1/3 mb-4" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 bg-slate-100 rounded w-full mb-2" />
      ))}
    </div>
  );
};

export default PageLoader;

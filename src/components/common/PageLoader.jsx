import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * PageLoader - Suspense fallback for lazy-loaded pages
 * Shows a skeleton loader that matches the general page layout
 */
export const PageLoader = ({ className }) => {
  return (
    <div className={clsx('p-4 sm:p-6 lg:p-8 animate-pulse', className)}>
      {/* Header skeleton */}
      <div className="h-8 bg-slate-200 rounded-lg w-48 mb-6" />

      {/* Cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="h-10 w-10 bg-slate-200 rounded-xl mb-4" />
            <div className="h-6 bg-slate-200 rounded w-24 mb-2" />
            <div className="h-4 bg-slate-100 rounded w-32" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="h-6 bg-slate-200 rounded w-32 mb-4" />
        <div className="space-y-3">
          <div className="h-4 bg-slate-100 rounded w-full" />
          <div className="h-4 bg-slate-100 rounded w-5/6" />
          <div className="h-4 bg-slate-100 rounded w-4/6" />
        </div>
      </div>
    </div>
  );
};

PageLoader.propTypes = {
  className: PropTypes.string,
};

/**
 * SpinnerLoader - Simple centered spinner
 */
export const SpinnerLoader = ({ size = 'md', className }) => {
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

SpinnerLoader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

/**
 * FullPageLoader - Full screen loading state
 */
export const FullPageLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4" />
      <p className="text-slate-500 text-sm">Loading...</p>
    </div>
  );
};

/**
 * CardLoader - Skeleton for card content
 */
export const CardLoader = ({ rows = 3 }) => {
  return (
    <div className="animate-pulse">
      <div className="h-5 bg-slate-200 rounded w-1/3 mb-4" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 bg-slate-100 rounded w-full mb-2" />
      ))}
    </div>
  );
};

CardLoader.propTypes = {
  rows: PropTypes.number,
};

export default PageLoader;

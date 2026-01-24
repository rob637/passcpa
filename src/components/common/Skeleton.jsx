import clsx from 'clsx';

/**
 * Skeleton loading component for world-class loading states
 * Use instead of spinners for a more polished feel
 */

export const Skeleton = ({ className, ...props }) => (
  <div
    className={clsx(
      'animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] rounded-lg',
      className
    )}
    {...props}
  />
);

export const SkeletonText = ({ lines = 3, className }) => (
  <div className={clsx('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={clsx('h-4', i === lines - 1 ? 'w-3/4' : 'w-full')} />
    ))}
  </div>
);

export const SkeletonCard = ({ className }) => (
  <div className={clsx('card p-4', className)}>
    <div className="flex items-start gap-4">
      <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
      <div className="flex-1">
        <Skeleton className="h-5 w-1/2 mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
);

export const SkeletonQuestion = () => (
  <div className="card p-5">
    <Skeleton className="h-5 w-24 mb-4" />
    <SkeletonText lines={2} className="mb-6" />
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonDashboard = () => (
  <div className="p-4 space-y-4">
    {/* Header skeleton */}
    <div className="flex items-center justify-between">
      <div>
        <Skeleton className="h-7 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="w-24 h-10 rounded-xl" />
    </div>

    {/* Progress card skeleton */}
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-3 w-full rounded-full mb-4" />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center">
            <Skeleton className="h-6 w-12 mx-auto mb-1" />
            <Skeleton className="h-3 w-16 mx-auto" />
          </div>
        ))}
      </div>
    </div>

    {/* Action cards skeleton */}
    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);

export default Skeleton;

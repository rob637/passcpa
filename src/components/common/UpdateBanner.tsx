import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, X } from 'lucide-react';
import clsx from 'clsx';

interface UpdateBannerProps {
  onUpdate: () => void;
}

// Global state to trigger banner from outside React
let showUpdateBannerCallback: (() => void) | null = null;

export const triggerUpdateBanner = () => {
  if (showUpdateBannerCallback) {
    showUpdateBannerCallback();
  }
};

export const UpdateBanner = ({ onUpdate }: UpdateBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Register callback for external triggers
  useEffect(() => {
    showUpdateBannerCallback = () => {
      // Don't show if we just updated
      const justUpdated = localStorage.getItem('pwa-just-updated');
      if (justUpdated) {
        const elapsed = Date.now() - parseInt(justUpdated, 10);
        if (elapsed < 30000) {
          return; // Skip showing banner for 30 seconds after update
        }
      }
      setIsVisible(true);
    };
    
    // Check if there's a pending update from exam/practice session
    const pendingUpdate = sessionStorage.getItem('pwa-update-pending');
    if (pendingUpdate === 'true') {
      setIsVisible(true);
      sessionStorage.removeItem('pwa-update-pending');
    }

    return () => {
      showUpdateBannerCallback = null;
    };
  }, []);

  const handleUpdate = useCallback(() => {
    setIsUpdating(true);
    // Hide the banner while updating to prevent visual flash on reload
    setTimeout(() => {
      setIsVisible(false);
      onUpdate();
    }, 300);
  }, [onUpdate]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    // Store dismissal - will remind again on next visit
    sessionStorage.setItem('pwa-update-dismissed', Date.now().toString());
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 right-0 z-[200] safe-top',
        'animate-slide-down'
      )}
    >
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <RefreshCw className={clsx('w-4 h-4', isUpdating && 'animate-spin')} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm">Update Available</p>
              <p className="text-xs text-white/80 truncate">Tap to get the latest features</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className={clsx(
                'px-4 py-2 bg-white text-primary-700 rounded-xl font-semibold text-sm',
                'hover:bg-white/90 active:scale-95 transition-all',
                'disabled:opacity-70 disabled:cursor-not-allowed'
              )}
            >
              {isUpdating ? 'Updating...' : 'Update'}
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Dismiss update notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBanner;

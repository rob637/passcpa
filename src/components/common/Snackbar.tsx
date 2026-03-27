import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Undo2, CheckCircle, AlertCircle, Info } from 'lucide-react';
import clsx from 'clsx';

export interface SnackbarAction {
  label: string;
  onClick: () => void;
}

export interface SnackbarOptions {
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  duration?: number;
  action?: SnackbarAction;
  /** For undo actions - called after timeout if not undone */
  onTimeout?: () => void;
  dismissible?: boolean;
}

interface SnackbarState extends SnackbarOptions {
  id: number;
}

interface SnackbarContextValue {
  showSnackbar: (options: SnackbarOptions) => void;
  hideSnackbar: () => void;
  /** Convenience method for undo snackbars */
  showUndo: (message: string, onUndo: () => void, onConfirm: () => void) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

const typeConfig = {
  info: {
    icon: Info,
    bgClass: 'bg-slate-800 dark:bg-slate-700',
  },
  success: {
    icon: CheckCircle,
    bgClass: 'bg-green-600',
  },
  error: {
    icon: AlertCircle,
    bgClass: 'bg-red-600',
  },
  warning: {
    icon: AlertCircle,
    bgClass: 'bg-amber-600',
  },
};

/**
 * SnackbarProvider - Google Material Design Snackbar
 * 
 * Provides brief feedback about an operation with optional undo action.
 * Positioned above bottom navigation on mobile.
 */
export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const idRef = useRef(0);

  const hideSnackbar = useCallback(() => {
    setSnackbar(null);
  }, []);

  const showSnackbar = useCallback((options: SnackbarOptions) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const id = ++idRef.current;
    const duration = options.duration ?? 4000;

    setSnackbar({ ...options, id });

    // Auto-dismiss
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        setSnackbar(current => {
          if (current?.id === id) {
            // Call onTimeout if provided (for undo confirmations)
            options.onTimeout?.();
            return null;
          }
          return current;
        });
      }, duration);
    }
  }, []);

  const showUndo = useCallback((message: string, onUndo: () => void, onConfirm: () => void) => {
    showSnackbar({
      message,
      type: 'info',
      duration: 5000,
      action: {
        label: 'Undo',
        onClick: () => {
          onUndo();
          hideSnackbar();
        },
      },
      onTimeout: onConfirm,
      dismissible: true,
    });
  }, [showSnackbar, hideSnackbar]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const config = snackbar ? typeConfig[snackbar.type || 'info'] : null;
  const Icon = config?.icon;

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar, showUndo }}>
      {children}
      
      <AnimatePresence>
        {snackbar && config && Icon && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 30 
            }}
            className={clsx(
              'fixed z-50 left-4 right-4 md:left-auto md:right-6 md:max-w-md',
              'bottom-20 md:bottom-6', // Above mobile nav
              'rounded-lg shadow-lg',
              config.bgClass,
              'text-white'
            )}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              
              <p className="flex-1 text-sm font-medium">
                {snackbar.message}
              </p>
              
              {snackbar.action && (
                <button
                  onClick={snackbar.action.onClick}
                  className="flex items-center gap-1 px-3 py-1 text-sm font-bold 
                    bg-white/20 hover:bg-white/30 rounded transition-colors"
                >
                  {snackbar.action.label === 'Undo' && <Undo2 className="w-4 h-4" />}
                  {snackbar.action.label}
                </button>
              )}
              
              {snackbar.dismissible !== false && (
                <button
                  onClick={hideSnackbar}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SnackbarContext.Provider>
  );
};

/**
 * Hook to use snackbar
 */
export const useSnackbar = (): SnackbarContextValue => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export default SnackbarProvider;

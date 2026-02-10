/**
 * PWAInstallPrompt - World-class PWA install prompt component
 * 
 * Design principles (Google's approach):
 * 1. Value-first messaging - Tell users WHY to install
 * 2. Non-blocking - Bottom sheet, doesn't interrupt flow
 * 3. Contextual - Appears after meaningful engagement
 * 4. Respectful - Easy to dismiss, remembers preference
 * 5. Platform-aware - Different UX for iOS vs Android
 */

import React from 'react';
import { X, Download, Wifi, Zap, Trophy, Share, PlusSquare } from 'lucide-react';
import { usePWAInstall, hasMetEngagementThreshold } from '../../hooks/usePWAInstall';
import clsx from 'clsx';
import logger from '../../utils/logger';

interface PWAInstallPromptProps {
  /** Force show the prompt (for testing) */
  forceShow?: boolean;
  /** Custom class name */
  className?: string;
}

const VALUE_PROPS = [
  {
    icon: Wifi,
    title: 'Study Offline',
    description: 'Practice anywhere, no internet needed',
  },
  {
    icon: Zap,
    title: '2x Faster',
    description: 'Instant loading, native app feel',
  },
  {
    icon: Trophy,
    title: 'Never Miss a Streak',
    description: 'Quick access from home screen',
  },
];

/**
 * iOS-specific installation instructions
 */
function IOSInstallInstructions({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-t-2xl p-6 pb-8 animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Install VoraPrep
          </h3>
          <button
            onClick={onDismiss}
            className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Add VoraPrep to your home screen for the best experience
        </p>

        {/* Step-by-step instructions */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">1</span>
            </div>
            <div className="flex-1">
              <p className="text-slate-700 dark:text-slate-200 font-medium">
                Tap the Share button
              </p>
              <div className="flex items-center gap-2 mt-1 text-slate-500 dark:text-slate-400 text-sm">
                <Share className="w-4 h-4" />
                <span>at the bottom of Safari</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">2</span>
            </div>
            <div className="flex-1">
              <p className="text-slate-700 dark:text-slate-200 font-medium">
                Scroll and tap "Add to Home Screen"
              </p>
              <div className="flex items-center gap-2 mt-1 text-slate-500 dark:text-slate-400 text-sm">
                <PlusSquare className="w-4 h-4" />
                <span>in the share menu</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">3</span>
            </div>
            <div className="flex-1">
              <p className="text-slate-700 dark:text-slate-200 font-medium">
                Tap "Add" to confirm
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                VoraPrep will appear on your home screen
              </p>
            </div>
          </div>
        </div>

        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="w-full py-3 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}

/**
 * Android/Desktop native install prompt
 */
function NativeInstallPrompt({
  onInstall,
  onDismiss,
}: {
  onInstall: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-t-2xl p-6 pb-8 animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* App icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">VP</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Install VoraPrep
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                voraprep.com
              </p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Value propositions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {VALUE_PROPS.map((prop) => (
            <div
              key={prop.title}
              className="flex flex-col items-center text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50"
            >
              <prop.icon className="w-6 h-6 text-blue-500 mb-2" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                {prop.title}
              </span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onDismiss}
            className="flex-1 py-3 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Not Now
          </button>
          <button
            onClick={onInstall}
            className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Install
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact install banner (for persistent but non-intrusive prompting)
 */
export function PWAInstallBanner({ className }: { className?: string }) {
  const [state, actions] = usePWAInstall();

  // Don't show if can't install or already dismissed
  if ((!state.canInstall && !state.isIOS) || state.isInstalled || state.isDismissed) {
    return null;
  }

  // Only show after engagement threshold
  if (!hasMetEngagementThreshold()) {
    return null;
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Download className="w-4 h-4" />
        <span>Install app for offline study & faster loading</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={actions.showPrompt}
          className="px-3 py-1 bg-white text-blue-600 rounded font-medium text-xs hover:bg-blue-50 transition-colors"
        >
          Install
        </button>
        <button
          onClick={() => actions.dismissPrompt(7)}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/**
 * Main PWA install prompt - modal bottom sheet
 */
export function PWAInstallPrompt({ forceShow }: PWAInstallPromptProps) {
  const [state, actions] = usePWAInstall();

  // Determine what to show
  const shouldShow = forceShow || state.isPromptOpen;

  if (!shouldShow) {
    return null;
  }

  const handleInstall = async () => {
    const success = await actions.promptInstall();
    if (!success) {
      // If native prompt failed/dismissed, dismiss our UI too
      actions.dismissPrompt(3);
    }
    logger.info('PWA install result:', success ? 'installed' : 'declined');
  };

  const handleDismiss = () => {
    actions.dismissPrompt();
  };

  // iOS needs special instructions (no beforeinstallprompt support)
  if (state.isIOS) {
    return <IOSInstallInstructions onDismiss={handleDismiss} />;
  }

  return (
    <NativeInstallPrompt onInstall={handleInstall} onDismiss={handleDismiss} />
  );
}

/**
 * Hook to trigger PWA prompt based on engagement events
 */
export function usePWAPromptTrigger() {
  const [state, actions] = usePWAInstall();

  const triggerIfReady = React.useCallback(() => {
    // Don't trigger if already showing, dismissed, or installed
    if (state.isPromptOpen || state.isDismissed || state.isInstalled) {
      return false;
    }

    // Check if can install (has deferred prompt or is iOS)
    if (!state.canInstall && !state.isIOS) {
      return false;
    }

    // Check engagement threshold
    if (!hasMetEngagementThreshold()) {
      return false;
    }

    // All conditions met - show the prompt!
    actions.showPrompt();
    return true;
  }, [state, actions]);

  return { triggerIfReady, ...state, ...actions };
}

export default PWAInstallPrompt;

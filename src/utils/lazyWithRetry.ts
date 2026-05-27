import { lazy, ComponentType } from 'react';
import logger from './logger';

/**
 * Wraps React.lazy() with automatic retry and reload on chunk load failures.
 * This handles the "Failed to fetch dynamically imported module" error that occurs
 * when a PWA update changes chunk hashes but the page still references old chunks.
 * 
 * On failure:
 * 1. First attempt: Regular lazy load
 * 2. On failure: Clear caches and force reload the page
 * 
 * The forced reload ensures users get the new chunks after a PWA update.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithRetry<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    // One-shot retry per session. We use a *count* (not a clear-on-success
    // flag) because a single page load can resolve many lazy chunks: if any
    // of them succeed first they would have cleared the flag and let a
    // subsequent failing chunk trigger a second reload, producing an
    // infinite reload loop ("blinking" splash). Count never decreases for
    // the life of the tab session.
    const reloadCountKey = 'chunk-reload-count';
    const reloadCount = (() => {
      try {
        return parseInt(sessionStorage.getItem(reloadCountKey) || '0', 10) || 0;
      } catch {
        return 0;
      }
    })();
    const MAX_RELOADS = 1;

    try {
      return await importFn();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      // Check if this is a chunk loading error
      const isChunkError =
        errorMessage.includes('Failed to fetch dynamically imported module') ||
        errorMessage.includes('Loading chunk') ||
        errorMessage.includes('Loading CSS chunk') ||
        errorMessage.includes('ChunkLoadError');

      if (isChunkError && reloadCount < MAX_RELOADS) {
        logger.warn('Chunk load failed, reloading page to get new version:', errorMessage);

        // Increment the reload counter BEFORE reloading
        try {
          sessionStorage.setItem(reloadCountKey, String(reloadCount + 1));
        } catch {
          /* storage unavailable — best effort */
        }
        
        // Clear service worker caches before reload
        if ('caches' in window) {
          try {
            const cacheNames = await caches.keys();
            await Promise.all(
              cacheNames.map(name => caches.delete(name))
            );
            logger.info('Cleared all caches before reload');
          } catch (cacheError) {
            logger.warn('Failed to clear caches:', cacheError);
          }
        }
        
        // Force a hard reload (bypass cache)
        window.location.reload();
        
        // Return a never-resolving promise to prevent React from rendering
        // while the page is reloading
        return new Promise(() => {});
      }
      
      // If we've already tried reloading, or it's not a chunk error, re-throw
      // This will be caught by the ErrorBoundary
      throw error;
    }
  });
}

/**
 * Variant that includes named export support
 */
export function lazyNamedWithRetry<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ [key: string]: T }>,
  namedExport: string
): React.LazyExoticComponent<T> {
  return lazyWithRetry(() =>
    importFn().then(module => ({ default: module[namedExport] }))
  );
}

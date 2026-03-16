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
    // Check if we've already tried reloading for this error
    const hasReloadedKey = 'chunk-reload-attempted';
    const hasReloaded = sessionStorage.getItem(hasReloadedKey);
    
    try {
      const component = await importFn();
      // Success - clear the reload flag if it was set
      if (hasReloaded) {
        sessionStorage.removeItem(hasReloadedKey);
      }
      return component;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // Check if this is a chunk loading error
      const isChunkError = 
        errorMessage.includes('Failed to fetch dynamically imported module') ||
        errorMessage.includes('Loading chunk') ||
        errorMessage.includes('Loading CSS chunk') ||
        errorMessage.includes('ChunkLoadError');
      
      if (isChunkError && !hasReloaded) {
        logger.warn('Chunk load failed, reloading page to get new version:', errorMessage);
        
        // Mark that we've tried reloading
        sessionStorage.setItem(hasReloadedKey, Date.now().toString());
        
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

/**
 * Scroll utility functions for consistent scroll behavior across the app
 */

/**
 * Scrolls the page to the top immediately.
 * Uses multiple methods to ensure compatibility across all platforms and browsers.
 */
export const scrollToTop = (): void => {
  // Use instant behavior to avoid lag on navigation
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  // Also set scrollTop directly on document elements for maximum compatibility
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  // Handle any main content container that might have its own scroll
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.scrollTop = 0;
  }
};

/**
 * Scrolls the page to the top with smooth animation.
 */
export const scrollToTopSmooth = (): void => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

/**
 * Scrolls to a specific element by ID
 */
export const scrollToElement = (elementId: string, behavior: ScrollBehavior = 'smooth'): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior, block: 'start' });
  }
};

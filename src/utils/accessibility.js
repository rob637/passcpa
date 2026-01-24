// Accessibility Utilities
// WCAG 2.1 AA Compliant Helpers

/**
 * Announce message to screen readers via aria-live region
 */
export const announce = (message, priority = 'polite') => {
  const announcer = document.getElementById('sr-announcer') || createAnnouncer();
  announcer.setAttribute('aria-live', priority);

  // Clear and set message (required for re-announcement)
  announcer.textContent = '';
  setTimeout(() => {
    announcer.textContent = message;
  }, 100);
};

/**
 * Create the screen reader announcer element
 */
const createAnnouncer = () => {
  const announcer = document.createElement('div');
  announcer.id = 'sr-announcer';
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  announcer.style.cssText = `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `;
  document.body.appendChild(announcer);
  return announcer;
};

/**
 * Focus trap for modals and dialogs
 */
export class FocusTrap {
  constructor(element) {
    this.element = element;
    this.focusableElements = [];
    this.firstFocusable = null;
    this.lastFocusable = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  activate() {
    this.updateFocusableElements();
    this.element.addEventListener('keydown', this.handleKeyDown);
    this.firstFocusable?.focus();
  }

  deactivate() {
    this.element.removeEventListener('keydown', this.handleKeyDown);
  }

  updateFocusableElements() {
    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    this.focusableElements = Array.from(this.element.querySelectorAll(focusableSelectors));
    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
  }

  handleKeyDown(event) {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusable) {
        event.preventDefault();
        this.lastFocusable?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusable) {
        event.preventDefault();
        this.firstFocusable?.focus();
      }
    }
  }
}

/**
 * Skip link helper - creates skip navigation functionality
 */
export const initSkipLink = () => {
  const skipLink = document.querySelector('[data-skip-link]');
  const mainContent =
    document.querySelector('[data-main-content]') || document.querySelector('main');

  if (skipLink && mainContent) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      mainContent.addEventListener(
        'blur',
        () => {
          mainContent.removeAttribute('tabindex');
        },
        { once: true }
      );
    });
  }
};

/**
 * Reduce motion detection
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * High contrast mode detection
 */
export const prefersHighContrast = () => {
  return window.matchMedia('(prefers-contrast: more)').matches;
};

/**
 * ARIA helpers for dynamic content
 */
export const ariaHelpers = {
  // Update loading state
  setLoading: (element, isLoading) => {
    element.setAttribute('aria-busy', isLoading.toString());
    if (isLoading) {
      announce('Loading...', 'polite');
    }
  },

  // Update expanded state
  setExpanded: (trigger, panel, isExpanded) => {
    trigger.setAttribute('aria-expanded', isExpanded.toString());
    panel.setAttribute('aria-hidden', (!isExpanded).toString());
  },

  // Set error on form field
  setError: (input, errorId, errorMessage) => {
    if (errorMessage) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorId);
      announce(`Error: ${errorMessage}`, 'assertive');
    } else {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  },

  // Progress announcement
  announceProgress: (current, total, action = 'Completed') => {
    const percent = Math.round((current / total) * 100);
    announce(`${action} ${current} of ${total}, ${percent}% complete`);
  },
};

/**
 * Keyboard navigation helpers
 */
export const keyboardNav = {
  // Arrow key navigation for menus/lists
  handleArrowNav: (event, items, currentIndex, setIndex) => {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    setIndex(newIndex);
    items[newIndex]?.focus();
  },

  // Type-ahead search in lists
  createTypeAhead: (items, getLabel) => {
    let searchString = '';
    let searchTimeout = null;

    return (event) => {
      if (event.key.length !== 1) return;

      clearTimeout(searchTimeout);
      searchString += event.key.toLowerCase();

      const match = items.find((item) => getLabel(item).toLowerCase().startsWith(searchString));

      if (match) {
        match.focus();
      }

      searchTimeout = setTimeout(() => {
        searchString = '';
      }, 500);
    };
  },
};

/**
 * Color contrast checker (WCAG AA = 4.5:1, AAA = 7:1)
 */
export const checkContrast = (foreground, background) => {
  const getLuminance = (rgb) => {
    const [r, g, b] = rgb.map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const parseColor = (color) => {
    const match = color.match(/\d+/g);
    return match ? match.map(Number) : [0, 0, 0];
  };

  const l1 = getLuminance(parseColor(foreground));
  const l2 = getLuminance(parseColor(background));
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  return {
    ratio: ratio.toFixed(2),
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
  };
};

export default {
  announce,
  FocusTrap,
  initSkipLink,
  prefersReducedMotion,
  prefersHighContrast,
  ariaHelpers,
  keyboardNav,
  checkContrast,
};

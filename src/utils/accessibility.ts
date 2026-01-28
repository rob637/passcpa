// Enhanced Accessibility Utilities
// WCAG 2.1 AA/AAA Compliant Helpers
// TypeScript version with expanded functionality

/**
 * Accessible Color Types
 */
export interface ContrastResult {
  ratio: number;
  passesAA: boolean;
  passesAALarge: boolean;
  passesAAA: boolean;
  passesAAALarge: boolean;
  level: 'fail' | 'AA-large' | 'AA' | 'AAA';
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

/**
 * Screen Reader Announcement Queue
 * Manages multiple announcements without overlap
 */
class AnnouncementQueue {
  private queue: Array<{ message: string; priority: 'polite' | 'assertive' }> = [];
  private isProcessing = false;
  private announcer: HTMLElement | null = null;

  private getAnnouncer(): HTMLElement {
    if (!this.announcer) {
      this.announcer = document.getElementById('sr-announcer') || this.createAnnouncer();
    }
    return this.announcer;
  }

  private createAnnouncer(): HTMLElement {
    const announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    Object.assign(announcer.style, {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0',
    });
    document.body.appendChild(announcer);
    return announcer;
  }

  enqueue(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    // Assertive announcements go to front of queue
    if (priority === 'assertive') {
      this.queue.unshift({ message, priority });
    } else {
      this.queue.push({ message, priority });
    }
    this.processQueue();
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const announcer = this.getAnnouncer();

    while (this.queue.length > 0) {
      const item = this.queue.shift()!;
      announcer.setAttribute('aria-live', item.priority);
      announcer.textContent = '';
      
      await new Promise(resolve => setTimeout(resolve, 100));
      announcer.textContent = item.message;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for SR to read
    }

    this.isProcessing = false;
  }

  clear(): void {
    this.queue = [];
  }
}

const announcementQueue = new AnnouncementQueue();

/**
 * Announce message to screen readers
 */
export const announce = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  announcementQueue.enqueue(message, priority);
};

/**
 * Announce immediately, clearing queue
 */
export const announceImmediate = (message: string): void => {
  announcementQueue.clear();
  announcementQueue.enqueue(message, 'assertive');
};

/**
 * Enhanced Focus Trap for modals and dialogs
 */
export class FocusTrap {
  private element: HTMLElement;
  private focusableElements: HTMLElement[] = [];
  private firstFocusable: HTMLElement | null = null;
  private lastFocusable: HTMLElement | null = null;
  private previousActiveElement: Element | null = null;
  private active = false;

  private static readonly FOCUSABLE_SELECTORS = [
    'button:not([disabled]):not([aria-hidden="true"])',
    'a[href]:not([aria-hidden="true"])',
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden="true"])',
    'select:not([disabled]):not([aria-hidden="true"])',
    'textarea:not([disabled]):not([aria-hidden="true"])',
    '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])',
    '[contenteditable="true"]:not([aria-hidden="true"])',
  ].join(', ');

  constructor(element: HTMLElement) {
    this.element = element;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  activate(): void {
    if (this.active) return;
    
    this.active = true;
    this.previousActiveElement = document.activeElement;
    this.updateFocusableElements();
    this.element.addEventListener('keydown', this.handleKeyDown);
    
    // Delay focus to allow animations
    requestAnimationFrame(() => {
      this.firstFocusable?.focus();
    });
  }

  deactivate(restoreFocus = true): void {
    if (!this.active) return;
    
    this.active = false;
    this.element.removeEventListener('keydown', this.handleKeyDown);
    
    if (restoreFocus && this.previousActiveElement instanceof HTMLElement) {
      this.previousActiveElement.focus();
    }
  }

  updateFocusableElements(): void {
    this.focusableElements = Array.from(
      this.element.querySelectorAll(FocusTrap.FOCUSABLE_SELECTORS)
    ) as HTMLElement[];
    
    // Filter out elements that are not visible
    this.focusableElements = this.focusableElements.filter(el => {
      const style = getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
    
    this.firstFocusable = this.focusableElements[0] || null;
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1] || null;
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.element.dispatchEvent(new CustomEvent('focustrap:escape'));
      return;
    }

    if (event.key !== 'Tab') return;

    this.updateFocusableElements(); // Re-check in case DOM changed

    if (this.focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey) {
      if (document.activeElement === this.firstFocusable) {
        event.preventDefault();
        this.lastFocusable?.focus();
      }
    } else {
      if (document.activeElement === this.lastFocusable) {
        event.preventDefault();
        this.firstFocusable?.focus();
      }
    }
  }
}

/**
 * Skip navigation functionality
 */
export const initSkipLinks = (): void => {
  const skipLinks = document.querySelectorAll('[data-skip-link]');
  
  skipLinks.forEach(link => {
    link.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const href = (link as HTMLAnchorElement).getAttribute('href');
      if (!href) return;
      
      const target = document.querySelector(href) || document.querySelector(`[data-skip-target="${href.slice(1)}"]`);
      if (target instanceof HTMLElement) {
        target.setAttribute('tabindex', '-1');
        target.focus();
        target.addEventListener('blur', () => {
          target.removeAttribute('tabindex');
        }, { once: true });
      }
    });
  });
};

/**
 * Media Query Preferences
 */
export const mediaPreferences = {
  prefersReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  prefersReducedTransparency: (): boolean => {
    return window.matchMedia('(prefers-reduced-transparency: reduce)').matches;
  },

  prefersHighContrast: (): boolean => {
    return window.matchMedia('(prefers-contrast: more)').matches;
  },

  prefersDarkMode: (): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  },

  prefersLowContrast: (): boolean => {
    return window.matchMedia('(prefers-contrast: less)').matches;
  },

  // Subscribe to preference changes
  onReducedMotionChange: (callback: (prefersReduced: boolean) => void): (() => void) => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => callback(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  },

  onColorSchemeChange: (callback: (prefersDark: boolean) => void): (() => void) => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => callback(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  },
};

/**
 * Enhanced ARIA helpers
 */
export const ariaHelpers = {
  setLoading: (element: HTMLElement, isLoading: boolean, announceChange = true): void => {
    element.setAttribute('aria-busy', isLoading.toString());
    if (announceChange) {
      if (isLoading) {
        announce('Loading content...', 'polite');
      } else {
        announce('Content loaded', 'polite');
      }
    }
  },

  setExpanded: (
    trigger: HTMLElement, 
    panel: HTMLElement, 
    isExpanded: boolean,
    announceChange = false
  ): void => {
    trigger.setAttribute('aria-expanded', isExpanded.toString());
    panel.setAttribute('aria-hidden', (!isExpanded).toString());
    
    if (announceChange) {
      const label = trigger.getAttribute('aria-label') || trigger.textContent || 'Section';
      announce(`${label} ${isExpanded ? 'expanded' : 'collapsed'}`, 'polite');
    }
  },

  setSelected: (element: HTMLElement, isSelected: boolean): void => {
    element.setAttribute('aria-selected', isSelected.toString());
  },

  setPressed: (element: HTMLElement, isPressed: boolean): void => {
    element.setAttribute('aria-pressed', isPressed.toString());
  },

  setError: (
    input: HTMLElement, 
    errorId: string, 
    errorMessage: string | null,
    announceError = true
  ): void => {
    if (errorMessage) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorId);
      if (announceError) {
        announce(`Error: ${errorMessage}`, 'assertive');
      }
    } else {
      input.removeAttribute('aria-invalid');
      const existingDesc = input.getAttribute('aria-describedby');
      if (existingDesc === errorId) {
        input.removeAttribute('aria-describedby');
      }
    }
  },

  announceProgress: (
    current: number, 
    total: number, 
    action = 'Completed',
    silent = false
  ): string => {
    const percent = Math.round((current / total) * 100);
    const message = `${action} ${current} of ${total}, ${percent}% complete`;
    if (!silent) {
      announce(message, 'polite');
    }
    return message;
  },

  announceResult: (isCorrect: boolean, explanation?: string): void => {
    const baseMessage = isCorrect ? 'Correct!' : 'Incorrect.';
    const message = explanation ? `${baseMessage} ${explanation}` : baseMessage;
    announce(message, 'polite');
  },

  announceTimer: (secondsRemaining: number, thresholds = [300, 60, 30, 10]): void => {
    if (thresholds.includes(secondsRemaining)) {
      const minutes = Math.floor(secondsRemaining / 60);
      const seconds = secondsRemaining % 60;
      let message: string;
      
      if (minutes > 0) {
        message = `${minutes} minute${minutes !== 1 ? 's' : ''} remaining`;
      } else {
        message = `${seconds} second${seconds !== 1 ? 's' : ''} remaining`;
      }
      
      announce(message, secondsRemaining <= 30 ? 'assertive' : 'polite');
    }
  },

  // Create live region for dynamic content
  createLiveRegion: (
    politeness: 'polite' | 'assertive' = 'polite',
    atomic = true
  ): HTMLElement => {
    const region = document.createElement('div');
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', politeness);
    region.setAttribute('aria-atomic', atomic.toString());
    region.className = 'sr-only';
    return region;
  },
};

/**
 * Enhanced keyboard navigation
 */
export const keyboardNav = {
  handleArrowNav: (
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    setIndex: (index: number) => void,
    options: { wrap?: boolean; orientation?: 'horizontal' | 'vertical' | 'both' } = {}
  ): void => {
    const { wrap = true, orientation = 'both' } = options;
    let newIndex = currentIndex;
    const maxIndex = items.length - 1;

    const isVertical = orientation === 'vertical' || orientation === 'both';
    const isHorizontal = orientation === 'horizontal' || orientation === 'both';

    switch (event.key) {
      case 'ArrowDown':
        if (isVertical) {
          event.preventDefault();
          newIndex = wrap 
            ? (currentIndex + 1) % items.length 
            : Math.min(currentIndex + 1, maxIndex);
        }
        break;
      case 'ArrowUp':
        if (isVertical) {
          event.preventDefault();
          newIndex = wrap 
            ? (currentIndex - 1 + items.length) % items.length 
            : Math.max(currentIndex - 1, 0);
        }
        break;
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          newIndex = wrap 
            ? (currentIndex + 1) % items.length 
            : Math.min(currentIndex + 1, maxIndex);
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          newIndex = wrap 
            ? (currentIndex - 1 + items.length) % items.length 
            : Math.max(currentIndex - 1, 0);
        }
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = maxIndex;
        break;
      default:
        return;
    }

    if (newIndex !== currentIndex) {
      setIndex(newIndex);
      items[newIndex]?.focus();
    }
  },

  createTypeAhead: <T extends HTMLElement>(
    items: T[],
    getLabel: (item: T) => string,
    timeout = 500
  ): ((event: KeyboardEvent) => void) => {
    let searchString = '';
    let searchTimeout: number | null = null;

    return (event: KeyboardEvent): void => {
      if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;

      if (searchTimeout) clearTimeout(searchTimeout);
      searchString += event.key.toLowerCase();

      const match = items.find(item => 
        getLabel(item).toLowerCase().startsWith(searchString)
      );

      if (match) {
        match.focus();
      }

      searchTimeout = window.setTimeout(() => {
        searchString = '';
      }, timeout);
    };
  },

  // Handle roving tabindex pattern
  handleRovingTabindex: (items: HTMLElement[], activeIndex: number): void => {
    items.forEach((item, index) => {
      item.setAttribute('tabindex', index === activeIndex ? '0' : '-1');
    });
  },
};

/**
 * Color and Contrast Utilities
 */
export const colorUtils = {
  parseColor: (color: string): RGBColor | null => {
    // Handle hex colors
    const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (hexMatch) {
      return {
        r: parseInt(hexMatch[1], 16),
        g: parseInt(hexMatch[2], 16),
        b: parseInt(hexMatch[3], 16),
      };
    }

    // Handle short hex colors
    const shortHexMatch = color.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
    if (shortHexMatch) {
      return {
        r: parseInt(shortHexMatch[1] + shortHexMatch[1], 16),
        g: parseInt(shortHexMatch[2] + shortHexMatch[2], 16),
        b: parseInt(shortHexMatch[3] + shortHexMatch[3], 16),
      };
    }

    // Handle rgb/rgba colors
    const rgbMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if (rgbMatch) {
      return {
        r: parseInt(rgbMatch[1]),
        g: parseInt(rgbMatch[2]),
        b: parseInt(rgbMatch[3]),
      };
    }

    return null;
  },

  getLuminance: (rgb: RGBColor): number => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  },

  checkContrast: (foreground: string, background: string): ContrastResult | null => {
    const fgRgb = colorUtils.parseColor(foreground);
    const bgRgb = colorUtils.parseColor(background);

    if (!fgRgb || !bgRgb) return null;

    const l1 = colorUtils.getLuminance(fgRgb);
    const l2 = colorUtils.getLuminance(bgRgb);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    const passesAA = ratio >= 4.5;
    const passesAALarge = ratio >= 3;
    const passesAAA = ratio >= 7;
    const passesAAALarge = ratio >= 4.5;

    let level: ContrastResult['level'] = 'fail';
    if (passesAAA) level = 'AAA';
    else if (passesAA) level = 'AA';
    else if (passesAALarge) level = 'AA-large';

    return {
      ratio: Math.round(ratio * 100) / 100,
      passesAA,
      passesAALarge,
      passesAAA,
      passesAAALarge,
      level,
    };
  },

  suggestAccessibleColor: (
    background: string, 
    targetRatio = 4.5
  ): { white: boolean; black: boolean; recommendation: string } => {
    const whiteContrast = colorUtils.checkContrast('#ffffff', background);
    const blackContrast = colorUtils.checkContrast('#000000', background);

    const whitePasses = whiteContrast && whiteContrast.ratio >= targetRatio;
    const blackPasses = blackContrast && blackContrast.ratio >= targetRatio;

    let recommendation: string;
    if (whitePasses && blackPasses) {
      recommendation = whiteContrast!.ratio > blackContrast!.ratio ? 'white' : 'black';
    } else if (whitePasses) {
      recommendation = 'white';
    } else if (blackPasses) {
      recommendation = 'black';
    } else {
      recommendation = (whiteContrast?.ratio || 0) > (blackContrast?.ratio || 0) ? 'white' : 'black';
    }

    return {
      white: whitePasses || false,
      black: blackPasses || false,
      recommendation,
    };
  },
};

/**
 * Focus visible management
 */
export const focusVisible = {
  // Track if user is using keyboard navigation
  isKeyboardUser: false,
  
  init: (): (() => void) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        focusVisible.isKeyboardUser = true;
        document.body.classList.add('keyboard-user');
      }
    };

    const handleMouseDown = () => {
      focusVisible.isKeyboardUser = false;
      document.body.classList.remove('keyboard-user');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  },
};

/**
 * Reduced motion animation utilities
 */
export const motionUtils = {
  // Get appropriate duration based on preference
  getDuration: (fullDuration: number, reducedDuration = 0): number => {
    return mediaPreferences.prefersReducedMotion() ? reducedDuration : fullDuration;
  },

  // Get CSS transition with reduced motion support
  getTransition: (property: string, duration: number, easing = 'ease'): string => {
    const actualDuration = motionUtils.getDuration(duration, 0);
    return actualDuration > 0 ? `${property} ${actualDuration}ms ${easing}` : 'none';
  },

  // Animate with reduced motion support
  animate: (
    element: HTMLElement,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions
  ): Animation | null => {
    if (mediaPreferences.prefersReducedMotion()) {
      // Jump to end state immediately
      const lastKeyframe = keyframes[keyframes.length - 1];
      Object.assign(element.style, lastKeyframe);
      return null;
    }
    return element.animate(keyframes, options);
  },
};

export default {
  announce,
  announceImmediate,
  FocusTrap,
  initSkipLinks,
  mediaPreferences,
  ariaHelpers,
  keyboardNav,
  colorUtils,
  focusVisible,
  motionUtils,
};

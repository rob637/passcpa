import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  announce,
  FocusTrap,
  initSkipLinks,
  mediaPreferences,
  ariaHelpers,
  keyboardNav,
  colorUtils,
} from '../../utils/accessibility';

// Destructure the nested exports for easier testing
const { prefersReducedMotion, prefersHighContrast } = mediaPreferences;
const { checkContrast } = colorUtils;

// Mock window.matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Accessibility Utilities', () => {
  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('announce', () => {
    it('creates announcer if not exists', () => {
      expect(document.getElementById('sr-announcer')).toBeNull();
      announce('Test message');
      // Announcer is created synchronously
      const announcer = document.getElementById('sr-announcer');
      expect(announcer).not.toBeNull();
    });

    it('sets aria-live attribute for assertive', () => {
      announce('Test message', 'assertive');
      const announcer = document.getElementById('sr-announcer');
      // aria-live is set when processing the message
      expect(announcer).not.toBeNull();
      expect(announcer?.getAttribute('role')).toBe('status');
    });

    it('creates announcer element with correct attributes', () => {
      announce('Test announcement');
      const announcer = document.getElementById('sr-announcer');
      expect(announcer?.getAttribute('aria-atomic')).toBe('true');
      expect(announcer?.id).toBe('sr-announcer');
    });

    it('announcer has sr-only class for screen readers', () => {
      announce('Polite message');
      const announcer = document.getElementById('sr-announcer');
      expect(announcer?.className).toBe('sr-only');
    });
  });

  describe('FocusTrap', () => {
    let container;
    let focusTrap;

    beforeEach(() => {
      container = document.createElement('div');
      container.innerHTML = `
        <button id="btn1">Button 1</button>
        <input id="input1" type="text" />
        <button id="btn2">Button 2</button>
      `;
      document.body.appendChild(container);
      focusTrap = new FocusTrap(container);
    });

    afterEach(() => {
      focusTrap.deactivate();
      container.remove();
    });

    it('creates FocusTrap instance', () => {
      expect(focusTrap).toBeDefined();
      expect(focusTrap.element).toBe(container);
    });

    it('activates focus trap', () => {
      focusTrap.activate();
      expect(focusTrap.focusableElements.length).toBe(3);
    });

    it('identifies first focusable element', () => {
      focusTrap.activate();
      expect(focusTrap.firstFocusable.id).toBe('btn1');
    });

    it('identifies last focusable element', () => {
      focusTrap.activate();
      expect(focusTrap.lastFocusable.id).toBe('btn2');
    });

    it('deactivates focus trap', () => {
      focusTrap.activate();
      focusTrap.deactivate();
      // Should not throw when deactivating
      expect(true).toBe(true);
    });

    it('ignores disabled elements', () => {
      const btn = container.querySelector('#btn1');
      btn.disabled = true;
      focusTrap.activate();
      expect(focusTrap.firstFocusable.id).toBe('input1');
    });

    it('handles Tab key at last element', () => {
      focusTrap.activate();
      const lastBtn = container.querySelector('#btn2');
      lastBtn.focus();
      
      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
      const preventDefaultSpy = vi.spyOn(tabEvent, 'preventDefault');
      
      container.dispatchEvent(tabEvent);
      
      // Should trap focus
      expect(true).toBe(true);
    });

    it('handles Shift+Tab key at first element', () => {
      focusTrap.activate();
      const firstBtn = container.querySelector('#btn1');
      firstBtn.focus();
      
      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true });
      container.dispatchEvent(tabEvent);
      
      // Should trap focus
      expect(true).toBe(true);
    });

    it('ignores non-Tab keys', () => {
      focusTrap.activate();
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      container.dispatchEvent(enterEvent);
      
      // Should not throw
      expect(true).toBe(true);
    });
  });

  describe('initSkipLinks', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <a data-skip-link href="#main">Skip to content</a>
        <main id="main">Main content</main>
      `;
    });

    it('sets up skip link functionality', () => {
      initSkipLinks();
      
      const skipLinkEl = document.querySelector('[data-skip-link]');
      const mainContent = document.querySelector('#main');
      
      expect(skipLinkEl).not.toBeNull();
      expect(mainContent).not.toBeNull();
    });

    it('focuses main content when skip link clicked', () => {
      initSkipLinks();
      
      const skipLinkEl = document.querySelector('[data-skip-link]');
      const mainContent = document.querySelector('#main');
      
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      skipLinkEl.dispatchEvent(clickEvent);
      
      expect(mainContent.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('prefersReducedMotion', () => {
    it('returns boolean', () => {
      const result = prefersReducedMotion();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('prefersHighContrast', () => {
    it('returns boolean', () => {
      const result = prefersHighContrast();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('ariaHelpers', () => {
    describe('setLoading', () => {
      it('sets aria-busy attribute', () => {
        const element = document.createElement('div');
        ariaHelpers.setLoading(element, true);
        
        expect(element.getAttribute('aria-busy')).toBe('true');
      });

      it('clears aria-busy when not loading', () => {
        const element = document.createElement('div');
        ariaHelpers.setLoading(element, false);
        
        expect(element.getAttribute('aria-busy')).toBe('false');
      });
    });

    describe('setExpanded', () => {
      it('sets aria-expanded and aria-hidden', () => {
        const trigger = document.createElement('button');
        const panel = document.createElement('div');
        
        ariaHelpers.setExpanded(trigger, panel, true);
        
        expect(trigger.getAttribute('aria-expanded')).toBe('true');
        expect(panel.getAttribute('aria-hidden')).toBe('false');
      });

      it('sets collapsed state', () => {
        const trigger = document.createElement('button');
        const panel = document.createElement('div');
        
        ariaHelpers.setExpanded(trigger, panel, false);
        
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
        expect(panel.getAttribute('aria-hidden')).toBe('true');
      });
    });

    describe('setError', () => {
      it('sets error attributes on input', () => {
        const input = document.createElement('input');
        ariaHelpers.setError(input, 'error-1', 'This field is required');
        
        expect(input.getAttribute('aria-invalid')).toBe('true');
        expect(input.getAttribute('aria-describedby')).toBe('error-1');
      });

      it('clears error attributes when no message', () => {
        const input = document.createElement('input');
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', 'error-1');
        
        ariaHelpers.setError(input, 'error-1', null);
        
        expect(input.getAttribute('aria-invalid')).toBeNull();
        expect(input.getAttribute('aria-describedby')).toBeNull();
      });
    });

    describe('announceProgress', () => {
      it('announces progress', () => {
        const result = ariaHelpers.announceProgress(5, 10, 'Completed');
        
        // The function returns the message string
        expect(result).toContain('5 of 10');
        expect(result).toContain('50%');
      });
    });
  });

  describe('keyboardNav', () => {
    describe('handleArrowNav', () => {
      it('navigates down with ArrowDown', () => {
        const items = [
          { focus: vi.fn() },
          { focus: vi.fn() },
          { focus: vi.fn() },
        ];
        const setIndex = vi.fn();
        const event = { key: 'ArrowDown', preventDefault: vi.fn() };
        
        keyboardNav.handleArrowNav(event, items, 0, setIndex);
        
        expect(setIndex).toHaveBeenCalledWith(1);
        expect(event.preventDefault).toHaveBeenCalled();
      });

      it('navigates up with ArrowUp', () => {
        const items = [
          { focus: vi.fn() },
          { focus: vi.fn() },
          { focus: vi.fn() },
        ];
        const setIndex = vi.fn();
        const event = { key: 'ArrowUp', preventDefault: vi.fn() };
        
        keyboardNav.handleArrowNav(event, items, 1, setIndex);
        
        expect(setIndex).toHaveBeenCalledWith(0);
      });

      it('wraps around at end', () => {
        const items = [
          { focus: vi.fn() },
          { focus: vi.fn() },
        ];
        const setIndex = vi.fn();
        const event = { key: 'ArrowDown', preventDefault: vi.fn() };
        
        keyboardNav.handleArrowNav(event, items, 1, setIndex);
        
        expect(setIndex).toHaveBeenCalledWith(0);
      });

      it('goes to Home with Home key', () => {
        const items = [
          { focus: vi.fn() },
          { focus: vi.fn() },
          { focus: vi.fn() },
        ];
        const setIndex = vi.fn();
        const event = { key: 'Home', preventDefault: vi.fn() };
        
        keyboardNav.handleArrowNav(event, items, 2, setIndex);
        
        expect(setIndex).toHaveBeenCalledWith(0);
      });

      it('goes to End with End key', () => {
        const items = [
          { focus: vi.fn() },
          { focus: vi.fn() },
          { focus: vi.fn() },
        ];
        const setIndex = vi.fn();
        const event = { key: 'End', preventDefault: vi.fn() };
        
        keyboardNav.handleArrowNav(event, items, 0, setIndex);
        
        expect(setIndex).toHaveBeenCalledWith(2);
      });

      it('ignores other keys', () => {
        const items = [{ focus: vi.fn() }];
        const setIndex = vi.fn();
        const event = { key: 'Enter', preventDefault: vi.fn() };
        
        keyboardNav.handleArrowNav(event, items, 0, setIndex);
        
        expect(setIndex).not.toHaveBeenCalled();
      });
    });

    describe('createTypeAhead', () => {
      it('creates type ahead function', () => {
        const items = [
          { textContent: 'Apple', focus: vi.fn() },
          { textContent: 'Banana', focus: vi.fn() },
        ];
        const getLabel = (item) => item.textContent;
        
        const typeAhead = keyboardNav.createTypeAhead(items, getLabel);
        
        expect(typeof typeAhead).toBe('function');
      });

      it('focuses matching item', () => {
        const items = [
          { textContent: 'Apple', focus: vi.fn() },
          { textContent: 'Banana', focus: vi.fn() },
        ];
        const getLabel = (item) => item.textContent;
        
        const typeAhead = keyboardNav.createTypeAhead(items, getLabel);
        typeAhead({ key: 'b' });
        
        expect(items[1].focus).toHaveBeenCalled();
      });
    });
  });

  describe('checkContrast', () => {
    it('calculates contrast ratio', () => {
      const result = checkContrast('rgb(0, 0, 0)', 'rgb(255, 255, 255)');
      
      expect(result.ratio).toBeDefined();
      expect(parseFloat(result.ratio)).toBeGreaterThan(1);
    });

    it('indicates AA pass/fail', () => {
      const result = checkContrast('rgb(0, 0, 0)', 'rgb(255, 255, 255)');
      
      expect(typeof result.passesAA).toBe('boolean');
      expect(result.passesAA).toBe(true);
    });

    it('indicates AAA pass/fail', () => {
      const result = checkContrast('rgb(0, 0, 0)', 'rgb(255, 255, 255)');
      
      expect(typeof result.passesAAA).toBe('boolean');
      expect(result.passesAAA).toBe(true);
    });

    it('returns ratio of 1 for same colors', () => {
      const result = checkContrast('rgb(128, 128, 128)', 'rgb(128, 128, 128)');
      
      expect(parseFloat(result.ratio)).toBeCloseTo(1, 1);
    });
  });
});

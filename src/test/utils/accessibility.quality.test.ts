/**
 * REAL Quality Tests for Accessibility Utilities
 * 
 * Tests WCAG 2.1 compliance helpers using the actual exported functions.
 * Tests the real colorUtils, FocusTrap, announce, and other accessibility utilities.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  colorUtils,
  FocusTrap,
  announce,
  announceImmediate,
  ariaHelpers,
  keyboardNav,
  mediaPreferences,
  focusVisible,
  motionUtils,
} from '../../utils/accessibility';

describe('Accessibility Utilities - REAL Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.useFakeTimers();
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      setTimeout(() => cb(performance.now()), 0);
      return 0;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  describe('colorUtils.parseColor', () => {
    it('should parse 6-character hex colors', () => {
      const result = colorUtils.parseColor('#ff0000');
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should parse hex colors without #', () => {
      const result = colorUtils.parseColor('00ff00');
      expect(result).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('should parse 3-character hex colors', () => {
      const result = colorUtils.parseColor('#fff');
      expect(result).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('should parse rgb() format', () => {
      const result = colorUtils.parseColor('rgb(128, 64, 32)');
      expect(result).toEqual({ r: 128, g: 64, b: 32 });
    });

    it('should parse rgba() format', () => {
      const result = colorUtils.parseColor('rgba(255, 128, 64, 0.5)');
      expect(result).toEqual({ r: 255, g: 128, b: 64 });
    });

    it('should return null for invalid color strings', () => {
      expect(colorUtils.parseColor('invalid')).toBeNull();
      expect(colorUtils.parseColor('not-a-color')).toBeNull();
    });
  });

  describe('colorUtils.getLuminance', () => {
    it('should return 0 for pure black', () => {
      const luminance = colorUtils.getLuminance({ r: 0, g: 0, b: 0 });
      expect(luminance).toBeCloseTo(0, 4);
    });

    it('should return 1 for pure white', () => {
      const luminance = colorUtils.getLuminance({ r: 255, g: 255, b: 255 });
      expect(luminance).toBeCloseTo(1, 4);
    });

    it('should calculate correct luminance for pure red', () => {
      const luminance = colorUtils.getLuminance({ r: 255, g: 0, b: 0 });
      expect(luminance).toBeCloseTo(0.2126, 3);
    });

    it('should calculate correct luminance for pure green', () => {
      const luminance = colorUtils.getLuminance({ r: 0, g: 255, b: 0 });
      expect(luminance).toBeCloseTo(0.7152, 3);
    });

    it('should calculate correct luminance for pure blue', () => {
      const luminance = colorUtils.getLuminance({ r: 0, g: 0, b: 255 });
      expect(luminance).toBeCloseTo(0.0722, 3);
    });
  });

  describe('colorUtils.checkContrast', () => {
    it('should return 21:1 ratio for black on white', () => {
      const result = colorUtils.checkContrast('#000000', '#ffffff');
      expect(result).not.toBeNull();
      expect(result!.ratio).toBeCloseTo(21, 0);
    });

    it('should return 21:1 ratio for white on black', () => {
      const result = colorUtils.checkContrast('#ffffff', '#000000');
      expect(result).not.toBeNull();
      expect(result!.ratio).toBeCloseTo(21, 0);
    });

    it('should return 1:1 ratio for same colors', () => {
      const result = colorUtils.checkContrast('#336699', '#336699');
      expect(result).not.toBeNull();
      expect(result!.ratio).toBeCloseTo(1, 1);
    });

    it('should correctly identify AA compliance', () => {
      // Black on white passes everything
      const highContrast = colorUtils.checkContrast('#000000', '#ffffff');
      expect(highContrast!.passesAA).toBe(true);
      expect(highContrast!.passesAAA).toBe(true);
      
      // Same color fails everything
      const noContrast = colorUtils.checkContrast('#888888', '#888888');
      expect(noContrast!.passesAA).toBe(false);
      expect(noContrast!.passesAALarge).toBe(false);
    });

    it('should return correct level string', () => {
      const aaa = colorUtils.checkContrast('#000000', '#ffffff');
      expect(aaa!.level).toBe('AAA');
      
      const fail = colorUtils.checkContrast('#777777', '#888888');
      expect(fail!.level).toBe('fail');
    });

    it('should return null for invalid colors', () => {
      expect(colorUtils.checkContrast('invalid', '#ffffff')).toBeNull();
      expect(colorUtils.checkContrast('#ffffff', 'not-a-color')).toBeNull();
    });
  });

  describe('colorUtils.suggestAccessibleColor', () => {
    it('should recommend black text on light backgrounds', () => {
      const result = colorUtils.suggestAccessibleColor('#ffffff');
      expect(result.black).toBe(true);
      expect(result.recommendation).toBe('black');
    });

    it('should recommend white text on dark backgrounds', () => {
      const result = colorUtils.suggestAccessibleColor('#000000');
      expect(result.white).toBe(true);
      expect(result.recommendation).toBe('white');
    });

    it('should handle medium backgrounds', () => {
      const result = colorUtils.suggestAccessibleColor('#808080');
      // For gray, both might not pass but it should give a recommendation
      expect(['white', 'black']).toContain(result.recommendation);
    });
  });

  describe('FocusTrap', () => {
    it('should create an instance', () => {
      const container = document.createElement('div');
      const trap = new FocusTrap(container);
      expect(trap).toBeDefined();
    });

    it('should activate and focus first focusable element', async () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button id="first">First</button>
        <input type="text" id="input" />
        <button id="last">Last</button>
      `;
      document.body.appendChild(container);
      
      const trap = new FocusTrap(container);
      trap.activate();
      
      await vi.advanceTimersByTimeAsync(100);
      
      // Should focus first focusable element
      expect(document.activeElement?.id).toBe('first');
    });

    it('should skip disabled elements', async () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button disabled id="disabled">Disabled</button>
        <button id="enabled">Enabled</button>
      `;
      document.body.appendChild(container);
      
      const trap = new FocusTrap(container);
      trap.activate();
      
      await vi.advanceTimersByTimeAsync(100);
      
      // Should focus enabled button, not disabled one
      expect(document.activeElement?.id).toBe('enabled');
    });

    it('should restore focus on deactivate', async () => {
      const originalButton = document.createElement('button');
      originalButton.id = 'original';
      document.body.appendChild(originalButton);
      originalButton.focus();
      
      expect(document.activeElement?.id).toBe('original');
      
      const container = document.createElement('div');
      container.innerHTML = '<button id="modal">Modal Button</button>';
      document.body.appendChild(container);
      
      const trap = new FocusTrap(container);
      trap.activate();
      await vi.advanceTimersByTimeAsync(100);
      
      // Focus moved to modal
      expect(document.activeElement?.id).toBe('modal');
      
      // Deactivate with restore = true
      trap.deactivate(true);
      
      // Focus should return to original
      expect(document.activeElement?.id).toBe('original');
    });

    it('should emit focustrap:escape event on Escape key', () => {
      const container = document.createElement('div');
      container.innerHTML = '<button>Button</button>';
      document.body.appendChild(container);
      
      const trap = new FocusTrap(container);
      trap.activate();
      
      let escaped = false;
      container.addEventListener('focustrap:escape', () => {
        escaped = true;
      });
      
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      container.dispatchEvent(event);
      
      expect(escaped).toBe(true);
    });

    it('should handle empty container without throwing', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      
      const trap = new FocusTrap(container);
      expect(() => trap.activate()).not.toThrow();
    });
  });

  describe('announce', () => {
    // The announce function uses an async queue that appends to document.body
    // These tests verify the announcer is properly created and configured
    
    it('should create announcer element via function call', async () => {
      // Call announce - this triggers the announcer creation
      announce('Test message');
      
      // The announcer is created lazily by the queue
      // We need real timers to let the async queue process
      vi.useRealTimers();
      await new Promise(resolve => setTimeout(resolve, 150));
      vi.useFakeTimers();
      
      const announcer = document.getElementById('sr-announcer');
      expect(announcer).toBeTruthy();
    });

    it('should not throw when called', () => {
      expect(() => announce('Test')).not.toThrow();
    });

    it('should handle empty messages', () => {
      expect(() => announce('')).not.toThrow();
    });

    it('should handle special characters', () => {
      expect(() => announce('Score: <100%> & "good"')).not.toThrow();
    });

    it('should handle multiple rapid announcements', () => {
      expect(() => {
        announce('First');
        announce('Second');
        announce('Third');
      }).not.toThrow();
    });
  });

  describe('announceImmediate', () => {
    it('should not throw when called', () => {
      expect(() => announceImmediate('Urgent!')).not.toThrow();
    });
  });

  describe('ariaHelpers', () => {
    it('should set expanded state on trigger and panel', () => {
      const trigger = document.createElement('button');
      const panel = document.createElement('div');
      document.body.appendChild(trigger);
      document.body.appendChild(panel);
      
      ariaHelpers.setExpanded(trigger, panel, true);
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      expect(panel.getAttribute('aria-hidden')).toBe('false');
      
      ariaHelpers.setExpanded(trigger, panel, false);
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(panel.getAttribute('aria-hidden')).toBe('true');
    });

    it('should set pressed state', () => {
      const button = document.createElement('button');
      document.body.appendChild(button);
      
      ariaHelpers.setPressed(button, true);
      expect(button.getAttribute('aria-pressed')).toBe('true');
      
      ariaHelpers.setPressed(button, false);
      expect(button.getAttribute('aria-pressed')).toBe('false');
    });

    it('should set loading state', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      
      ariaHelpers.setLoading(div, true, false);  // false = don't announce
      expect(div.getAttribute('aria-busy')).toBe('true');
      
      ariaHelpers.setLoading(div, false, false);
      expect(div.getAttribute('aria-busy')).toBe('false');
    });

    it('should set selected state', () => {
      const item = document.createElement('div');
      document.body.appendChild(item);
      
      ariaHelpers.setSelected(item, true);
      expect(item.getAttribute('aria-selected')).toBe('true');
    });

    it('should set error state on input', () => {
      const input = document.createElement('input');
      document.body.appendChild(input);
      
      ariaHelpers.setError(input, 'error-id', 'Field is required', false);
      expect(input.getAttribute('aria-invalid')).toBe('true');
      expect(input.getAttribute('aria-describedby')).toBe('error-id');
      
      // Clear error
      ariaHelpers.setError(input, 'error-id', null);
      expect(input.hasAttribute('aria-invalid')).toBe(false);
    });

    it('should announce progress', () => {
      const message = ariaHelpers.announceProgress(5, 10, 'Answered', true);
      expect(message).toContain('5 of 10');
      expect(message).toContain('50%');
    });

    it('should create live region', () => {
      const region = ariaHelpers.createLiveRegion('polite', true);
      expect(region.getAttribute('role')).toBe('status');
      expect(region.getAttribute('aria-live')).toBe('polite');
      expect(region.getAttribute('aria-atomic')).toBe('true');
    });
  });

  describe('keyboardNav', () => {
    it('should handle arrow key navigation', () => {
      const container = document.createElement('div');
      const items: HTMLElement[] = [];
      for (let i = 0; i < 3; i++) {
        const btn = document.createElement('button');
        btn.textContent = `Item ${i}`;
        container.appendChild(btn);
        items.push(btn);
      }
      document.body.appendChild(container);
      
      let currentIndex = 0;
      const setIndex = (idx: number) => { currentIndex = idx; };
      
      // Simulate ArrowDown
      const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
      keyboardNav.handleArrowNav(downEvent, items, currentIndex, setIndex);
      expect(currentIndex).toBe(1);
      
      // Simulate ArrowUp
      const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true });
      keyboardNav.handleArrowNav(upEvent, items, currentIndex, setIndex);
      expect(currentIndex).toBe(0);
    });

    it('should wrap around at boundaries', () => {
      const items = [
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button'),
      ];
      items.forEach(i => document.body.appendChild(i));
      
      let currentIndex = 2;  // Start at end
      const setIndex = (idx: number) => { currentIndex = idx; };
      
      // ArrowDown at end should wrap to start
      const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      keyboardNav.handleArrowNav(downEvent, items, currentIndex, setIndex);
      expect(currentIndex).toBe(0);
      
      // ArrowUp at start should wrap to end
      const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      keyboardNav.handleArrowNav(upEvent, items, currentIndex, setIndex);
      expect(currentIndex).toBe(2);
    });

    it('should handle Home and End keys', () => {
      const items = Array.from({ length: 5 }, () => {
        const btn = document.createElement('button');
        document.body.appendChild(btn);
        return btn;
      });
      
      let currentIndex = 2;
      const setIndex = (idx: number) => { currentIndex = idx; };
      
      const homeEvent = new KeyboardEvent('keydown', { key: 'Home' });
      keyboardNav.handleArrowNav(homeEvent, items, currentIndex, setIndex);
      expect(currentIndex).toBe(0);
      
      const endEvent = new KeyboardEvent('keydown', { key: 'End' });
      keyboardNav.handleArrowNav(endEvent, items, currentIndex, setIndex);
      expect(currentIndex).toBe(4);
    });

    it('should handle roving tabindex', () => {
      const items = Array.from({ length: 3 }, () => {
        const btn = document.createElement('button');
        document.body.appendChild(btn);
        return btn;
      });
      
      keyboardNav.handleRovingTabindex(items, 1);
      
      expect(items[0].getAttribute('tabindex')).toBe('-1');
      expect(items[1].getAttribute('tabindex')).toBe('0');
      expect(items[2].getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('mediaPreferences', () => {
    it('should check reduced motion preference', () => {
      // Default should be false in jsdom
      const result = mediaPreferences.prefersReducedMotion();
      expect(typeof result).toBe('boolean');
    });

    it('should check dark mode preference', () => {
      const result = mediaPreferences.prefersDarkMode();
      expect(typeof result).toBe('boolean');
    });

    it('should check high contrast preference', () => {
      const result = mediaPreferences.prefersHighContrast();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('focusVisible', () => {
    it('should track keyboard user state', () => {
      expect(typeof focusVisible.isKeyboardUser).toBe('boolean');
    });

    it('should initialize without throwing', () => {
      const cleanup = focusVisible.init();
      expect(typeof cleanup).toBe('function');
      cleanup();
    });
  });

  describe('motionUtils', () => {
    it('should return appropriate duration based on motion preference', () => {
      const fullDuration = 300;
      const reducedDuration = 0;
      const duration = motionUtils.getDuration(fullDuration, reducedDuration);
      
      // In jsdom, prefersReducedMotion is typically false
      expect(typeof duration).toBe('number');
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it('should generate CSS transition string', () => {
      const transition = motionUtils.getTransition('opacity', 300, 'ease-in');
      expect(typeof transition).toBe('string');
      // Either a valid transition or 'none' if reduced motion
      expect(transition === 'none' || transition.includes('opacity')).toBe(true);
    });
  });
});

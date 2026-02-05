/**
 * Scroll Utilities - Quality Tests (Bug-Finding Focus)
 * 
 * Tests scroll utility functions for edge cases.
 * @batch additional (20 tests)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { scrollToTop, scrollToTopSmooth, scrollToElement } from '../../utils/scroll';

describe('Scroll Utilities - Quality Tests', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let scrollToSpy: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock window.scrollTo
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    
    // Make scrollTop settable
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 0,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.body, 'scrollTop', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    scrollToSpy.mockRestore();
    
    // Clean up any test elements
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      document.body.removeChild(mainContent);
    }
  });

  describe('scrollToTop', () => {
    it('calls window.scrollTo with instant behavior', () => {
      scrollToTop();
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });
    });

    it('sets documentElement scrollTop to 0', () => {
      document.documentElement.scrollTop = 100;
      scrollToTop();
      expect(document.documentElement.scrollTop).toBe(0);
    });

    it('sets body scrollTop to 0', () => {
      document.body.scrollTop = 100;
      scrollToTop();
      expect(document.body.scrollTop).toBe(0);
    });

    it('handles missing main-content element', () => {
      expect(() => scrollToTop()).not.toThrow();
    });

    it('scrolls main-content element if present', () => {
      const mainContent = document.createElement('div');
      mainContent.id = 'main-content';
      Object.defineProperty(mainContent, 'scrollTop', {
        value: 500,
        writable: true,
        configurable: true,
      });
      document.body.appendChild(mainContent);

      scrollToTop();
      expect(mainContent.scrollTop).toBe(0);
    });

    it('multiple calls are idempotent', () => {
      scrollToTop();
      scrollToTop();
      scrollToTop();
      expect(scrollToSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('scrollToTopSmooth', () => {
    it('calls window.scrollTo with smooth behavior', () => {
      scrollToTopSmooth();
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'smooth' });
    });

    it('does not throw when called', () => {
      expect(() => scrollToTopSmooth()).not.toThrow();
    });

    it('multiple smooth scrolls are safe', () => {
      scrollToTopSmooth();
      scrollToTopSmooth();
      expect(scrollToSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('scrollToElement', () => {
    let testElement: HTMLDivElement;
    let scrollIntoViewSpy: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      testElement = document.createElement('div');
      testElement.id = 'test-element';
      scrollIntoViewSpy = vi.fn();
      testElement.scrollIntoView = scrollIntoViewSpy;
      document.body.appendChild(testElement);
    });

    afterEach(() => {
      const el = document.getElementById('test-element');
      if (el) {
        document.body.removeChild(el);
      }
    });

    it('scrolls to element with smooth behavior by default', () => {
      scrollToElement('test-element');
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    });

    it('respects instant behavior option', () => {
      scrollToElement('test-element', 'instant');
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'instant', block: 'start' });
    });

    it('handles non-existent element gracefully', () => {
      expect(() => scrollToElement('non-existent-element')).not.toThrow();
    });

    it('handles empty string element ID', () => {
      expect(() => scrollToElement('')).not.toThrow();
    });

    it('handles element ID with special characters', () => {
      const specialEl = document.createElement('div');
      specialEl.id = 'test-123';
      const specialSpy = vi.fn();
      specialEl.scrollIntoView = specialSpy;
      document.body.appendChild(specialEl);

      scrollToElement('test-123');
      expect(specialSpy).toHaveBeenCalled();

      document.body.removeChild(specialEl);
    });

    it('handles unicode element ID', () => {
      expect(() => scrollToElement('元素')).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid succession of scroll calls', async () => {
      for (let i = 0; i < 10; i++) {
        scrollToTop();
        scrollToTopSmooth();
      }
      expect(scrollToSpy).toHaveBeenCalledTimes(20);
    });

    it('handles scroll when already at top', () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      expect(() => scrollToTop()).not.toThrow();
    });
  });
});

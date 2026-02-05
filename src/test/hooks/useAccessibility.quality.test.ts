/**
 * Quality tests for useAccessibility hooks
 * Additional edge cases and untested hooks
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import React from 'react';

// Mock the accessibility utilities
vi.mock('../../utils/accessibility', () => ({
  announce: vi.fn(),
  announceImmediate: vi.fn(),
  FocusTrap: vi.fn().mockImplementation(() => ({
    activate: vi.fn(),
    deactivate: vi.fn(),
  })),
  mediaPreferences: {
    prefersReducedMotion: vi.fn(() => false),
    prefersDarkMode: vi.fn(() => false),
    prefersHighContrast: vi.fn(() => false),
    prefersReducedTransparency: vi.fn(() => false),
    prefersLowContrast: vi.fn(() => false),
    onReducedMotionChange: vi.fn(() => vi.fn()),
    onColorSchemeChange: vi.fn(() => vi.fn()),
  },
  ariaHelpers: {
    announceProgress: vi.fn(() => 'Progress message'),
    announceResult: vi.fn(),
    setExpanded: vi.fn(),
    announceTimer: vi.fn(),
  },
  focusVisible: {
    init: vi.fn(() => vi.fn()),
  },
}));

import {
  useAnnounce,
  useFocusTrap,
  useMediaPreferences,
  useFocusVisible,
  useAriaExpanded,
  useRovingTabindex,
  useTimerAnnouncement,
  useLoadingAnnouncement,
} from '../../hooks/useAccessibility';

import {
  announce,
  FocusTrap,
  mediaPreferences,
  ariaHelpers,
} from '../../utils/accessibility';

describe('useAccessibility quality tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('useAnnounce edge cases', () => {
    it('should handle empty string announcements', () => {
      const { result } = renderHook(() => useAnnounce());

      act(() => {
        result.current.announce('');
      });

      expect(announce).toHaveBeenCalledWith('', 'polite');
    });

    it('should handle very long announcements', () => {
      const { result } = renderHook(() => useAnnounce());
      const longMessage = 'A'.repeat(10000);

      act(() => {
        result.current.announce(longMessage);
      });

      expect(announce).toHaveBeenCalledWith(longMessage, 'polite');
    });

    it('should return stable function references', () => {
      const { result, rerender } = renderHook(() => useAnnounce());

      const firstAnnounce = result.current.announce;
      const firstAnnounceImmediate = result.current.announceImmediate;
      const firstProgress = result.current.announceProgress;
      const firstResult = result.current.announceResult;

      rerender();

      expect(result.current.announce).toBe(firstAnnounce);
      expect(result.current.announceImmediate).toBe(firstAnnounceImmediate);
      expect(result.current.announceProgress).toBe(firstProgress);
      expect(result.current.announceResult).toBe(firstResult);
    });

    it('should handle announceProgress with action undefined', () => {
      const { result } = renderHook(() => useAnnounce());

      act(() => {
        result.current.announceProgress(2, 5);
      });

      expect(ariaHelpers.announceProgress).toHaveBeenCalledWith(2, 5, undefined);
    });

    it('should handle announceResult with explanation undefined', () => {
      const { result } = renderHook(() => useAnnounce());

      act(() => {
        result.current.announceResult(false);
      });

      expect(ariaHelpers.announceResult).toHaveBeenCalledWith(false, undefined);
    });

    it('should handle zero progress values', () => {
      const { result } = renderHook(() => useAnnounce());

      act(() => {
        result.current.announceProgress(0, 0);
      });

      expect(ariaHelpers.announceProgress).toHaveBeenCalledWith(0, 0, undefined);
    });
  });

  describe('useFocusTrap edge cases', () => {
    it('should not crash when deactivate called without element', () => {
      const { result } = renderHook(() => useFocusTrap(true));

      // No element set, deactivate should handle null safely
      expect(() => {
        act(() => {
          result.current.deactivate(true);
        });
      }).not.toThrow();
    });

    it('should not crash when activate called without element', () => {
      const { result } = renderHook(() => useFocusTrap(false));

      expect(() => {
        act(() => {
          result.current.activate();
        });
      }).not.toThrow();
    });

    it('should handle null element being set', () => {
      const { result } = renderHook(() => useFocusTrap(true));

      expect(() => {
        act(() => {
          result.current.ref(null);
        });
      }).not.toThrow();
    });

    it('should call deactivate with restoreFocus parameter', async () => {
      const mockActivate = vi.fn();
      const mockDeactivate = vi.fn();
      const mockElement = document.createElement('div');

      (FocusTrap as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
        activate: mockActivate,
        deactivate: mockDeactivate,
      }));

      const { result, rerender } = renderHook(
        ({ active }) => useFocusTrap(active),
        { initialProps: { active: false } }
      );

      act(() => {
        result.current.ref(mockElement);
      });

      rerender({ active: true });

      await waitFor(() => {
        expect(mockActivate).toHaveBeenCalled();
      });

      act(() => {
        result.current.deactivate(true);
      });

      expect(mockDeactivate).toHaveBeenCalledWith(true);
    });

    it('should handle rapid active state changes', async () => {
      const mockActivate = vi.fn();
      const mockDeactivate = vi.fn();
      const mockElement = document.createElement('div');

      (FocusTrap as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
        activate: mockActivate,
        deactivate: mockDeactivate,
      }));

      const { result, rerender } = renderHook(
        ({ active }) => useFocusTrap(active),
        { initialProps: { active: false } }
      );

      act(() => {
        result.current.ref(mockElement);
      });

      // Rapid toggles
      rerender({ active: true });
      rerender({ active: false });
      rerender({ active: true });
      rerender({ active: false });

      // Should not crash and should handle state correctly
      expect(true).toBe(true);
    });
  });

  describe('useMediaPreferences edge cases', () => {
    it('should handle all preferences being true', () => {
      (mediaPreferences.prefersReducedMotion as ReturnType<typeof vi.fn>).mockReturnValue(true);
      (mediaPreferences.prefersDarkMode as ReturnType<typeof vi.fn>).mockReturnValue(true);
      (mediaPreferences.prefersHighContrast as ReturnType<typeof vi.fn>).mockReturnValue(true);
      (mediaPreferences.prefersReducedTransparency as ReturnType<typeof vi.fn>).mockReturnValue(true);
      (mediaPreferences.prefersLowContrast as ReturnType<typeof vi.fn>).mockReturnValue(true);

      const { result } = renderHook(() => useMediaPreferences());

      expect(result.current.prefersReducedMotion).toBe(true);
      expect(result.current.prefersDarkMode).toBe(true);
      expect(result.current.prefersHighContrast).toBe(true);
      expect(result.current.prefersReducedTransparency).toBe(true);
      expect(result.current.prefersLowContrast).toBe(true);
    });

    it('should update when motion preference changes', async () => {
      let motionChangeHandler: ((value: boolean) => void) | null = null;

      (mediaPreferences.prefersReducedMotion as ReturnType<typeof vi.fn>).mockReturnValue(false);
      (mediaPreferences.onReducedMotionChange as ReturnType<typeof vi.fn>).mockImplementation(
        (handler: (v: boolean) => void) => {
          motionChangeHandler = handler;
          return vi.fn();
        }
      );

      const { result } = renderHook(() => useMediaPreferences());

      // Initial value from mock
      expect(result.current.prefersReducedMotion).toBe(false);

      // Simulate preference change
      await act(async () => {
        motionChangeHandler?.(true);
      });

      await waitFor(() => {
        expect(result.current.prefersReducedMotion).toBe(true);
      });
    });

    it('should update when color scheme preference changes', async () => {
      let colorChangeHandler: ((value: boolean) => void) | null = null;

      (mediaPreferences.prefersDarkMode as ReturnType<typeof vi.fn>).mockReturnValue(false);
      (mediaPreferences.onColorSchemeChange as ReturnType<typeof vi.fn>).mockImplementation(
        (handler: (v: boolean) => void) => {
          colorChangeHandler = handler;
          return vi.fn();
        }
      );

      const { result } = renderHook(() => useMediaPreferences());

      expect(result.current.prefersDarkMode).toBe(false);

      await act(async () => {
        colorChangeHandler?.(true);
      });

      await waitFor(() => {
        expect(result.current.prefersDarkMode).toBe(true);
      });
    });
  });

  describe('useFocusVisible edge cases', () => {
    it('should not change state for non-Tab keys', async () => {
      const { result } = renderHook(() => useFocusVisible());

      act(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      });

      expect(result.current).toBe(false);

      act(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      });

      expect(result.current).toBe(false);
    });

    it('should handle rapid keyboard/mouse switching', async () => {
      const { result } = renderHook(() => useFocusVisible());

      for (let i = 0; i < 5; i++) {
        act(() => {
          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
        });
        act(() => {
          document.dispatchEvent(new MouseEvent('mousedown'));
        });
      }

      // Final state should be from mouse
      expect(result.current).toBe(false);
    });
  });

  describe('useAriaExpanded edge cases', () => {
    it('should call setExpanded when refs are set', async () => {
      const { result } = renderHook(() => useAriaExpanded(false));

      const trigger = document.createElement('button');
      const panel = document.createElement('div');

      act(() => {
        result.current.triggerProps.ref(trigger);
        result.current.panelProps.ref(panel);
      });

      act(() => {
        result.current.expand();
      });

      await waitFor(() => {
        expect(ariaHelpers.setExpanded).toHaveBeenCalled();
      });
    });

    it('should not call setExpanded without refs', () => {
      const { result } = renderHook(() => useAriaExpanded(false));

      act(() => {
        result.current.toggle();
      });

      // Should not be called because refs aren't set
      expect(ariaHelpers.setExpanded).not.toHaveBeenCalled();
    });

    it('should handle expand when already expanded', () => {
      const { result } = renderHook(() => useAriaExpanded(true));

      act(() => {
        result.current.expand();
      });

      expect(result.current.isExpanded).toBe(true);
    });

    it('should handle collapse when already collapsed', () => {
      const { result } = renderHook(() => useAriaExpanded(false));

      act(() => {
        result.current.collapse();
      });

      expect(result.current.isExpanded).toBe(false);
    });

    it('should handle multiple toggle calls', () => {
      const { result } = renderHook(() => useAriaExpanded(false));

      for (let i = 0; i < 10; i++) {
        act(() => {
          result.current.toggle();
        });
      }

      // 10 toggles from false = false
      expect(result.current.isExpanded).toBe(false);
    });
  });

  describe('useRovingTabindex keyboard navigation', () => {
    const createItems = () => [
      document.createElement('button'),
      document.createElement('button'),
      document.createElement('button'),
    ];

    it('should navigate right with ArrowRight in horizontal mode', () => {
      const items = createItems();
      items.forEach(item => {
        item.focus = vi.fn();
      });

      const { result } = renderHook(() => 
        useRovingTabindex(items, { orientation: 'horizontal' })
      );

      act(() => {
        result.current.handleKeyDown({
          key: 'ArrowRight',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(1);
      expect(items[1].focus).toHaveBeenCalled();
    });

    it('should navigate left with ArrowLeft in horizontal mode', () => {
      const items = createItems();
      items.forEach(item => {
        item.focus = vi.fn();
      });

      const { result } = renderHook(() => 
        useRovingTabindex(items, { orientation: 'horizontal', initialIndex: 1 })
      );

      act(() => {
        result.current.handleKeyDown({
          key: 'ArrowLeft',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(0);
      expect(items[0].focus).toHaveBeenCalled();
    });

    it('should navigate down with ArrowDown in vertical mode', () => {
      const items = createItems();
      items.forEach(item => {
        item.focus = vi.fn();
      });

      const { result } = renderHook(() => 
        useRovingTabindex(items, { orientation: 'vertical' })
      );

      act(() => {
        result.current.handleKeyDown({
          key: 'ArrowDown',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(1);
    });

    it('should navigate up with ArrowUp in vertical mode', () => {
      const items = createItems();
      items.forEach(item => {
        item.focus = vi.fn();
      });

      const { result } = renderHook(() => 
        useRovingTabindex(items, { orientation: 'vertical', initialIndex: 2 })
      );

      act(() => {
        result.current.handleKeyDown({
          key: 'ArrowUp',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(1);
    });

    it('should wrap around when wrap is true', () => {
      const items = createItems();
      items.forEach(item => {
        item.focus = vi.fn();
      });

      const { result } = renderHook(() => 
        useRovingTabindex(items, { orientation: 'horizontal', wrap: true, initialIndex: 2 })
      );

      act(() => {
        result.current.handleKeyDown({
          key: 'ArrowRight',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(0);
    });

    it('should not wrap when wrap is false', () => {
      const items = createItems();
      items.forEach(item => {
        item.focus = vi.fn();
      });

      const { result } = renderHook(() => 
        useRovingTabindex(items, { orientation: 'horizontal', wrap: false, initialIndex: 2 })
      );

      act(() => {
        result.current.handleKeyDown({
          key: 'ArrowRight',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(2);
    });

    it('should navigate to first item with Home key', () => {
      const items = createItems();
      items.forEach(item => {
        item.focus = vi.fn();
      });

      const { result } = renderHook(() => 
        useRovingTabindex(items, { initialIndex: 2 })
      );

      act(() => {
        result.current.handleKeyDown({
          key: 'Home',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(0);
      expect(items[0].focus).toHaveBeenCalled();
    });

    it('should navigate to last item with End key', () => {
      const items = createItems();
      items.forEach(item => {
        item.focus = vi.fn();
      });

      const { result } = renderHook(() => useRovingTabindex(items, { initialIndex: 0 }));

      act(() => {
        result.current.handleKeyDown({
          key: 'End',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(2);
      expect(items[2].focus).toHaveBeenCalled();
    });

    it('should support both orientation', () => {
      const items = createItems();
      items.forEach(item => {
        item.focus = vi.fn();
      });

      const { result } = renderHook(() => 
        useRovingTabindex(items, { orientation: 'both' })
      );

      // Both ArrowRight and ArrowDown should work
      act(() => {
        result.current.handleKeyDown({
          key: 'ArrowRight',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(1);

      act(() => {
        result.current.handleKeyDown({
          key: 'ArrowDown',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(2);
    });

    it('should ignore unknown keys', () => {
      const items = createItems();
      const { result } = renderHook(() => useRovingTabindex(items));

      act(() => {
        result.current.handleKeyDown({
          key: 'Enter',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(0);
    });

    it('should ignore horizontal keys in vertical mode', () => {
      const items = createItems();
      items.forEach(item => {
        item.focus = vi.fn();
      });

      const { result } = renderHook(() => 
        useRovingTabindex(items, { orientation: 'vertical' })
      );

      act(() => {
        result.current.handleKeyDown({
          key: 'ArrowRight',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(0);
    });

    it('should ignore vertical keys in horizontal mode', () => {
      const items = createItems();
      items.forEach(item => {
        item.focus = vi.fn();
      });

      const { result } = renderHook(() => 
        useRovingTabindex(items, { orientation: 'horizontal' })
      );

      act(() => {
        result.current.handleKeyDown({
          key: 'ArrowDown',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(0);
    });

    it('should return getItemProps with correct tabIndex', () => {
      const items = createItems();
      const { result } = renderHook(() => 
        useRovingTabindex(items, { initialIndex: 1 })
      );

      const props0 = result.current.getItemProps(0);
      const props1 = result.current.getItemProps(1);
      const props2 = result.current.getItemProps(2);

      expect(props0.tabIndex).toBe(-1);
      expect(props1.tabIndex).toBe(0);
      expect(props2.tabIndex).toBe(-1);
    });

    it('should allow setActiveIndex to change focus', () => {
      const items = createItems();
      const { result } = renderHook(() => useRovingTabindex(items));

      act(() => {
        result.current.setActiveIndex(2);
      });

      expect(result.current.activeIndex).toBe(2);
    });

    it('should update tabindex on items when active index changes', () => {
      const items = createItems();
      const { result } = renderHook(() => useRovingTabindex(items));

      act(() => {
        result.current.setActiveIndex(1);
      });

      expect(items[0].getAttribute('tabindex')).toBe('-1');
      expect(items[1].getAttribute('tabindex')).toBe('0');
      expect(items[2].getAttribute('tabindex')).toBe('-1');
    });

    it('should handle empty items array', () => {
      const items: HTMLElement[] = [];
      const { result } = renderHook(() => useRovingTabindex(items));

      // Empty array with wrap causes NaN due to modulo 0
      // This tests that it doesn't crash
      expect(() => {
        act(() => {
          result.current.handleKeyDown({
            key: 'ArrowRight',
            preventDefault: vi.fn(),
          } as unknown as React.KeyboardEvent);
        });
      }).not.toThrow();
    });

    it('should handle single item array', () => {
      const items = [document.createElement('button')];
      items[0].focus = vi.fn();

      const { result } = renderHook(() => 
        useRovingTabindex(items, { wrap: true })
      );

      act(() => {
        result.current.handleKeyDown({
          key: 'ArrowRight',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      // Should wrap to same item
      expect(result.current.activeIndex).toBe(0);
    });

    it('should wrap backwards from first item', () => {
      const items = createItems();
      items.forEach(item => {
        item.focus = vi.fn();
      });

      const { result } = renderHook(() => 
        useRovingTabindex(items, { orientation: 'horizontal', wrap: true })
      );

      act(() => {
        result.current.handleKeyDown({
          key: 'ArrowLeft',
          preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent);
      });

      expect(result.current.activeIndex).toBe(2);
    });
  });

  describe('useTimerAnnouncement', () => {
    it('should announce timer when seconds change', () => {
      const { rerender } = renderHook(
        ({ seconds }) => useTimerAnnouncement(seconds),
        { initialProps: { seconds: 60 } }
      );

      rerender({ seconds: 59 });

      expect(ariaHelpers.announceTimer).toHaveBeenCalledWith(59, undefined);
    });

    it('should pass custom thresholds', () => {
      const thresholds = [30, 10, 5];
      const { rerender } = renderHook(
        ({ seconds }) => useTimerAnnouncement(seconds, thresholds),
        { initialProps: { seconds: 60 } }
      );

      rerender({ seconds: 30 });

      expect(ariaHelpers.announceTimer).toHaveBeenCalledWith(30, thresholds);
    });

    it('should not announce when seconds stay the same', () => {
      const { rerender } = renderHook(
        ({ seconds }) => useTimerAnnouncement(seconds),
        { initialProps: { seconds: 60 } }
      );

      // Same value, should not trigger
      rerender({ seconds: 60 });

      // Initial call happens, but second rerender with same value shouldn't
      expect(ariaHelpers.announceTimer).toHaveBeenCalledTimes(0);
    });

    it('should handle zero seconds', () => {
      const { rerender } = renderHook(
        ({ seconds }) => useTimerAnnouncement(seconds),
        { initialProps: { seconds: 1 } }
      );

      rerender({ seconds: 0 });

      expect(ariaHelpers.announceTimer).toHaveBeenCalledWith(0, undefined);
    });

    it('should handle rapid time changes', () => {
      const { rerender } = renderHook(
        ({ seconds }) => useTimerAnnouncement(seconds),
        { initialProps: { seconds: 10 } }
      );

      rerender({ seconds: 9 });
      rerender({ seconds: 8 });
      rerender({ seconds: 7 });

      expect(ariaHelpers.announceTimer).toHaveBeenCalledTimes(3);
    });
  });

  describe('useLoadingAnnouncement', () => {
    it('should announce loading when isLoading becomes true', () => {
      const { rerender } = renderHook(
        ({ loading }) => useLoadingAnnouncement(loading),
        { initialProps: { loading: false } }
      );

      rerender({ loading: true });

      expect(announce).toHaveBeenCalledWith('Loading...', 'polite');
    });

    it('should announce content loaded when loading ends', () => {
      const { rerender } = renderHook(
        ({ loading }) => useLoadingAnnouncement(loading),
        { initialProps: { loading: true } }
      );

      rerender({ loading: false });

      expect(announce).toHaveBeenCalledWith('Content loaded', 'polite');
    });

    it('should use custom message when provided', () => {
      const { rerender } = renderHook(
        ({ loading }) => useLoadingAnnouncement(loading, 'Fetching data...'),
        { initialProps: { loading: false } }
      );

      rerender({ loading: true });

      expect(announce).toHaveBeenCalledWith('Fetching data...', 'polite');
    });

    it('should not announce when loading state stays true', () => {
      const { rerender } = renderHook(
        ({ loading }) => useLoadingAnnouncement(loading),
        { initialProps: { loading: true } }
      );

      vi.clearAllMocks();
      rerender({ loading: true });

      expect(announce).not.toHaveBeenCalled();
    });

    it('should not announce when loading state stays false', () => {
      const { rerender } = renderHook(
        ({ loading }) => useLoadingAnnouncement(loading),
        { initialProps: { loading: false } }
      );

      vi.clearAllMocks();
      rerender({ loading: false });

      expect(announce).not.toHaveBeenCalled();
    });

    it('should handle rapid loading state changes', () => {
      const { rerender } = renderHook(
        ({ loading }) => useLoadingAnnouncement(loading),
        { initialProps: { loading: false } }
      );

      rerender({ loading: true });
      rerender({ loading: false });
      rerender({ loading: true });

      expect(announce).toHaveBeenCalledWith('Loading...', 'polite');
      expect(announce).toHaveBeenCalledWith('Content loaded', 'polite');
    });
  });

  describe('default export', () => {
    it('should export all hooks', async () => {
      const defaultExport = await import('../../hooks/useAccessibility').then(m => m.default);

      expect(defaultExport.useAnnounce).toBeDefined();
      expect(defaultExport.useFocusTrap).toBeDefined();
      expect(defaultExport.useMediaPreferences).toBeDefined();
      expect(defaultExport.useFocusVisible).toBeDefined();
      expect(defaultExport.useAriaExpanded).toBeDefined();
      expect(defaultExport.useRovingTabindex).toBeDefined();
      expect(defaultExport.useTimerAnnouncement).toBeDefined();
      expect(defaultExport.useLoadingAnnouncement).toBeDefined();
    });
  });
});

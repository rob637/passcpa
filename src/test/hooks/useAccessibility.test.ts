import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

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
    announceProgress: vi.fn(() => 'Progress 5 of 10'),
    announceResult: vi.fn(),
    setExpanded: vi.fn(),
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
} from '../../hooks/useAccessibility';

import {
  announce,
  announceImmediate,
  FocusTrap,
  mediaPreferences,
  ariaHelpers,
  focusVisible,
} from '../../utils/accessibility';

describe('useAccessibility hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('useAnnounce', () => {
    it('should return announce functions', () => {
      const { result } = renderHook(() => useAnnounce());

      expect(result.current.announce).toBeDefined();
      expect(result.current.announceImmediate).toBeDefined();
      expect(result.current.announceProgress).toBeDefined();
      expect(result.current.announceResult).toBeDefined();
    });

    it('should call announce with message and priority', () => {
      const { result } = renderHook(() => useAnnounce());

      act(() => {
        result.current.announce('Test message', 'assertive');
      });

      expect(announce).toHaveBeenCalledWith('Test message', 'assertive');
    });

    it('should call announce with default polite priority', () => {
      const { result } = renderHook(() => useAnnounce());

      act(() => {
        result.current.announce('Test message');
      });

      expect(announce).toHaveBeenCalledWith('Test message', 'polite');
    });

    it('should call announceImmediate', () => {
      const { result } = renderHook(() => useAnnounce());

      act(() => {
        result.current.announceImmediate('Immediate message');
      });

      expect(announceImmediate).toHaveBeenCalledWith('Immediate message');
    });

    it('should call announceProgress with current and total', () => {
      const { result } = renderHook(() => useAnnounce());

      act(() => {
        result.current.announceProgress(5, 10, 'answering');
      });

      expect(ariaHelpers.announceProgress).toHaveBeenCalledWith(5, 10, 'answering');
    });

    it('should call announceResult with correct/incorrect', () => {
      const { result } = renderHook(() => useAnnounce());

      act(() => {
        result.current.announceResult(true, 'Great job!');
      });

      expect(ariaHelpers.announceResult).toHaveBeenCalledWith(true, 'Great job!');
    });
  });

  describe('useFocusTrap', () => {
    it('should return ref and control functions', () => {
      const { result } = renderHook(() => useFocusTrap());

      expect(result.current.ref).toBeDefined();
      expect(result.current.activate).toBeDefined();
      expect(result.current.deactivate).toBeDefined();
    });

    it('should not activate trap when inactive', () => {
      const mockElement = document.createElement('div');
      
      const { result } = renderHook(() => useFocusTrap(false));

      act(() => {
        result.current.ref(mockElement);
      });

      expect(FocusTrap).not.toHaveBeenCalled();
    });

    it('should activate trap when active prop is true', async () => {
      const mockElement = document.createElement('div');
      const mockActivate = vi.fn();
      const mockDeactivate = vi.fn();

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
        expect(FocusTrap).toHaveBeenCalledWith(mockElement);
      });
    });
  });

  describe('useMediaPreferences', () => {
    it('should return media preferences', () => {
      const { result } = renderHook(() => useMediaPreferences());

      expect(result.current.prefersReducedMotion).toBeDefined();
      expect(result.current.prefersDarkMode).toBeDefined();
      expect(result.current.prefersHighContrast).toBeDefined();
      expect(result.current.prefersReducedTransparency).toBeDefined();
      expect(result.current.prefersLowContrast).toBeDefined();
    });

    it('should return current media preference values', () => {
      (mediaPreferences.prefersReducedMotion as ReturnType<typeof vi.fn>).mockReturnValue(true);
      (mediaPreferences.prefersDarkMode as ReturnType<typeof vi.fn>).mockReturnValue(true);

      const { result } = renderHook(() => useMediaPreferences());

      expect(result.current.prefersReducedMotion).toBe(true);
      expect(result.current.prefersDarkMode).toBe(true);
    });

    it('should set up change listeners on mount', () => {
      renderHook(() => useMediaPreferences());

      expect(mediaPreferences.onReducedMotionChange).toHaveBeenCalled();
      expect(mediaPreferences.onColorSchemeChange).toHaveBeenCalled();
    });

    it('should clean up listeners on unmount', () => {
      const mockUnsubMotion = vi.fn();
      const mockUnsubColor = vi.fn();

      (mediaPreferences.onReducedMotionChange as ReturnType<typeof vi.fn>).mockReturnValue(mockUnsubMotion);
      (mediaPreferences.onColorSchemeChange as ReturnType<typeof vi.fn>).mockReturnValue(mockUnsubColor);

      const { unmount } = renderHook(() => useMediaPreferences());
      unmount();

      expect(mockUnsubMotion).toHaveBeenCalled();
      expect(mockUnsubColor).toHaveBeenCalled();
    });
  });

  describe('useFocusVisible', () => {
    it('should initialize focus visible and return false by default', () => {
      const { result } = renderHook(() => useFocusVisible());

      expect(focusVisible.init).toHaveBeenCalled();
      expect(result.current).toBe(false);
    });

    it('should set keyboard user to true on Tab key press', async () => {
      const { result } = renderHook(() => useFocusVisible());

      act(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
      });

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });

    it('should set keyboard user to false on mouse down', async () => {
      const { result } = renderHook(() => useFocusVisible());

      // First set to keyboard user
      act(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
      });

      await waitFor(() => {
        expect(result.current).toBe(true);
      });

      // Then switch to mouse
      act(() => {
        document.dispatchEvent(new MouseEvent('mousedown'));
      });

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });

    it('should clean up listeners on unmount', () => {
      const mockCleanup = vi.fn();
      (focusVisible.init as ReturnType<typeof vi.fn>).mockReturnValue(mockCleanup);

      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

      const { unmount } = renderHook(() => useFocusVisible());
      unmount();

      expect(mockCleanup).toHaveBeenCalled();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });
  });

  describe('useAriaExpanded', () => {
    it('should initialize with false by default', () => {
      const { result } = renderHook(() => useAriaExpanded());

      expect(result.current.isExpanded).toBe(false);
    });

    it('should initialize with provided initial state', () => {
      const { result } = renderHook(() => useAriaExpanded(true));

      expect(result.current.isExpanded).toBe(true);
    });

    it('should toggle expanded state', () => {
      const { result } = renderHook(() => useAriaExpanded());

      expect(result.current.isExpanded).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isExpanded).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isExpanded).toBe(false);
    });

    it('should expand to true', () => {
      const { result } = renderHook(() => useAriaExpanded(false));

      act(() => {
        result.current.expand();
      });

      expect(result.current.isExpanded).toBe(true);
    });

    it('should collapse to false', () => {
      const { result } = renderHook(() => useAriaExpanded(true));

      act(() => {
        result.current.collapse();
      });

      expect(result.current.isExpanded).toBe(false);
    });

    it('should return trigger props with aria-expanded', () => {
      const { result } = renderHook(() => useAriaExpanded(false));

      expect(result.current.triggerProps['aria-expanded']).toBe(false);

      act(() => {
        result.current.expand();
      });

      expect(result.current.triggerProps['aria-expanded']).toBe(true);
    });

    it('should return panel props with aria-hidden', () => {
      const { result } = renderHook(() => useAriaExpanded(true));

      // When expanded, aria-hidden should be false
      expect(result.current.panelProps['aria-hidden']).toBe(false);

      act(() => {
        result.current.collapse();
      });

      // When collapsed, aria-hidden should be true
      expect(result.current.panelProps['aria-hidden']).toBe(true);
    });

    it('should have onClick handler in trigger props', () => {
      const { result } = renderHook(() => useAriaExpanded());

      expect(result.current.triggerProps.onClick).toBeDefined();
      expect(typeof result.current.triggerProps.onClick).toBe('function');
    });
  });

  describe('useRovingTabindex', () => {
    it('should return handlers and active index', () => {
      const items = [
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button'),
      ];

      const { result } = renderHook(() => useRovingTabindex(items));

      expect(result.current.activeIndex).toBeDefined();
      expect(result.current.handleKeyDown).toBeDefined();
      expect(result.current.getItemProps).toBeDefined();
    });

    it('should initialize with first item as active', () => {
      const items = [
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button'),
      ];

      const { result } = renderHook(() => useRovingTabindex(items));

      expect(result.current.activeIndex).toBe(0);
    });

    it('should initialize with custom initial index', () => {
      const items = [
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button'),
      ];

      const { result } = renderHook(() => useRovingTabindex(items, { initialIndex: 1 }));

      expect(result.current.activeIndex).toBe(1);
    });

    it('should set tabindex on items correctly', () => {
      const items = [
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button'),
      ];

      renderHook(() => useRovingTabindex(items, { initialIndex: 1 }));

      expect(items[0].getAttribute('tabindex')).toBe('-1');
      expect(items[1].getAttribute('tabindex')).toBe('0');
      expect(items[2].getAttribute('tabindex')).toBe('-1');
    });
  });
});

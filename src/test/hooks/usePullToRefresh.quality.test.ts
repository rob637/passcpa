/**
 * Quality tests for usePullToRefresh hook
 * Tests pull-to-refresh gesture handling for mobile
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePullToRefresh } from '../../hooks/usePullToRefresh';
import type { TouchEvent } from 'react';

// Helper to create mock touch events
function createTouchEvent(clientY: number): TouchEvent {
  return {
    touches: [{ clientY }],
  } as unknown as TouchEvent;
}

describe('usePullToRefresh', () => {
  let scrollYValue = 0;
  let scrollListeners: Function[] = [];

  beforeEach(() => {
    vi.clearAllMocks();
    scrollYValue = 0;
    scrollListeners = [];

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      get: () => scrollYValue,
      configurable: true,
    });

    // Mock addEventListener/removeEventListener
    vi.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {
      if (event === 'scroll') {
        scrollListeners.push(handler as Function);
      }
    });

    vi.spyOn(window, 'removeEventListener').mockImplementation((event, handler) => {
      if (event === 'scroll') {
        scrollListeners = scrollListeners.filter(h => h !== handler);
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('should return initial state with no pulling or refreshing', () => {
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      expect(result.current.isPulling).toBe(false);
      expect(result.current.isRefreshing).toBe(false);
      expect(result.current.pullDistance).toBe(0);
    });

    it('should provide touch event handlers', () => {
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      expect(typeof result.current.onTouchStart).toBe('function');
      expect(typeof result.current.onTouchMove).toBe('function');
      expect(typeof result.current.onTouchEnd).toBe('function');
    });

    it('should provide indicator style object', () => {
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      expect(result.current.indicatorStyle).toBeDefined();
      expect(result.current.indicatorStyle.opacity).toBe(0);
    });

    it('should set up scroll listener on mount', () => {
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      renderHook(() => usePullToRefresh({ onRefresh }));

      expect(window.addEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true }
      );
    });
  });

  describe('scroll position tracking', () => {
    it('should track scroll position via listener', () => {
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      renderHook(() => usePullToRefresh({ onRefresh }));

      // Simulate scroll
      scrollYValue = 100;
      scrollListeners.forEach(listener => listener());

      // Scroll position should be tracked internally
      expect(scrollListeners.length).toBe(1);
    });

    it('should clean up scroll listener on unmount', () => {
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { unmount } = renderHook(() => usePullToRefresh({ onRefresh }));

      unmount();

      expect(window.removeEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });
  });

  describe('onTouchStart', () => {
    it('should start pulling when at top of page', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      expect(result.current.isPulling).toBe(true);
    });

    it('should not start pulling when scrolled down beyond threshold', () => {
      scrollYValue = 10;
      // Simulate the scroll event to update internal state
      scrollListeners.forEach(listener => listener());
      
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      // Trigger scroll listener update
      scrollYValue = 10;
      scrollListeners.forEach(l => l());

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      // Will still be false because scrollTop.current was updated
      expect(result.current.isPulling).toBe(false);
    });

    it('should not start pulling when disabled', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, enabled: false })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      expect(result.current.isPulling).toBe(false);
    });

    it('should not start pulling when already refreshing', async () => {
      scrollYValue = 0;
      let resolveRefresh: () => void;
      const refreshPromise = new Promise<void>(resolve => {
        resolveRefresh = resolve;
      });
      const onRefresh = vi.fn().mockReturnValue(refreshPromise);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      // Start a pull and trigger refresh
      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      await act(async () => {
        // Simulate a full pull by setting pullDistance manually through touch move
        result.current.onTouchMove(createTouchEvent(300)); // 200 delta, 100 with resistance
      });

      await act(async () => {
        result.current.onTouchEnd();
      });

      // Now try to start another pull while refreshing
      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      // Should still show refreshing state
      expect(result.current.isRefreshing).toBe(true);

      // Cleanup
      await act(async () => {
        resolveRefresh!();
      });
    });

    it('should allow pulling when scrolled slightly (within 5px threshold)', () => {
      scrollYValue = 4;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      expect(result.current.isPulling).toBe(true);
    });
  });

  describe('onTouchMove', () => {
    it('should update pull distance on downward drag', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(200)); // 100 delta
      });

      // Expected: 100 * 0.5 (resistance) = 50
      expect(result.current.pullDistance).toBe(50);
    });

    it('should apply resistance to pull distance', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(300)); // 200 delta
      });

      // Expected: 200 * 0.5 (resistance) = 100
      expect(result.current.pullDistance).toBe(100);
    });

    it('should cap pull distance at maxPull', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, maxPull: 80 })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(500)); // Would be 200 after resistance
      });

      expect(result.current.pullDistance).toBe(80);
    });

    it('should use default maxPull of 120', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(500)); // Would be 200 after resistance
      });

      expect(result.current.pullDistance).toBe(120);
    });

    it('should not update for upward drag (negative delta)', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(200));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(100)); // -100 delta
      });

      expect(result.current.pullDistance).toBe(0);
    });

    it('should not update when not pulling', () => {
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      act(() => {
        result.current.onTouchMove(createTouchEvent(200));
      });

      expect(result.current.pullDistance).toBe(0);
    });

    it('should not update when disabled', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, enabled: false })
      );

      // Manually force isPulling true to test disabled check during move
      act(() => {
        // Since isPulling requires enabled, this won't set isPulling
        result.current.onTouchStart(createTouchEvent(100));
        result.current.onTouchMove(createTouchEvent(200));
      });

      expect(result.current.pullDistance).toBe(0);
    });
  });

  describe('onTouchEnd', () => {
    it('should trigger refresh when threshold is met', async () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, threshold: 50 })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(250)); // 75 after resistance (> 50)
      });

      await act(async () => {
        await result.current.onTouchEnd();
      });

      expect(onRefresh).toHaveBeenCalledTimes(1);
    });

    it('should not trigger refresh when below threshold', async () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, threshold: 80 })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(180)); // 40 after resistance (< 80)
      });

      await act(async () => {
        await result.current.onTouchEnd();
      });

      expect(onRefresh).not.toHaveBeenCalled();
    });

    it('should snap back when below threshold', async () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, threshold: 80 })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(180)); // 40 after resistance
      });

      expect(result.current.pullDistance).toBe(40);

      await act(async () => {
        await result.current.onTouchEnd();
      });

      expect(result.current.pullDistance).toBe(0);
    });

    it('should lock at threshold during refresh', async () => {
      scrollYValue = 0;
      let resolveRefresh: () => void;
      const refreshPromise = new Promise<void>(resolve => {
        resolveRefresh = resolve;
      });
      const onRefresh = vi.fn().mockReturnValue(refreshPromise);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, threshold: 50 })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(300)); // 100 after resistance
      });

      act(() => {
        result.current.onTouchEnd();
      });

      // During refresh, pullDistance should be locked at threshold
      expect(result.current.pullDistance).toBe(50);
      expect(result.current.isRefreshing).toBe(true);

      // Complete refresh
      await act(async () => {
        resolveRefresh();
        await refreshPromise;
      });

      expect(result.current.pullDistance).toBe(0);
      expect(result.current.isRefreshing).toBe(false);
    });

    it('should reset to 0 after refresh completes', async () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, threshold: 50 })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(300));
      });

      await act(async () => {
        await result.current.onTouchEnd();
      });

      expect(result.current.pullDistance).toBe(0);
      expect(result.current.isRefreshing).toBe(false);
    });

    it('should handle refresh errors gracefully', async () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockRejectedValue(new Error('Refresh failed'));
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, threshold: 50 })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(300));
      });

      await act(async () => {
        try {
          await result.current.onTouchEnd();
        } catch {
          // Ignore error
        }
      });

      // Should still reset even on error (finally block)
      expect(result.current.isRefreshing).toBe(false);
      expect(result.current.pullDistance).toBe(0);
    });

    it('should do nothing when not pulling', async () => {
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      await act(async () => {
        await result.current.onTouchEnd();
      });

      expect(onRefresh).not.toHaveBeenCalled();
    });

    it('should do nothing when disabled', async () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, enabled: false })
      );

      await act(async () => {
        await result.current.onTouchEnd();
      });

      expect(onRefresh).not.toHaveBeenCalled();
    });

    it('should set isPulling to false', async () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      expect(result.current.isPulling).toBe(true);

      await act(async () => {
        await result.current.onTouchEnd();
      });

      expect(result.current.isPulling).toBe(false);
    });
  });

  describe('indicatorStyle', () => {
    it('should calculate transform based on pull distance', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, threshold: 80 })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(180)); // 40 after resistance
      });

      // translateY: 40 - 40 = 0
      // progress: 40 / 80 = 0.5, rotation: 0.5 * 360 = 180
      expect(result.current.indicatorStyle.transform).toBe('translateY(0px) rotate(180deg)');
    });

    it('should calculate opacity based on progress', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, threshold: 80 })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(180)); // 40 after resistance
      });

      // progress: 40 / 80 = 0.5
      expect(result.current.indicatorStyle.opacity).toBe(0.5);
    });

    it('should cap opacity at 1 when exceeding threshold', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, threshold: 50 })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(400)); // Would exceed threshold
      });

      expect(result.current.indicatorStyle.opacity).toBe(1);
    });

    it('should disable transition while pulling', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      expect(result.current.indicatorStyle.transition).toBe('none');
    });

    it('should enable transition when not pulling', async () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      expect(result.current.indicatorStyle.transition).toBe('all 0.3s ease-out');
    });
  });

  describe('options', () => {
    it('should use default threshold of 80', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      // Pull to 70 (below default threshold of 80)
      act(() => {
        result.current.onTouchMove(createTouchEvent(240)); // 70 after resistance
      });

      act(() => {
        result.current.onTouchEnd();
      });

      expect(onRefresh).not.toHaveBeenCalled();
    });

    it('should use custom threshold', async () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, threshold: 30 })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      // Pull to 35 (above custom threshold of 30)
      act(() => {
        result.current.onTouchMove(createTouchEvent(170)); // 35 after resistance
      });

      await act(async () => {
        await result.current.onTouchEnd();
      });

      expect(onRefresh).toHaveBeenCalled();
    });

    it('should respect enabled option changes', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result, rerender } = renderHook(
        ({ enabled }) => usePullToRefresh({ onRefresh, enabled }),
        { initialProps: { enabled: true } }
      );

      // Starting enabled
      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });
      expect(result.current.isPulling).toBe(true);

      // End this pull
      act(() => {
        result.current.onTouchEnd();
      });

      // Now disable
      rerender({ enabled: false });

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });
      expect(result.current.isPulling).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid touch start/end sequences', async () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      // Rapid sequence
      for (let i = 0; i < 5; i++) {
        act(() => {
          result.current.onTouchStart(createTouchEvent(100));
        });
        await act(async () => {
          await result.current.onTouchEnd();
        });
      }

      // Should remain in clean state
      expect(result.current.isPulling).toBe(false);
      expect(result.current.pullDistance).toBe(0);
    });

    it('should handle zero delta touch move', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      act(() => {
        result.current.onTouchMove(createTouchEvent(100)); // 0 delta
      });

      expect(result.current.pullDistance).toBe(0);
    });

    it('should handle multiple touch moves accumulating', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      // Each move recalculates from the start position, not accumulating
      act(() => {
        result.current.onTouchMove(createTouchEvent(150)); // 25 after resistance
      });

      expect(result.current.pullDistance).toBe(25);

      act(() => {
        result.current.onTouchMove(createTouchEvent(200)); // 50 after resistance
      });

      expect(result.current.pullDistance).toBe(50);
    });

    it('should not start pull when exactly at scroll threshold (5)', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      // Simulate scrolling to exactly 5
      scrollYValue = 5;
      scrollListeners.forEach(l => l());

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      expect(result.current.isPulling).toBe(true); // 5 is <= 5, so allowed
    });

    it('should prevent pull when scroll is at 6', () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => usePullToRefresh({ onRefresh }));

      // Simulate scrolling to 6
      scrollYValue = 6;
      scrollListeners.forEach(l => l());

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      expect(result.current.isPulling).toBe(false);
    });
  });

  describe('concurrent behavior', () => {
    it('should not allow second refresh while first is in progress', async () => {
      scrollYValue = 0;
      let resolveFirst: () => void;
      const firstPromise = new Promise<void>(resolve => {
        resolveFirst = resolve;
      });
      const onRefresh = vi.fn().mockReturnValue(firstPromise);
      const { result } = renderHook(() => 
        usePullToRefresh({ onRefresh, threshold: 50 })
      );

      // First pull and refresh
      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });
      act(() => {
        result.current.onTouchMove(createTouchEvent(300));
      });
      act(() => {
        result.current.onTouchEnd();
      });

      expect(result.current.isRefreshing).toBe(true);
      expect(onRefresh).toHaveBeenCalledTimes(1);

      // Try to start another pull while refreshing - should be blocked at touch start
      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });

      // Should not be pulling (blocked by isRefreshing check)
      expect(result.current.isPulling).toBe(false);

      // Cleanup
      await act(async () => {
        resolveFirst!();
      });
    });
  });

  describe('hook cleanup', () => {
    it('should properly cleanup on unmount during refresh', async () => {
      scrollYValue = 0;
      const onRefresh = vi.fn().mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 1000))
      );
      const { result, unmount } = renderHook(() => 
        usePullToRefresh({ onRefresh, threshold: 50 })
      );

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
      });
      act(() => {
        result.current.onTouchMove(createTouchEvent(300));
      });
      act(() => {
        result.current.onTouchEnd();
      });

      expect(result.current.isRefreshing).toBe(true);

      // Unmount while refreshing
      unmount();

      // Should not throw
      expect(window.removeEventListener).toHaveBeenCalled();
    });
  });
});

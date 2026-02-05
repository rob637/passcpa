/**
 * useSwipe Hook - Quality Tests (Bug-Finding Focus)
 * 
 * Tests horizontal swipe gesture detection edge cases.
 * @batch 6 of 20 (30 tests)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSwipe } from '../../hooks/useSwipe';

// Helper to create mock touch events
const createTouchEvent = (clientX: number, clientY: number = 100) => ({
  touches: [{ clientX, clientY }],
}) as unknown as React.TouchEvent;

describe('useSwipe Hook - Quality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Swipe Detection', () => {
    it('returns required handlers', () => {
      const { result } = renderHook(() => useSwipe({}));
      expect(result.current.onTouchStart).toBeInstanceOf(Function);
      expect(result.current.onTouchMove).toBeInstanceOf(Function);
      expect(result.current.onTouchEnd).toBeInstanceOf(Function);
    });

    it('calls onSwipeLeft when swiping left past threshold', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft, threshold: 50 }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(200));
        result.current.onTouchMove(createTouchEvent(100));
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).toHaveBeenCalledTimes(1);
    });

    it('calls onSwipeRight when swiping right past threshold', () => {
      const onSwipeRight = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeRight, threshold: 50 }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
        result.current.onTouchMove(createTouchEvent(200));
        result.current.onTouchEnd();
      });

      expect(onSwipeRight).toHaveBeenCalledTimes(1);
    });
  });

  describe('Threshold Edge Cases', () => {
    it('does not trigger swipe when exactly at threshold', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft, threshold: 50 }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(150));
        result.current.onTouchMove(createTouchEvent(100)); // 50px exactly
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).toHaveBeenCalledTimes(1);
    });

    it('does not trigger swipe when below threshold', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft, threshold: 50 }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(149));
        result.current.onTouchMove(createTouchEvent(100)); // 49px - below threshold
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it('works with zero threshold', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft, threshold: 0 }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(101));
        result.current.onTouchMove(createTouchEvent(100));
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).toHaveBeenCalled();
    });

    it('works with very large threshold', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft, threshold: 1000 }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(500));
        result.current.onTouchMove(createTouchEvent(100));
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it('uses default threshold of 50', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(200));
        result.current.onTouchMove(createTouchEvent(100));
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).toHaveBeenCalled();
    });
  });

  describe('Enabled/Disabled State', () => {
    it('does not respond when disabled', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft, enabled: false }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(200));
        result.current.onTouchMove(createTouchEvent(100));
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it('responds when explicitly enabled', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft, enabled: true }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(200));
        result.current.onTouchMove(createTouchEvent(100));
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).toHaveBeenCalled();
    });

    it('is enabled by default', () => {
      const onSwipeRight = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeRight }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
        result.current.onTouchMove(createTouchEvent(200));
        result.current.onTouchEnd();
      });

      expect(onSwipeRight).toHaveBeenCalled();
    });
  });

  describe('Vertical vs Horizontal Detection', () => {
    it('ignores vertical swipes', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100, 100));
        result.current.onTouchMove(createTouchEvent(100, 300)); // Vertical movement only
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it('handles diagonal swipes preferring horizontal', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(200, 100));
        result.current.onTouchMove(createTouchEvent(100, 130)); // More horizontal
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).toHaveBeenCalled();
    });
  });

  describe('Incomplete Gestures', () => {
    it('handles touch end without move', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it('handles touch end without start', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft }));

      act(() => {
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it('handles touch move without start', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft }));

      act(() => {
        result.current.onTouchMove(createTouchEvent(100));
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it('resets state after completed swipe', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(200));
        result.current.onTouchMove(createTouchEvent(100));
        result.current.onTouchEnd();
      });

      // Second swipe should work independently
      act(() => {
        result.current.onTouchStart(createTouchEvent(200));
        result.current.onTouchMove(createTouchEvent(100));
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).toHaveBeenCalledTimes(2);
    });
  });

  describe('Callback Handling', () => {
    it('works without any callbacks', () => {
      const { result } = renderHook(() => useSwipe({}));

      expect(() => {
        act(() => {
          result.current.onTouchStart(createTouchEvent(200));
          result.current.onTouchMove(createTouchEvent(100));
          result.current.onTouchEnd();
        });
      }).not.toThrow();
    });

    it('works with only onSwipeLeft', () => {
      const onSwipeLeft = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
        result.current.onTouchMove(createTouchEvent(200)); // Swipe right
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it('works with only onSwipeRight', () => {
      const onSwipeRight = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeRight }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(200));
        result.current.onTouchMove(createTouchEvent(100)); // Swipe left
        result.current.onTouchEnd();
      });

      expect(onSwipeRight).not.toHaveBeenCalled();
    });

    it('handles both callbacks provided', () => {
      const onSwipeLeft = vi.fn();
      const onSwipeRight = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft, onSwipeRight }));

      act(() => {
        result.current.onTouchStart(createTouchEvent(200));
        result.current.onTouchMove(createTouchEvent(100));
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).toHaveBeenCalled();
      expect(onSwipeRight).not.toHaveBeenCalled();
    });
  });

  describe('Multiple Touch Points (Edge Case)', () => {
    it('handles multiple sequential swipes', () => {
      const onSwipeLeft = vi.fn();
      const onSwipeRight = vi.fn();
      const { result } = renderHook(() => useSwipe({ onSwipeLeft, onSwipeRight }));

      // First swipe left
      act(() => {
        result.current.onTouchStart(createTouchEvent(200));
        result.current.onTouchMove(createTouchEvent(100));
        result.current.onTouchEnd();
      });

      // Then swipe right
      act(() => {
        result.current.onTouchStart(createTouchEvent(100));
        result.current.onTouchMove(createTouchEvent(200));
        result.current.onTouchEnd();
      });

      expect(onSwipeLeft).toHaveBeenCalledTimes(1);
      expect(onSwipeRight).toHaveBeenCalledTimes(1);
    });
  });
});

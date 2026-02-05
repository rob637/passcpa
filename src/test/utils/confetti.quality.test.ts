/**
 * Confetti Utilities - Quality Tests (Bug-Finding Focus)
 * 
 * Tests celebration confetti functions for edge cases.
 * @batch additional (18 tests)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock canvas-confetti with hoisted factory
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

import confetti from 'canvas-confetti';
import { celebrateAchievement, celebrateStreak, celebrateCompletion } from '../../utils/confetti';

const mockConfetti = confetti as unknown as ReturnType<typeof vi.fn>;

describe('Confetti Utilities - Quality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('celebrateAchievement', () => {
    it('fires initial center burst', () => {
      celebrateAchievement();
      expect(mockConfetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 100,
          spread: 70,
        })
      );
    });

    it('fires left burst after 150ms', () => {
      celebrateAchievement();
      vi.advanceTimersByTime(150);
      expect(mockConfetti).toHaveBeenCalledWith(
        expect.objectContaining({
          angle: 60,
          origin: { x: 0 },
        })
      );
    });

    it('fires right burst after 300ms', () => {
      celebrateAchievement();
      vi.advanceTimersByTime(300);
      expect(mockConfetti).toHaveBeenCalledWith(
        expect.objectContaining({
          angle: 120,
          origin: { x: 1 },
        })
      );
    });

    it('fires all three bursts in sequence', () => {
      celebrateAchievement();
      vi.advanceTimersByTime(350);
      expect(mockConfetti).toHaveBeenCalledTimes(3);
    });

    it('uses correct brand colors', () => {
      celebrateAchievement();
      expect(mockConfetti).toHaveBeenCalledWith(
        expect.objectContaining({
          colors: expect.arrayContaining(['#6366f1']),
        })
      );
    });

    it('does not throw when called multiple times', () => {
      expect(() => {
        celebrateAchievement();
        celebrateAchievement();
      }).not.toThrow();
    });
  });

  describe('celebrateStreak', () => {
    it('scales intensity with streak count', () => {
      celebrateStreak(1);
      expect(mockConfetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 10,
        })
      );
    });

    it('caps intensity at 80 particles', () => {
      celebrateStreak(100);
      expect(mockConfetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 80,
        })
      );
    });

    it('handles zero streak', () => {
      celebrateStreak(0);
      expect(mockConfetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 0,
        })
      );
    });

    it('handles negative streak gracefully', () => {
      celebrateStreak(-5);
      expect(mockConfetti).toHaveBeenCalled();
    });

    it('uses success colors (green and purple)', () => {
      celebrateStreak(5);
      expect(mockConfetti).toHaveBeenCalledWith(
        expect.objectContaining({
          colors: ['#10b981', '#6366f1'],
        })
      );
    });

    it('uses smaller scalar than achievement', () => {
      celebrateStreak(5);
      expect(mockConfetti).toHaveBeenCalledWith(
        expect.objectContaining({
          scalar: 0.8,
        })
      );
    });
  });

  describe('celebrateCompletion', () => {
    it('starts animation frame loop', () => {
      const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((_cb) => {
        return 1;
      });
      
      celebrateCompletion();
      expect(rafSpy).toHaveBeenCalled();
      
      rafSpy.mockRestore();
    });

    it('fires confetti from both sides', () => {
      const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
      
      celebrateCompletion();
      
      expect(mockConfetti).toHaveBeenCalledWith(
        expect.objectContaining({ origin: { x: 0 } })
      );
      expect(mockConfetti).toHaveBeenCalledWith(
        expect.objectContaining({ origin: { x: 1 } })
      );
      
      rafSpy.mockRestore();
    });
  });
});

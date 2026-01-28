import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Import - AudioContext is now mocked in setup.js
import * as feedback from '../../services/feedback';

describe('feedback.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Re-initialize feedback to reset internal state
    feedback.setSoundEnabled(true);
    feedback.setHapticEnabled(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initFeedback', () => {
    it('should initialize with defaults when no localStorage values', () => {
      feedback.initFeedback();
      expect(feedback.isSoundEnabled()).toBe(true);
      expect(feedback.isHapticEnabled()).toBe(true);
    });

    it('should enable sound when localStorage is not "false"', () => {
      feedback.initFeedback();
      expect(feedback.isSoundEnabled()).toBe(true);
    });
  });

  describe('setSoundEnabled', () => {
    it('should set sound enabled to true', () => {
      feedback.setSoundEnabled(true);
      expect(feedback.isSoundEnabled()).toBe(true);
    });

    it('should set sound enabled to false', () => {
      feedback.setSoundEnabled(false);
      expect(feedback.isSoundEnabled()).toBe(false);
    });
  });

  describe('setHapticEnabled', () => {
    it('should set haptic enabled to true', () => {
      feedback.setHapticEnabled(true);
      expect(feedback.isHapticEnabled()).toBe(true);
    });

    it('should set haptic enabled to false', () => {
      feedback.setHapticEnabled(false);
      expect(feedback.isHapticEnabled()).toBe(false);
    });
  });

  describe('playSound', () => {
    beforeEach(() => {
      feedback.setSoundEnabled(true);
    });

    it('should not play when sound is disabled', () => {
      feedback.setSoundEnabled(false);
      // Should not throw
      expect(() => feedback.playSound('correct')).not.toThrow();
    });

    it('should play correct sound', () => {
      expect(() => feedback.playSound('correct')).not.toThrow();
    });

    it('should play incorrect sound', () => {
      expect(() => feedback.playSound('incorrect')).not.toThrow();
    });

    it('should play complete sound', () => {
      expect(() => feedback.playSound('complete')).not.toThrow();
    });

    it('should play streak sound', () => {
      expect(() => feedback.playSound('streak')).not.toThrow();
    });

    it('should play click sound', () => {
      expect(() => feedback.playSound('click')).not.toThrow();
    });

    it('should play levelUp sound', () => {
      expect(() => feedback.playSound('levelUp')).not.toThrow();
    });
  });

  describe('haptic', () => {
    let vibrateMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      vibrateMock = vi.fn();
      Object.defineProperty(navigator, 'vibrate', {
        value: vibrateMock,
        configurable: true,
        writable: true,
      });
      feedback.setHapticEnabled(true);
    });

    it('should not vibrate when haptic is disabled', () => {
      feedback.setHapticEnabled(false);
      feedback.haptic('success');
      expect(vibrateMock).not.toHaveBeenCalled();
    });

    it('should not vibrate when vibrate is not supported', () => {
      Object.defineProperty(navigator, 'vibrate', {
        value: undefined,
        configurable: true,
        writable: true,
      });
      // Should not throw
      expect(() => feedback.haptic('success')).not.toThrow();
    });

    it('should vibrate for success', () => {
      feedback.haptic('success');
      expect(vibrateMock).toHaveBeenCalledWith([50, 50, 100]);
    });

    it('should vibrate for warning', () => {
      feedback.haptic('warning');
      expect(vibrateMock).toHaveBeenCalledWith([100, 50, 100]);
    });

    it('should vibrate for error', () => {
      feedback.haptic('error');
      expect(vibrateMock).toHaveBeenCalledWith([200, 100, 200]);
    });

    it('should vibrate for light', () => {
      feedback.haptic('light');
      expect(vibrateMock).toHaveBeenCalledWith(20);
    });

    it('should vibrate for medium', () => {
      feedback.haptic('medium');
      expect(vibrateMock).toHaveBeenCalledWith(50);
    });

    it('should vibrate for heavy', () => {
      feedback.haptic('heavy');
      expect(vibrateMock).toHaveBeenCalledWith(100);
    });

    it('should vibrate for selection', () => {
      feedback.haptic('selection');
      expect(vibrateMock).toHaveBeenCalledWith(10);
    });

    it('should handle vibrate error gracefully', () => {
      vibrateMock.mockImplementation(() => {
        throw new Error('Vibrate error');
      });
      // Should not throw
      expect(() => feedback.haptic('success')).not.toThrow();
    });
  });

  describe('convenience methods', () => {
    let vibrateMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      vibrateMock = vi.fn();
      Object.defineProperty(navigator, 'vibrate', {
        value: vibrateMock,
        configurable: true,
        writable: true,
      });
      feedback.setSoundEnabled(true);
      feedback.setHapticEnabled(true);
    });

    it('correct() should play sound and haptic', () => {
      feedback.correct();
      expect(vibrateMock).toHaveBeenCalledWith([50, 50, 100]);
    });

    it('incorrect() should play sound and haptic', () => {
      feedback.incorrect();
      expect(vibrateMock).toHaveBeenCalledWith([200, 100, 200]);
    });

    it('complete() should play sound and haptic', () => {
      feedback.complete();
      expect(vibrateMock).toHaveBeenCalledWith([50, 50, 100]);
    });

    it('streak() should play sound and haptic', () => {
      feedback.streak();
      expect(vibrateMock).toHaveBeenCalledWith(50);
    });

    it('levelUp() should play sound and haptic', () => {
      feedback.levelUp();
      expect(vibrateMock).toHaveBeenCalledWith(100);
    });

    it('click() should play sound and haptic', () => {
      feedback.click();
      expect(vibrateMock).toHaveBeenCalledWith(20);
    });

    it('tap() should only haptic', () => {
      feedback.tap();
      expect(vibrateMock).toHaveBeenCalledWith(10);
    });
  });
});

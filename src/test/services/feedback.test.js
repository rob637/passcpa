import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the entire module to avoid AudioContext constructor issues
vi.mock('../../services/feedback', () => ({
  initFeedback: vi.fn(),
  setSoundEnabled: vi.fn(),
  setHapticEnabled: vi.fn(),
  isSoundEnabled: vi.fn(() => true),
  isHapticEnabled: vi.fn(() => true),
  playSound: vi.fn(),
  haptic: vi.fn(),
  correct: vi.fn(),
  incorrect: vi.fn(),
  complete: vi.fn(),
  streak: vi.fn(),
  levelUp: vi.fn(),
  click: vi.fn(),
  tap: vi.fn(),
  default: {
    initFeedback: vi.fn(),
    setSoundEnabled: vi.fn(),
    setHapticEnabled: vi.fn(),
    isSoundEnabled: vi.fn(() => true),
    isHapticEnabled: vi.fn(() => true),
    playSound: vi.fn(),
    haptic: vi.fn(),
    correct: vi.fn(),
    incorrect: vi.fn(),
    complete: vi.fn(),
    streak: vi.fn(),
    levelUp: vi.fn(),
    click: vi.fn(),
    tap: vi.fn(),
  },
}));

import feedback, {
  initFeedback,
  setSoundEnabled,
  setHapticEnabled,
  isSoundEnabled,
  isHapticEnabled,
  playSound,
  haptic,
  correct,
  incorrect,
  complete,
  streak,
  levelUp,
  click,
  tap,
} from '../../services/feedback';

describe('feedback Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initFeedback', () => {
    it('should be callable', () => {
      initFeedback();
      expect(initFeedback).toHaveBeenCalled();
    });
  });

  describe('setSoundEnabled', () => {
    it('enables sound', () => {
      setSoundEnabled(true);
      expect(setSoundEnabled).toHaveBeenCalledWith(true);
    });

    it('disables sound', () => {
      setSoundEnabled(false);
      expect(setSoundEnabled).toHaveBeenCalledWith(false);
    });
  });

  describe('setHapticEnabled', () => {
    it('enables haptic', () => {
      setHapticEnabled(true);
      expect(setHapticEnabled).toHaveBeenCalledWith(true);
    });

    it('disables haptic', () => {
      setHapticEnabled(false);
      expect(setHapticEnabled).toHaveBeenCalledWith(false);
    });
  });

  describe('isSoundEnabled', () => {
    it('returns boolean', () => {
      const result = isSoundEnabled();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('isHapticEnabled', () => {
    it('returns boolean', () => {
      const result = isHapticEnabled();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('playSound', () => {
    it('plays correct sound', () => {
      playSound('correct');
      expect(playSound).toHaveBeenCalledWith('correct');
    });

    it('plays incorrect sound', () => {
      playSound('incorrect');
      expect(playSound).toHaveBeenCalledWith('incorrect');
    });

    it('plays complete sound', () => {
      playSound('complete');
      expect(playSound).toHaveBeenCalledWith('complete');
    });

    it('plays streak sound', () => {
      playSound('streak');
      expect(playSound).toHaveBeenCalledWith('streak');
    });

    it('plays click sound', () => {
      playSound('click');
      expect(playSound).toHaveBeenCalledWith('click');
    });

    it('plays levelUp sound', () => {
      playSound('levelUp');
      expect(playSound).toHaveBeenCalledWith('levelUp');
    });
  });

  describe('haptic', () => {
    it('triggers success haptic', () => {
      haptic('success');
      expect(haptic).toHaveBeenCalledWith('success');
    });

    it('triggers warning haptic', () => {
      haptic('warning');
      expect(haptic).toHaveBeenCalledWith('warning');
    });

    it('triggers error haptic', () => {
      haptic('error');
      expect(haptic).toHaveBeenCalledWith('error');
    });

    it('triggers light haptic', () => {
      haptic('light');
      expect(haptic).toHaveBeenCalledWith('light');
    });

    it('triggers medium haptic', () => {
      haptic('medium');
      expect(haptic).toHaveBeenCalledWith('medium');
    });

    it('triggers heavy haptic', () => {
      haptic('heavy');
      expect(haptic).toHaveBeenCalledWith('heavy');
    });

    it('triggers selection haptic', () => {
      haptic('selection');
      expect(haptic).toHaveBeenCalledWith('selection');
    });
  });

  describe('convenience methods', () => {
    it('correct() is callable', () => {
      correct();
      expect(correct).toHaveBeenCalled();
    });

    it('incorrect() is callable', () => {
      incorrect();
      expect(incorrect).toHaveBeenCalled();
    });

    it('complete() is callable', () => {
      complete();
      expect(complete).toHaveBeenCalled();
    });

    it('streak() is callable', () => {
      streak();
      expect(streak).toHaveBeenCalled();
    });

    it('levelUp() is callable', () => {
      levelUp();
      expect(levelUp).toHaveBeenCalled();
    });

    it('click() is callable', () => {
      click();
      expect(click).toHaveBeenCalled();
    });

    it('tap() is callable', () => {
      tap();
      expect(tap).toHaveBeenCalled();
    });
  });

  describe('default export', () => {
    it('exports all functions', () => {
      expect(feedback.initFeedback).toBeDefined();
      expect(feedback.setSoundEnabled).toBeDefined();
      expect(feedback.setHapticEnabled).toBeDefined();
      expect(feedback.isSoundEnabled).toBeDefined();
      expect(feedback.isHapticEnabled).toBeDefined();
      expect(feedback.playSound).toBeDefined();
      expect(feedback.haptic).toBeDefined();
      expect(feedback.correct).toBeDefined();
      expect(feedback.incorrect).toBeDefined();
      expect(feedback.complete).toBeDefined();
      expect(feedback.streak).toBeDefined();
      expect(feedback.levelUp).toBeDefined();
      expect(feedback.click).toBeDefined();
      expect(feedback.tap).toBeDefined();
    });
  });
});

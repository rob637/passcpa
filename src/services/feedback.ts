// Sound & Haptic Feedback Service
// Provides audio and tactile feedback for engagement

// Sound effects
// using Web Audio API for performance and zero-asset loading

// Audio Context Singleton
const audioContext =
  typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

const generateTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

type FeedbackType = 'correct' | 'incorrect' | 'complete' | 'streak' | 'click' | 'levelUp';

// Sound presets using tones
const TONE_PRESETS: Record<FeedbackType, () => void> = {
  correct: () => {
    generateTone(523.25, 0.1); // C5
    setTimeout(() => generateTone(659.25, 0.15), 100); // E5
  },
  incorrect: () => {
    generateTone(200, 0.3, 'square');
  },
  complete: () => {
    generateTone(523.25, 0.1);
    setTimeout(() => generateTone(659.25, 0.1), 100);
    setTimeout(() => generateTone(783.99, 0.2), 200);
  },
  streak: () => {
    generateTone(440, 0.08);
    setTimeout(() => generateTone(554.37, 0.08), 80);
    setTimeout(() => generateTone(659.25, 0.08), 160);
    setTimeout(() => generateTone(880, 0.15), 240);
  },
  click: () => {
    generateTone(1000, 0.02);
  },
  levelUp: () => {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      setTimeout(() => generateTone(freq, 0.12), i * 100);
    });
  },
};

// User preferences (stored in localStorage)
let soundEnabled = true;
let hapticEnabled = true;

export const initFeedback = () => {
  if (typeof window === 'undefined') return;

  soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
  hapticEnabled = localStorage.getItem('hapticEnabled') !== 'false';
};

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
  localStorage.setItem('soundEnabled', String(enabled));
};

export const setHapticEnabled = (enabled: boolean) => {
  hapticEnabled = enabled;
  localStorage.setItem('hapticEnabled', String(enabled));
};

export const isSoundEnabled = () => soundEnabled;
export const isHapticEnabled = () => hapticEnabled;

// Play sound effect
export const playSound = (soundName: FeedbackType) => {
  if (!soundEnabled) return;

  // Resume audio context if suspended (iOS requirement)
  if (audioContext?.state === 'suspended') {
    audioContext.resume();
  }

  // Use tone presets
  if (TONE_PRESETS[soundName]) {
    TONE_PRESETS[soundName]();
    return;
  }
};

export const haptic = (type: 'success' | 'warning' | 'error' | 'light' | 'medium' | 'heavy' | 'selection') => {
  if (!hapticEnabled || !navigator.vibrate) return;

  try {
    switch (type) {
      case 'success':
        navigator.vibrate([50, 50, 100]);
        break;
      case 'warning':
        navigator.vibrate([100, 50, 100]);
        break;
      case 'error':
        navigator.vibrate([200, 100, 200]);
        break;
      case 'light':
        navigator.vibrate(20);
        break;
      case 'medium':
        navigator.vibrate(50);
        break;
      case 'heavy':
        navigator.vibrate(100);
        break;
      case 'selection':
        navigator.vibrate(10);
        break;
    }
  } catch (e) {
    // Haptics not supported
  }
};

// Convenience methods for backward compatibility
export const correct = () => { playSound('correct'); haptic('success'); };
export const incorrect = () => { playSound('incorrect'); haptic('error'); };
export const complete = () => { playSound('complete'); haptic('success'); };
export const streak = () => { playSound('streak'); haptic('medium'); };
export const levelUp = () => { playSound('levelUp'); haptic('heavy'); };
export const click = () => { playSound('click'); haptic('light'); };
export const tap = () => { haptic('selection'); };

export default {
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
  tap
};

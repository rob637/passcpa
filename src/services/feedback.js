// Sound & Haptic Feedback Service
// Provides audio and tactile feedback for engagement

// Sound effects (base64 encoded short sounds for performance)
const SOUNDS = {
  correct: '/sounds/correct.mp3',
  incorrect: '/sounds/incorrect.mp3',
  complete: '/sounds/complete.mp3',
  streak: '/sounds/streak.mp3',
  levelUp: '/sounds/level-up.mp3',
  click: '/sounds/click.mp3',
};

// Fallback: Use Web Audio API to generate tones
const audioContext =
  typeof window !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

const generateTone = (frequency, duration, type = 'sine') => {
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

// Sound presets using tones
const TONE_PRESETS = {
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

export const setSoundEnabled = (enabled) => {
  soundEnabled = enabled;
  localStorage.setItem('soundEnabled', enabled);
};

export const setHapticEnabled = (enabled) => {
  hapticEnabled = enabled;
  localStorage.setItem('hapticEnabled', enabled);
};

export const isSoundEnabled = () => soundEnabled;
export const isHapticEnabled = () => hapticEnabled;

// Play sound effect
export const playSound = (soundName) => {
  if (!soundEnabled) return;

  // Resume audio context if suspended (iOS requirement)
  if (audioContext?.state === 'suspended') {
    audioContext.resume();
  }

  // Use tone presets
  const preset = TONE_PRESETS[soundName];
  if (preset) {
    preset();
  }
};

// Trigger haptic feedback
export const triggerHaptic = (type = 'light') => {
  if (!hapticEnabled) return;
  if (!navigator.vibrate) return;

  const patterns = {
    light: [10],
    medium: [20],
    heavy: [30],
    success: [10, 50, 10],
    error: [50, 30, 50],
    warning: [30, 20, 30],
    double: [10, 30, 10],
    triple: [10, 20, 10, 20, 10],
  };

  navigator.vibrate(patterns[type] || patterns.light);
};

// Combined feedback for common actions
export const feedback = {
  correct: () => {
    playSound('correct');
    triggerHaptic('success');
  },
  incorrect: () => {
    playSound('incorrect');
    triggerHaptic('error');
  },
  complete: () => {
    playSound('complete');
    triggerHaptic('success');
  },
  streak: () => {
    playSound('streak');
    triggerHaptic('triple');
  },
  levelUp: () => {
    playSound('levelUp');
    triggerHaptic('triple');
  },
  click: () => {
    playSound('click');
    triggerHaptic('light');
  },
  tap: () => {
    triggerHaptic('light');
  },
};

// Initialize on load
if (typeof window !== 'undefined') {
  initFeedback();
}

export default feedback;

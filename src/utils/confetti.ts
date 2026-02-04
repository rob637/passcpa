import confetti from 'canvas-confetti';

// Default celebration confetti burst
export const celebrateAchievement = () => {
  // First burst - center
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
  });

  // Second burst - left side
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#6366f1', '#8b5cf6', '#ec4899'],
    });
  }, 150);

  // Third burst - right side
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#f59e0b', '#10b981', '#6366f1'],
    });
  }, 300);
};

// Subtle success confetti for correct answers streaks
export const celebrateStreak = (streakCount: number) => {
  const intensity = Math.min(streakCount * 10, 80);
  confetti({
    particleCount: intensity,
    spread: 45,
    origin: { y: 0.7 },
    colors: ['#10b981', '#6366f1'],
    scalar: 0.8,
  });
};

// Big celebration for completing a session
export const celebrateCompletion = () => {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#6366f1', '#8b5cf6', '#ec4899'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#f59e0b', '#10b981', '#6366f1'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

export default {
  celebrateAchievement,
  celebrateStreak,
  celebrateCompletion,
};

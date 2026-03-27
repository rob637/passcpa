import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system' | 'auto';

interface ThemeContextType {
  darkMode: boolean;
  themeMode: ThemeMode;
  toggleDarkMode: () => void;
  setTheme: (isDark: boolean) => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

/**
 * Check if current time is nighttime (dark mode hours)
 * Daytime: 7 AM - 7 PM (light mode)
 * Nighttime: 7 PM - 7 AM (dark mode)
 */
function isNighttime(): boolean {
  const hour = new Date().getHours();
  return hour < 7 || hour >= 19; // Before 7 AM or 7 PM or later
}

/**
 * Theme Provider - Manages dark/light mode with system preference and time-based support
 * Persists preference to localStorage and respects system/time preference
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme mode: 'light', 'dark', 'system', or 'auto' (time-based)
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('voraprep-theme-mode');
      if (stored === 'light' || stored === 'dark' || stored === 'system' || stored === 'auto') {
        return stored;
      }
      // Check old dark-mode key for migration
      const oldStored = localStorage.getItem('voraprep-dark-mode');
      if (oldStored === 'true') return 'dark';
      if (oldStored === 'false') return 'light';
    }
    // Default to 'light' for new users
    return 'light';
  });

  // System prefers dark (for 'system' mode)
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Time-based dark mode (for 'auto' mode)
  const [timeBasedDark, setTimeBasedDark] = useState(isNighttime);

  // Computed dark mode based on themeMode, system preference, or time
  const darkMode = 
    themeMode === 'dark' || 
    (themeMode === 'system' && systemPrefersDark) ||
    (themeMode === 'auto' && timeBasedDark);

  // Apply dark class to document
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Check time periodically for auto mode (every minute)
  useEffect(() => {
    if (themeMode !== 'auto') return;
    
    const checkTime = () => {
      setTimeBasedDark(isNighttime());
    };
    
    // Check immediately and then every minute
    checkTime();
    const interval = setInterval(checkTime, 60000);
    
    return () => clearInterval(interval);
  }, [themeMode]);

  // Persist theme mode
  useEffect(() => {
    localStorage.setItem('voraprep-theme-mode', themeMode);
    // Clean up old key
    localStorage.removeItem('voraprep-dark-mode');
  }, [themeMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setThemeModeState(darkMode ? 'light' : 'dark');
  };

  const setTheme = (isDark: boolean) => {
    setThemeModeState(isDark ? 'dark' : 'light');
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, themeMode, toggleDarkMode, setTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;

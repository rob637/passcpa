import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  darkMode: boolean;
  themeMode: ThemeMode;
  toggleDarkMode: () => void;
  setTheme: (isDark: boolean) => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

/**
 * Theme Provider - Manages dark/light mode with system preference support
 * Persists preference to localStorage and respects system preference
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme mode: 'light', 'dark', or 'system'
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('voraprep-theme-mode');
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
      // Check old dark-mode key for migration
      const oldStored = localStorage.getItem('voraprep-dark-mode');
      if (oldStored === 'true') return 'dark';
      if (oldStored === 'false') return 'light';
    }
    return 'system';
  });

  // Computed dark mode based on themeMode and system preference
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const darkMode = themeMode === 'dark' || (themeMode === 'system' && systemPrefersDark);

  // Apply dark class to document
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

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

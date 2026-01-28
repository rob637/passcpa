import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../providers/ThemeProvider';

// Create a proper matchMedia mock that includes addEventListener
const createMatchMediaMock = (matches) => {
  return {
    matches,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
};

// Test wrapper
const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

describe('ThemeProvider', () => {
  let originalMatchMedia;

  beforeEach(() => {
    // Save original
    originalMatchMedia = window.matchMedia;

    // Reset matchMedia mock before each test
    window.matchMedia = vi.fn().mockImplementation(() => createMatchMediaMock(false));

    // Clear localStorage mock
    window.localStorage.getItem.mockClear();
    window.localStorage.setItem.mockClear();
    window.localStorage.getItem.mockReturnValue(null);

    // Reset document class
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    // Restore original
    window.matchMedia = originalMatchMedia;
  });

  describe('Initial State', () => {
    it('should default to light mode', () => {
      window.localStorage.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation(() => createMatchMediaMock(false));

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.darkMode).toBe(false);
    });

    it('should read dark mode preference from localStorage', () => {
      window.localStorage.getItem.mockReturnValue('true');
      window.matchMedia = vi.fn().mockImplementation(() => createMatchMediaMock(false));

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.darkMode).toBe(true);
    });

    it('should respect system preference when no localStorage value', () => {
      window.localStorage.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation(() => createMatchMediaMock(true)); // prefers dark

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.darkMode).toBe(true);
    });
  });

  describe('toggleDarkMode', () => {
    it('should toggle from light to dark', () => {
      window.localStorage.getItem.mockReturnValue('false');
      window.matchMedia = vi.fn().mockImplementation(() => createMatchMediaMock(false));

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.darkMode).toBe(false);

      act(() => {
        result.current.toggleDarkMode();
      });

      expect(result.current.darkMode).toBe(true);
    });

    it('should toggle from dark to light', () => {
      window.localStorage.getItem.mockReturnValue('true');
      window.matchMedia = vi.fn().mockImplementation(() => createMatchMediaMock(false));

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.darkMode).toBe(true);

      act(() => {
        result.current.toggleDarkMode();
      });

      expect(result.current.darkMode).toBe(false);
    });

    it('should persist preference to localStorage', () => {
      window.localStorage.getItem.mockReturnValue('false');
      window.matchMedia = vi.fn().mockImplementation(() => createMatchMediaMock(false));

      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.toggleDarkMode();
      });

      expect(window.localStorage.setItem).toHaveBeenCalledWith('voraprep-dark-mode', 'true');
    });

    it('should update document class', () => {
      window.localStorage.getItem.mockReturnValue('false');
      window.matchMedia = vi.fn().mockImplementation(() => createMatchMediaMock(false));

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(document.documentElement.classList.contains('dark')).toBe(false);

      act(() => {
        result.current.toggleDarkMode();
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('setTheme', () => {
    it('should explicitly set dark mode', () => {
      window.localStorage.getItem.mockReturnValue('false');
      window.matchMedia = vi.fn().mockImplementation(() => createMatchMediaMock(false));

      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme(true);
      });

      expect(result.current.darkMode).toBe(true);
    });

    it('should explicitly set light mode', () => {
      window.localStorage.getItem.mockReturnValue('true');
      window.matchMedia = vi.fn().mockImplementation(() => createMatchMediaMock(false));

      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.setTheme(false);
      });

      expect(result.current.darkMode).toBe(false);
    });
  });

  describe('useTheme outside provider', () => {
    it('should throw error when used outside ThemeProvider', () => {
      window.matchMedia = vi.fn().mockImplementation(() => createMatchMediaMock(false));
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useTheme());
      }).toThrow('useTheme must be used within a ThemeProvider');

      consoleSpy.mockRestore();
    });
  });
});

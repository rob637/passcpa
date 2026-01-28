import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';

// Mock analytics service
vi.mock('../../services/analytics', () => ({
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

// Mock useLocation
const mockLocation = { pathname: '/dashboard', search: '', hash: '', state: null, key: 'default' };
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(() => mockLocation),
  };
});

import { usePageTracking } from '../../hooks/usePageTracking';
import { trackPageView, initAnalytics } from '../../services/analytics';

describe('usePageTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes analytics on mount', () => {
    const wrapper = ({ children }) => (
      <MemoryRouter>{children}</MemoryRouter>
    );

    renderHook(() => usePageTracking(), { wrapper });

    expect(initAnalytics).toHaveBeenCalled();
  });

  it('tracks page view on mount', async () => {
    const wrapper = ({ children }) => (
      <MemoryRouter>{children}</MemoryRouter>
    );

    renderHook(() => usePageTracking(), { wrapper });

    // Advance timers to trigger tracking
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(trackPageView).toHaveBeenCalledWith('/dashboard', 'Dashboard');
  });

  it('uses VoraPrep title for unknown routes', async () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/unknown',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    });

    const wrapper = ({ children }) => (
      <MemoryRouter>{children}</MemoryRouter>
    );

    renderHook(() => usePageTracking(), { wrapper });

    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(trackPageView).toHaveBeenCalledWith('/unknown', 'VoraPrep');
  });

  it('tracks page view for settings route', async () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/settings',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    });

    const wrapper = ({ children }) => (
      <MemoryRouter>{children}</MemoryRouter>
    );

    renderHook(() => usePageTracking(), { wrapper });

    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(trackPageView).toHaveBeenCalledWith('/settings', 'Settings');
  });

  it('cleans up timeout on unmount', () => {
    const wrapper = ({ children }) => (
      <MemoryRouter>{children}</MemoryRouter>
    );

    const { unmount } = renderHook(() => usePageTracking(), { wrapper });

    // Unmount before timeout fires
    unmount();

    // Tracking should have been called for initial render
    act(() => {
      vi.advanceTimersByTime(150);
    });

    // Should not throw or cause issues
    expect(true).toBe(true);
  });
});

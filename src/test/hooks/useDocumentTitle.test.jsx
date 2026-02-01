import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { useDocumentTitle, useRouteTitle, ROUTE_TITLES } from '../../hooks/useDocumentTitle';

// Mock useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(() => ({ pathname: '/dashboard' })),
  };
});

describe('useDocumentTitle', () => {
  const originalTitle = document.title;

  beforeEach(() => {
    document.title = 'VoraPrep';
    // Create announcement element
    const announcement = document.createElement('div');
    announcement.id = 'route-announcement';
    document.body.appendChild(announcement);
  });

  afterEach(() => {
    document.title = originalTitle;
    const announcement = document.getElementById('route-announcement');
    if (announcement) {
      announcement.remove();
    }
  });

  describe('useDocumentTitle hook', () => {
    it('sets document title with base title', () => {
      const wrapper = ({ children }) => (
        <MemoryRouter>{children}</MemoryRouter>
      );

      renderHook(() => useDocumentTitle('Dashboard'), { wrapper });
      expect(document.title).toBe('Dashboard | VoraPrep');
    });

    it('uses base title when no title provided', () => {
      const wrapper = ({ children }) => (
        <MemoryRouter>{children}</MemoryRouter>
      );

      renderHook(() => useDocumentTitle(''), { wrapper });
      expect(document.title).toBe('VoraPrep');
    });

    it('announces to screen reader by default', () => {
      const wrapper = ({ children }) => (
        <MemoryRouter>{children}</MemoryRouter>
      );

      renderHook(() => useDocumentTitle('Settings'), { wrapper });
      const announcement = document.getElementById('route-announcement');
      expect(announcement?.textContent).toBe('Navigated to Settings');
    });

    it('skips announcement when announceToScreenReader is false', () => {
      const announcement = document.getElementById('route-announcement');
      if (announcement) {
        announcement.textContent = '';
      }

      const wrapper = ({ children }) => (
        <MemoryRouter>{children}</MemoryRouter>
      );

      renderHook(() => useDocumentTitle('Page', false), { wrapper });
      expect(announcement?.textContent).toBe('');
    });

    it('resets title on unmount', () => {
      const wrapper = ({ children }) => (
        <MemoryRouter>{children}</MemoryRouter>
      );

      const { unmount } = renderHook(() => useDocumentTitle('Temp Page'), { wrapper });
      expect(document.title).toBe('Temp Page | VoraPrep');

      unmount();
      expect(document.title).toBe('VoraPrep');
    });
  });

  describe('ROUTE_TITLES', () => {
    it('has title for dashboard route', () => {
      expect(ROUTE_TITLES['/dashboard']).toBe('Home');
    });

    it('has title for study route', () => {
      expect(ROUTE_TITLES['/study']).toBe('Learn');
    });

    it('has title for practice route', () => {
      expect(ROUTE_TITLES['/practice']).toBe('Practice Questions');
    });

    it('has title for flashcards route', () => {
      expect(ROUTE_TITLES['/flashcards']).toBe('Flashcards');
    });

    it('has title for settings route', () => {
      expect(ROUTE_TITLES['/settings']).toBe('Settings');
    });

    it('has title for login route', () => {
      expect(ROUTE_TITLES['/login']).toBe('Sign In');
    });

    it('has title for register route', () => {
      expect(ROUTE_TITLES['/register']).toBe('Create Account');
    });
  });

  describe('useRouteTitle hook', () => {
    it('sets title based on current pathname', () => {
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

      renderHook(() => useRouteTitle(), { wrapper });
      expect(document.title).toBe('Settings | VoraPrep');
    });

    it('handles lessons dynamic route', () => {
      vi.mocked(useLocation).mockReturnValue({
        pathname: '/lessons/123',
        search: '',
        hash: '',
        state: null,
        key: 'default',
      });

      const wrapper = ({ children }) => (
        <MemoryRouter>{children}</MemoryRouter>
      );

      renderHook(() => useRouteTitle(), { wrapper });
      expect(document.title).toBe('Lesson | VoraPrep');
    });

    it('uses base title for unknown routes', () => {
      vi.mocked(useLocation).mockReturnValue({
        pathname: '/unknown-page',
        search: '',
        hash: '',
        state: null,
        key: 'default',
      });

      const wrapper = ({ children }) => (
        <MemoryRouter>{children}</MemoryRouter>
      );

      renderHook(() => useRouteTitle(), { wrapper });
      expect(document.title).toBe('VoraPrep');
    });
  });
});

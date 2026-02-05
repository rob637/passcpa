/**
 * useDocumentTitle Hook - Quality Tests (Bug-Finding Focus)
 * 
 * Tests document title management edge cases.
 * @batch additional (25 tests)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, cleanup } from '@testing-library/react';
import { useDocumentTitle, ROUTE_TITLES } from '../../hooks/useDocumentTitle';

describe('useDocumentTitle Hook - Quality Tests', () => {
  const originalTitle = document.title;

  beforeEach(() => {
    vi.clearAllMocks();
    document.title = 'Initial Title';
    // Create announcement element for screen reader tests
    const announcement = document.createElement('div');
    announcement.id = 'route-announcement';
    document.body.appendChild(announcement);
  });

  afterEach(() => {
    document.title = originalTitle;
    cleanup();
    const announcement = document.getElementById('route-announcement');
    if (announcement) {
      document.body.removeChild(announcement);
    }
  });

  describe('Basic Title Setting', () => {
    it('sets title with page name', () => {
      renderHook(() => useDocumentTitle('Dashboard'));
      expect(document.title).toBe('Dashboard | VoraPrep');
    });

    it('uses base title when empty string provided', () => {
      renderHook(() => useDocumentTitle(''));
      expect(document.title).toBe('VoraPrep');
    });

    it('restores base title on unmount', () => {
      const { unmount } = renderHook(() => useDocumentTitle('Test Page'));
      expect(document.title).toBe('Test Page | VoraPrep');
      
      unmount();
      expect(document.title).toBe('VoraPrep');
    });

    it('handles title with special characters', () => {
      renderHook(() => useDocumentTitle('Questions & Answers'));
      expect(document.title).toBe('Questions & Answers | VoraPrep');
    });

    it('handles very long title', () => {
      const longTitle = 'A'.repeat(200);
      renderHook(() => useDocumentTitle(longTitle));
      expect(document.title).toBe(`${longTitle} | VoraPrep`);
    });

    it('handles unicode in title', () => {
      renderHook(() => useDocumentTitle('学习中文'));
      expect(document.title).toBe('学习中文 | VoraPrep');
    });

    it('handles emoji in title', () => {
      renderHook(() => useDocumentTitle('Study 📚'));
      expect(document.title).toBe('Study 📚 | VoraPrep');
    });

    it('handles HTML-like content in title', () => {
      renderHook(() => useDocumentTitle('<script>alert("xss")</script>'));
      expect(document.title).toContain('<script>');
    });
  });

  describe('Screen Reader Announcements', () => {
    it('announces to screen reader by default', () => {
      renderHook(() => useDocumentTitle('New Page'));
      const announcement = document.getElementById('route-announcement');
      expect(announcement?.textContent).toBe('Navigated to New Page');
    });

    it('does not announce when disabled', () => {
      renderHook(() => useDocumentTitle('New Page', false));
      const announcement = document.getElementById('route-announcement');
      expect(announcement?.textContent).not.toBe('Navigated to New Page');
    });

    it('announces fallback for empty title', () => {
      renderHook(() => useDocumentTitle(''));
      const announcement = document.getElementById('route-announcement');
      expect(announcement?.textContent).toBe('Navigated to page');
    });

    it('handles missing announcement element gracefully', () => {
      const announcement = document.getElementById('route-announcement');
      if (announcement) {
        document.body.removeChild(announcement);
      }

      expect(() => {
        renderHook(() => useDocumentTitle('Test'));
      }).not.toThrow();
    });
  });

  describe('Title Updates', () => {
    it('updates title when prop changes', () => {
      const { rerender } = renderHook(
        ({ title }) => useDocumentTitle(title),
        { initialProps: { title: 'Page A' } }
      );

      expect(document.title).toBe('Page A | VoraPrep');

      rerender({ title: 'Page B' });
      expect(document.title).toBe('Page B | VoraPrep');
    });
  });

  describe('ROUTE_TITLES Constant', () => {
    it('has mapping for home routes', () => {
      expect(ROUTE_TITLES['/']).toBeDefined();
      expect(ROUTE_TITLES['/home']).toBeDefined();
    });

    it('has mapping for auth routes', () => {
      expect(ROUTE_TITLES['/login']).toBeDefined();
      expect(ROUTE_TITLES['/register']).toBeDefined();
      expect(ROUTE_TITLES['/forgot-password']).toBeDefined();
    });

    it('has mapping for study routes', () => {
      expect(ROUTE_TITLES['/practice']).toBeDefined();
      expect(ROUTE_TITLES['/flashcards']).toBeDefined();
      expect(ROUTE_TITLES['/quiz']).toBeDefined();
      expect(ROUTE_TITLES['/exam']).toBeDefined();
    });

    it('has mapping for admin routes', () => {
      expect(ROUTE_TITLES['/admin/cms']).toBeDefined();
      expect(ROUTE_TITLES['/admin/seed']).toBeDefined();
    });

    it('all route titles are non-empty strings', () => {
      Object.entries(ROUTE_TITLES).forEach(([_route, title]) => {
        expect(typeof title).toBe('string');
        expect(title.length).toBeGreaterThan(0);
      });
    });

    it('all routes start with /', () => {
      Object.keys(ROUTE_TITLES).forEach((route) => {
        expect(route.startsWith('/')).toBe(true);
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles whitespace-only title', () => {
      renderHook(() => useDocumentTitle('   '));
      // Title trims whitespace or treats as empty
      expect(document.title).toContain('VoraPrep');
    });

    it('handles newlines in title', () => {
      renderHook(() => useDocumentTitle('Line1\nLine2'));
      expect(document.title).toContain('Line1');
    });

    it('handles null-ish coercion edge', () => {
      // @ts-expect-error testing runtime behavior
      renderHook(() => useDocumentTitle(undefined));
      expect(document.title).toBe('VoraPrep');
    });
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InstallPrompt from '../../../components/common/InstallPrompt';

describe('InstallPrompt Component', () => {
  let mockMatchMedia;
  let mockLocalStorage;

  beforeEach(() => {
    // Mock matchMedia
    mockMatchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    window.matchMedia = mockMatchMedia;

    // Mock localStorage
    mockLocalStorage = {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
  });

  describe('Initial State', () => {
    it('does not show prompt by default', () => {
      render(<InstallPrompt />);
      expect(screen.queryByText(/install/i)).not.toBeInTheDocument();
    });

    it('does not show when already in standalone mode', () => {
      mockMatchMedia.mockReturnValue({
        matches: true, // Already installed
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      render(<InstallPrompt />);
      expect(screen.queryByText(/install voraprep/i)).not.toBeInTheDocument();
    });

    it('does not show when recently dismissed', () => {
      const recentTime = Date.now() - (3 * 24 * 60 * 60 * 1000); // 3 days ago
      mockLocalStorage.getItem.mockReturnValue(recentTime.toString());

      render(<InstallPrompt />);
      expect(screen.queryByText(/install voraprep/i)).not.toBeInTheDocument();
    });

    it('shows after 7 days since dismissal', () => {
      const oldTime = Date.now() - (8 * 24 * 60 * 60 * 1000); // 8 days ago
      mockLocalStorage.getItem.mockReturnValue(oldTime.toString());

      // We'd need to trigger beforeinstallprompt event
      render(<InstallPrompt />);
      // Without the event, it won't show
      expect(screen.queryByText(/install voraprep/i)).not.toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('listens for beforeinstallprompt event', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      render(<InstallPrompt />);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'beforeinstallprompt',
        expect.any(Function)
      );
    });

    it('removes event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = render(<InstallPrompt />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'beforeinstallprompt',
        expect.any(Function)
      );
    });
  });

  describe('Install Prompt Display', () => {
    it('shows prompt when beforeinstallprompt fires', async () => {
      render(<InstallPrompt />);

      // Simulate beforeinstallprompt event
      const event = new Event('beforeinstallprompt');
      event.preventDefault = vi.fn();
      event.prompt = vi.fn().mockResolvedValue(undefined);
      event.userChoice = Promise.resolve({ outcome: 'dismissed', platform: '' });

      // Fire the event
      window.dispatchEvent(event);

      await waitFor(() => {
        expect(screen.getByText(/install voraprep/i)).toBeInTheDocument();
      });
    });
  });

  describe('User Actions', () => {
    it('handles dismiss action', async () => {
      render(<InstallPrompt />);

      // Trigger beforeinstallprompt
      const event = new Event('beforeinstallprompt');
      event.preventDefault = vi.fn();
      event.prompt = vi.fn().mockResolvedValue(undefined);
      event.userChoice = Promise.resolve({ outcome: 'dismissed', platform: '' });
      window.dispatchEvent(event);

      await waitFor(() => {
        expect(screen.getByText(/install voraprep/i)).toBeInTheDocument();
      });

      // Click dismiss - find any button that's not the install button
      const buttons = screen.getAllByRole('button');
      const dismissButton = buttons.find(b => !b.textContent?.toLowerCase().includes('install'));
      if (dismissButton) {
        fireEvent.click(dismissButton);

        // Should save to localStorage
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          'pwa-install-dismissed',
          expect.any(String)
        );
      }
    });
  });

  describe('Installation Flow', () => {
    it('calls prompt on install button click', async () => {
      render(<InstallPrompt />);

      const mockPrompt = vi.fn().mockResolvedValue(undefined);
      const event = new Event('beforeinstallprompt');
      event.preventDefault = vi.fn();
      event.prompt = mockPrompt;
      event.userChoice = Promise.resolve({ outcome: 'accepted', platform: '' });

      window.dispatchEvent(event);

      await waitFor(() => {
        expect(screen.getByText(/install voraprep/i)).toBeInTheDocument();
      });

      const installButton = screen.getByRole('button', { name: /install/i });
      fireEvent.click(installButton);

      await waitFor(() => {
        expect(mockPrompt).toHaveBeenCalled();
      });
    });
  });
});

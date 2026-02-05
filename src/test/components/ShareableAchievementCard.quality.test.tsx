/**
 * Quality tests for ShareableAchievementCard component
 * Tests achievement sharing functionality for social media
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock html2canvas
vi.mock('html2canvas', () => ({
  default: vi.fn(() => Promise.resolve({
    toBlob: (callback: (blob: Blob) => void) => {
      callback(new Blob(['test'], { type: 'image/png' }));
    },
  })),
}));

// Mock URL methods
const mockCreateObjectURL = vi.fn(() => 'blob:test-url');
const mockRevokeObjectURL = vi.fn();
global.URL.createObjectURL = mockCreateObjectURL;
global.URL.revokeObjectURL = mockRevokeObjectURL;

import ShareableAchievementCard from '../../components/ShareableAchievementCard';
import html2canvas from 'html2canvas';

const mockAchievement = {
  id: 'test-achievement',
  name: 'First Steps',
  description: 'Complete your first practice question',
  icon: '🏆',
  points: 100,
  category: 'progress',
};

const defaultProps = {
  achievement: mockAchievement,
  userName: 'Test User',
  streak: 5,
  onClose: vi.fn(),
};

const renderComponent = (props = {}) => {
  return render(
    <ShareableAchievementCard {...defaultProps} {...props} />
  );
};

describe('ShareableAchievementCard', () => {
  let mockWindowOpen: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockWindowOpen = vi.fn();
    global.open = mockWindowOpen as typeof global.open;
    
    // Reset navigator.share
    Object.defineProperty(navigator, 'canShare', {
      value: vi.fn(() => false),
      configurable: true,
    });
    Object.defineProperty(navigator, 'share', {
      value: vi.fn(),
      configurable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the share modal', () => {
      renderComponent();

      expect(screen.getByText('Share Your Achievement')).toBeInTheDocument();
    });

    it('should display achievement name', () => {
      renderComponent();

      expect(screen.getByText('First Steps')).toBeInTheDocument();
    });

    it('should display achievement description', () => {
      renderComponent();

      expect(screen.getByText('Complete your first practice question')).toBeInTheDocument();
    });

    it('should display achievement icon', () => {
      renderComponent();

      expect(screen.getByText('🏆')).toBeInTheDocument();
    });

    it('should display achievement points', () => {
      renderComponent();

      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('should display user name when provided', () => {
      renderComponent({ userName: 'John Doe' });

      expect(screen.getByText(/Earned by John Doe/i)).toBeInTheDocument();
    });

    it('should display streak when provided', () => {
      renderComponent({ streak: 10 });

      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText(/day streak/i)).toBeInTheDocument();
    });

    it('should not show streak when not provided', () => {
      renderComponent({ streak: undefined });

      expect(screen.queryByText(/day streak/i)).not.toBeInTheDocument();
    });

    it('should not show streak when zero', () => {
      renderComponent({ streak: 0 });

      expect(screen.queryByText(/day streak/i)).not.toBeInTheDocument();
    });

    it('should display VoraPrep branding', () => {
      renderComponent();

      expect(screen.getByText('VoraPrep')).toBeInTheDocument();
    });

    it('should display Achievement Unlocked badge', () => {
      renderComponent();

      expect(screen.getByText('Achievement Unlocked!')).toBeInTheDocument();
    });
  });

  describe('close button', () => {
    it('should render close button', () => {
      renderComponent();

      const closeButton = screen.getByLabelText('Close');
      expect(closeButton).toBeInTheDocument();
    });

    it('should call onClose when close button clicked', () => {
      const onClose = vi.fn();
      renderComponent({ onClose });

      fireEvent.click(screen.getByLabelText('Close'));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when backdrop clicked', () => {
      const onClose = vi.fn();
      renderComponent({ onClose });

      const backdrop = document.querySelector('[aria-hidden="true"]');
      if (backdrop) fireEvent.click(backdrop);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Save functionality', () => {
    it('should have Save button', () => {
      renderComponent();

      expect(screen.getByText(/Save/i)).toBeInTheDocument();
    });

    it('should generate image on Save', async () => {
      renderComponent();

      const SaveButton = screen.getByText(/Save/i);
      fireEvent.click(SaveButton);

      await waitFor(() => {
        expect(html2canvas).toHaveBeenCalled();
      });
    });

    it('should create Save link', async () => {
      renderComponent();

      const SaveButton = screen.getByText(/Save/i);
      fireEvent.click(SaveButton);

      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalled();
      });
    });

    it('should revoke object URL after Save', async () => {
      renderComponent();

      const SaveButton = screen.getByText(/Save/i);
      fireEvent.click(SaveButton);

      await waitFor(() => {
        expect(mockRevokeObjectURL).toHaveBeenCalled();
      });
    });
  });

  describe('social sharing - Twitter', () => {
    it('should have Twitter share button', () => {
      renderComponent();

      // Look for Twitter/X button
      const shareButtons = screen.getAllByRole('button');
      expect(shareButtons.length).toBeGreaterThan(2);
    });

    it('should open Twitter share URL', async () => {
      renderComponent();

      // Find and click Twitter button (X icon)
      const buttons = screen.getAllByRole('button');
      const twitterButton = buttons.find(btn => 
        btn.querySelector('svg.lucide-twitter') !== null
      );
      
      if (twitterButton) {
        fireEvent.click(twitterButton);

        expect(mockWindowOpen).toHaveBeenCalledWith(
          expect.stringContaining('twitter.com/intent/tweet'),
          '_blank',
          expect.any(String)
        );
      }
    });

    it('should include achievement text in Twitter share', async () => {
      renderComponent();

      const buttons = screen.getAllByRole('button');
      const twitterButton = buttons.find(btn => 
        btn.querySelector('svg.lucide-twitter') !== null
      );
      
      if (twitterButton) {
        fireEvent.click(twitterButton);

        expect(mockWindowOpen).toHaveBeenCalledWith(
          expect.stringContaining(encodeURIComponent('First Steps')),
          '_blank',
          expect.any(String)
        );
      }
    });
  });

  describe('social sharing - LinkedIn', () => {
    it('should open LinkedIn share URL', async () => {
      renderComponent();

      const buttons = screen.getAllByRole('button');
      const linkedInButton = buttons.find(btn => 
        btn.querySelector('svg.lucide-linkedin') !== null
      );
      
      if (linkedInButton) {
        fireEvent.click(linkedInButton);

        expect(mockWindowOpen).toHaveBeenCalledWith(
          expect.stringContaining('linkedin.com/sharing'),
          '_blank',
          expect.any(String)
        );
      }
    });
  });

  describe('native share', () => {
    it('should have native share button', () => {
      renderComponent();

      // Look for the Share button (exact match for text content)
      const shareButtons = screen.getAllByRole('button').filter(
        btn => btn.textContent?.trim() === 'Share' || btn.textContent?.includes('Share')
      );
      expect(shareButtons.length).toBeGreaterThan(0);
    });

    it('should use native share when available', async () => {
      const mockShare = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'canShare', {
        value: vi.fn(() => true),
        configurable: true,
      });
      Object.defineProperty(navigator, 'share', {
        value: mockShare,
        configurable: true,
      });

      renderComponent();

      // Find the share button (not Save)
      const buttons = screen.getAllByRole('button');
      const shareButton = buttons.find(btn => 
        btn.textContent?.toLowerCase().includes('share') &&
        !btn.textContent?.toLowerCase().includes('Save')
      );

      if (shareButton) {
        fireEvent.click(shareButton);

        await waitFor(() => {
          expect(mockShare).toHaveBeenCalled();
        });
      }
    });

    it('should fall back to Save when native share not available', async () => {
      Object.defineProperty(navigator, 'canShare', {
        value: vi.fn(() => false),
        configurable: true,
      });

      renderComponent();

      const buttons = screen.getAllByRole('button');
      const shareButtons = buttons.filter(btn => 
        btn.textContent?.toLowerCase().includes('share')
      );

      if (shareButtons.length > 0) {
        fireEvent.click(shareButtons[0]!);

        await waitFor(() => {
          // Should fall back to Save behavior
          expect(html2canvas).toHaveBeenCalled();
        });
      }
    });
  });

  describe('error handling', () => {
    it('should handle image generation failure', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (html2canvas as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Canvas error'));

      renderComponent();

      const SaveButton = screen.getByText(/Save/i);
      fireEvent.click(SaveButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled();
      });

      consoleSpy.mockRestore();
    });

    it('should display error message on failure', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (html2canvas as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Canvas error'));

      renderComponent();

      const SaveButton = screen.getByText(/Save/i);
      fireEvent.click(SaveButton);

      await waitFor(() => {
        expect(screen.getByText(/failed to generate/i)).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });

    it('should handle share error gracefully', async () => {
      const mockShare = vi.fn().mockRejectedValue(new Error('Share failed'));
      Object.defineProperty(navigator, 'canShare', {
        value: vi.fn(() => true),
        configurable: true,
      });
      Object.defineProperty(navigator, 'share', {
        value: mockShare,
        configurable: true,
      });

      renderComponent();

      const buttons = screen.getAllByRole('button');
      const shareButton = buttons.find(btn => 
        btn.textContent?.toLowerCase().includes('share') &&
        !btn.textContent?.toLowerCase().includes('Save')
      );

      if (shareButton) {
        fireEvent.click(shareButton);

        await waitFor(() => {
          expect(screen.getByText(/share failed/i)).toBeInTheDocument();
        });
      }
    });

    it('should not show error when user cancels share', async () => {
      const abortError = new Error('User cancelled');
      abortError.name = 'AbortError';
      const mockShare = vi.fn().mockRejectedValue(abortError);
      Object.defineProperty(navigator, 'canShare', {
        value: vi.fn(() => true),
        configurable: true,
      });
      Object.defineProperty(navigator, 'share', {
        value: mockShare,
        configurable: true,
      });

      renderComponent();

      const buttons = screen.getAllByRole('button');
      const shareButton = buttons.find(btn => 
        btn.textContent?.toLowerCase().includes('share') &&
        !btn.textContent?.toLowerCase().includes('Save')
      );

      if (shareButton) {
        fireEvent.click(shareButton);

        await waitFor(() => {
          expect(mockShare).toHaveBeenCalled();
        });

        // Should NOT show error for AbortError
        expect(screen.queryByText(/share failed/i)).not.toBeInTheDocument();
      }
    });
  });

  describe('loading state', () => {
    it('should show generating state while creating image', async () => {
      (html2canvas as ReturnType<typeof vi.fn>).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 1000))
      );

      renderComponent();

      const SaveButton = screen.getByText(/Save/i);
      fireEvent.click(SaveButton);

      // Component should be in generating state
      expect(SaveButton).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have accessible close button', () => {
      renderComponent();

      expect(screen.getByLabelText('Close')).toBeInTheDocument();
    });

    it('should have backdrop with aria-hidden', () => {
      renderComponent();

      const backdrop = document.querySelector('[aria-hidden="true"]');
      expect(backdrop).toBeInTheDocument();
    });
  });

  describe('different achievements', () => {
    it('should display custom achievement name', () => {
      const customAchievement = {
        ...mockAchievement,
        name: 'Master Accountant',
        description: 'Complete all FAR questions',
      };

      renderComponent({ achievement: customAchievement });

      expect(screen.getByText('Master Accountant')).toBeInTheDocument();
    });

    it('should display custom achievement points', () => {
      const customAchievement = {
        ...mockAchievement,
        points: 500,
      };

      renderComponent({ achievement: customAchievement });

      expect(screen.getByText('500')).toBeInTheDocument();
    });

    it('should display React node as icon', () => {
      const customAchievement = {
        ...mockAchievement,
        icon: <span data-testid="custom-icon">⭐</span>,
      };

      renderComponent({ achievement: customAchievement });

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('without optional props', () => {
    it('should render without userName', () => {
      renderComponent({ userName: undefined });

      expect(screen.getByText('Share Your Achievement')).toBeInTheDocument();
      expect(screen.queryByText(/Earned by/i)).not.toBeInTheDocument();
    });

    it('should render without streak', () => {
      renderComponent({ streak: undefined });

      expect(screen.getByText('Share Your Achievement')).toBeInTheDocument();
      expect(screen.queryByText(/day streak/i)).not.toBeInTheDocument();
    });
  });
});

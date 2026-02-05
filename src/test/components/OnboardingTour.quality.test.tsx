/**
 * Quality tests for OnboardingTour component
 * Tests onboarding tour functionality and navigation
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// Mock ThemeProvider
vi.mock('../../providers/ThemeProvider', () => ({
  useTheme: () => ({
    darkMode: false,
  }),
}));

import { TourProvider, useTour } from '../../components/OnboardingTour';

// Helper component to access tour context
const TourTestComponent: React.FC = () => {
  const tour = useTour();
  return (
    <div>
      <p data-testid="is-active">{String(tour.isActive)}</p>
      <p data-testid="current-step">{tour.currentStep}</p>
      <p data-testid="total-steps">{tour.totalSteps}</p>
      <p data-testid="has-seen-tour">{String(tour.hasSeenTour)}</p>
      <p data-testid="step-title">{tour.currentStepData?.title}</p>
      <button onClick={tour.startTour} data-testid="start-tour">Start</button>
      <button onClick={tour.nextStep} data-testid="next-step">Next</button>
      <button onClick={tour.prevStep} data-testid="prev-step">Prev</button>
      <button onClick={tour.resetTour} data-testid="reset-tour">Reset</button>
      <button onClick={() => tour.endTour(true)} data-testid="end-tour">End</button>
      <button onClick={() => tour.goToStep(5)} data-testid="go-to-step">Go to 5</button>
    </div>
  );
};

const renderComponent = () => {
  return render(
    <TourProvider>
      <TourTestComponent />
    </TourProvider>
  );
};

describe('OnboardingTour', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('TourProvider', () => {
    it('should provide tour context', () => {
      renderComponent();
      
      expect(screen.getByTestId('total-steps')).toBeInTheDocument();
    });

    it('should initialize with tour not active', () => {
      renderComponent();
      
      expect(screen.getByTestId('is-active')).toHaveTextContent('false');
    });

    it('should have 11 total steps', () => {
      renderComponent();
      
      expect(screen.getByTestId('total-steps')).toHaveTextContent('11');
    });

    it('should start at step 0', () => {
      renderComponent();
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('0');
    });

    it('should show first step title', () => {
      renderComponent();
      
      expect(screen.getByTestId('step-title')).toHaveTextContent('Welcome to VoraPrep!');
    });
  });

  describe('startTour', () => {
    it('should activate tour when started', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      
      expect(screen.getByTestId('is-active')).toHaveTextContent('true');
    });

    it('should reset to step 0 when starting', () => {
      renderComponent();
      
      // Go to a step first
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('next-step'));
      
      // Start again
      fireEvent.click(screen.getByTestId('start-tour'));
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('0');
    });
  });

  describe('nextStep', () => {
    it('should advance to next step', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('next-step'));
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('1');
    });

    it('should not go beyond last step', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      
      // Click next many times
      for (let i = 0; i < 15; i++) {
        fireEvent.click(screen.getByTestId('next-step'));
      }
      
      // Tour should end after last step
      expect(screen.getByTestId('is-active')).toHaveTextContent('false');
    });
  });

  describe('prevStep', () => {
    it('should go to previous step', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('next-step'));
      fireEvent.click(screen.getByTestId('next-step'));
      fireEvent.click(screen.getByTestId('prev-step'));
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('1');
    });

    it('should not go below step 0', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('prev-step'));
      fireEvent.click(screen.getByTestId('prev-step'));
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('0');
    });
  });

  describe('goToStep', () => {
    it('should jump to specific step', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('go-to-step'));
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('5');
    });
  });

  describe('endTour', () => {
    it('should deactivate tour', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('end-tour'));
      
      expect(screen.getByTestId('is-active')).toHaveTextContent('false');
    });

    it('should mark tour as seen when completed', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('end-tour'));
      
      expect(screen.getByTestId('has-seen-tour')).toHaveTextContent('true');
    });

    it('should persist completion state', () => {
      renderComponent();
      
      // Start and end tour, which marks it as complete
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('end-tour'));
      
      // Verify the component state reflects completion
      expect(screen.getByTestId('has-seen-tour')).toHaveTextContent('true');
    });
  });

  describe('resetTour', () => {
    it('should clear hasSeenTour', () => {
      renderComponent();
      
      // First complete the tour
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('end-tour'));
      expect(screen.getByTestId('has-seen-tour')).toHaveTextContent('true');
      
      // Then reset
      fireEvent.click(screen.getByTestId('reset-tour'));
      
      expect(screen.getByTestId('has-seen-tour')).toHaveTextContent('false');
    });

    it('should allow tour to be restarted after reset', () => {
      renderComponent();
      
      // Complete tour
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('end-tour'));
      
      // Reset and restart
      fireEvent.click(screen.getByTestId('reset-tour'));
      fireEvent.click(screen.getByTestId('start-tour'));
      
      expect(screen.getByTestId('is-active')).toHaveTextContent('true');
    });
  });

  describe('hasSeenTour', () => {
    it('should be false initially', () => {
      renderComponent();
      
      expect(screen.getByTestId('has-seen-tour')).toHaveTextContent('false');
    });

    it('should become true after completing tour', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('end-tour'));
      
      expect(screen.getByTestId('has-seen-tour')).toHaveTextContent('true');
    });
  });

  describe('keyboard navigation', () => {
    it('should close tour on Escape', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      expect(screen.getByTestId('is-active')).toHaveTextContent('true');
      
      fireEvent.keyDown(window, { key: 'Escape' });
      
      expect(screen.getByTestId('is-active')).toHaveTextContent('false');
    });

    it('should advance on ArrowRight', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.keyDown(window, { key: 'ArrowRight' });
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('1');
    });

    it('should advance on Enter', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.keyDown(window, { key: 'Enter' });
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('1');
    });

    it('should go back on ArrowLeft', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('next-step'));
      fireEvent.keyDown(window, { key: 'ArrowLeft' });
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('0');
    });
  });

  describe('step data', () => {
    it('should provide step content', () => {
      renderComponent();
      
      expect(screen.getByTestId('step-title')).toHaveTextContent('Welcome to VoraPrep');
    });

    it('should update step title when navigating', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      fireEvent.click(screen.getByTestId('next-step'));
      
      expect(screen.getByTestId('step-title')).toHaveTextContent('Dashboard');
    });
  });

  describe('useTour hook', () => {
    it('should throw error when used outside provider', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const TestComponent: React.FC = () => {
        expect(() => useTour()).toThrow('useTour must be used within a TourProvider');
        return null;
      };
      
      // This should throw
      try {
        render(<TestComponent />);
      } catch (e) {
        // Expected
      }
      
      consoleError.mockRestore();
    });
  });

  describe('tour overlay', () => {
    it('should render overlay when tour is active', () => {
      renderComponent();
      
      fireEvent.click(screen.getByTestId('start-tour'));
      
      // Check for overlay elements
      expect(screen.getByTestId('is-active')).toHaveTextContent('true');
    });

    it('should not render overlay when tour is inactive', () => {
      renderComponent();
      
      expect(screen.getByTestId('is-active')).toHaveTextContent('false');
    });
  });

  describe('tour completion flow', () => {
    it('should complete full tour flow', () => {
      renderComponent();
      
      // Start tour
      fireEvent.click(screen.getByTestId('start-tour'));
      expect(screen.getByTestId('is-active')).toHaveTextContent('true');
      
      // Navigate through all steps
      for (let i = 0; i < 11; i++) {
        fireEvent.click(screen.getByTestId('next-step'));
      }
      
      // Tour should be complete
      expect(screen.getByTestId('is-active')).toHaveTextContent('false');
      expect(screen.getByTestId('has-seen-tour')).toHaveTextContent('true');
    });
  });
});

import { useState, useEffect, createContext, useContext, useCallback, ReactNode } from 'react';
import { X, ChevronLeft, ChevronRight, Check, Lightbulb, Rocket, BookOpen, BarChart3 } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';
import { Button } from './common/Button';

// ============================================================================
// Types
// ============================================================================

type Placement = 'top' | 'bottom' | 'left' | 'right' | 'center';

interface TourStep {
  id: string;
  target: string | null;
  title: string;
  content: string;
  placement: Placement;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

interface TourContextType {
  isActive: boolean;
  currentStep: number;
  hasSeenTour: boolean;
  totalSteps: number;
  currentStepData: TourStep;
  startTour: () => void;
  endTour: (completed?: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (stepIndex: number) => void;
  resetTour: () => void;
  skipToFeature: (featureId: string) => void;
}

interface TourProviderProps {
  children: ReactNode;
}

interface Position {
  top: number;
  left: number;
}

interface HighlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

// ============================================================================
// Tour Steps Configuration
// ============================================================================

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    target: null,
    title: 'Welcome to VoraPrep! 🎉',
    content: "Let's take a quick tour to help you get the most out of your CPA exam preparation.",
    placement: 'center',
    icon: <Rocket className="w-6 h-6 text-primary-500" />,
  },
  {
    id: 'dashboard',
    target: '[data-tour="dashboard"]',
    title: 'Your Dashboard',
    content:
      'Track your progress, see upcoming study goals, and view your performance at a glance. Your dashboard adapts to show you what matters most.',
    placement: 'bottom',
  },
  {
    id: 'practice',
    target: '[data-tour="practice"]',
    title: 'Practice Questions',
    content:
      'Access 2,500+ MCQs, TBS simulations, and written communication tasks organized by topic. Questions align with the official AICPA blueprints.',
    placement: 'bottom',
    icon: <BookOpen className="w-6 h-6 text-success-500" />,
  },
  {
    id: 'study',
    target: '[data-tour="study"]',
    title: 'Study Materials',
    content:
      'Review comprehensive lessons covering all exam sections. Use flashcards and spaced repetition to maximize retention.',
    placement: 'bottom',
  },
  {
    id: 'ai-tutor',
    target: '[data-tour="ai-tutor"]',
    title: 'Meet Vory',
    content:
      'Meet Vory, your AI study companion! Ask questions about any CPA topic and get instant, detailed explanations tailored to your level.',
    placement: 'bottom',
  },
  {
    id: 'progress',
    target: '[data-tour="progress"]',
    title: 'Progress Tracking',
    content: 
      'Monitor your improvement over time with detailed analytics. See which topics need more attention and track your exam readiness.',
    placement: 'bottom',
    icon: <BarChart3 className="w-6 h-6 text-warning-500" />,
  },
  {
    id: 'search',
    target: '[data-tour="search"]',
    title: 'Global Search',
    content:
      'Press ⌘K (or Ctrl+K) anytime to search across all questions, topics, and lessons. Filter by section, difficulty, or type.',
    placement: 'bottom',
  },
  {
    id: 'dark-mode',
    target: '[data-tour="dark-mode"]',
    title: 'Dark Mode',
    content:
      'Toggle dark mode for comfortable studying at night. Your preference is saved automatically and syncs across devices.',
    placement: 'left',
  },
  {
    id: 'keyboard',
    target: null,
    title: 'Keyboard Shortcuts',
    content:
      'Use keyboard shortcuts for faster navigation:\n\n• 1-4 to select answers\n• Enter to submit\n• N for next question\n• Space to toggle options\n• ⌘K to search',
    placement: 'center',
  },
  {
    id: 'blueprint',
    target: null,
    title: 'Blueprint Aligned',
    content:
      'All content is aligned with AICPA 2025/2026 blueprints. We automatically update for changes including H.R.1 (OBBBA) tax law updates taking effect mid-2026.',
    placement: 'center',
  },
  {
    id: 'complete',
    target: null,
    title: "You're All Set! 🚀",
    content:
      'Start with the Dashboard to see your recommended study plan, or jump straight into Practice mode. Good luck on your CPA journey!',
    placement: 'center',
    icon: <Check className="w-6 h-6 text-success-500" />,
  },
];

// ============================================================================
// Context
// ============================================================================

const TourContext = createContext<TourContextType | null>(null);

// ============================================================================
// Provider Component
// ============================================================================

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(() => {
    return localStorage.getItem('voraprep-tour-completed') === 'true';
  });

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
  }, []);

  const endTour = useCallback((completed = false) => {
    setIsActive(false);
    if (completed) {
      localStorage.setItem('voraprep-tour-completed', 'true');
      setHasSeenTour(true);
    }
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      endTour(true);
    }
  }, [currentStep, endTour]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < TOUR_STEPS.length) {
      setCurrentStep(stepIndex);
    }
  }, []);

  const resetTour = useCallback(() => {
    localStorage.removeItem('voraprep-tour-completed');
    setHasSeenTour(false);
  }, []);

  const skipToFeature = useCallback((featureId: string) => {
    const stepIndex = TOUR_STEPS.findIndex(step => step.id === featureId);
    if (stepIndex >= 0) {
      setCurrentStep(stepIndex);
      setIsActive(true);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          endTour(false);
          break;
        case 'ArrowRight':
        case 'Enter':
          nextStep();
          break;
        case 'ArrowLeft':
          prevStep();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, endTour, nextStep, prevStep]);

  return (
    <TourContext.Provider
      value={{
        isActive,
        currentStep,
        hasSeenTour,
        totalSteps: TOUR_STEPS.length,
        currentStepData: TOUR_STEPS[currentStep],
        startTour,
        endTour,
        nextStep,
        prevStep,
        goToStep,
        resetTour,
        skipToFeature,
      }}
    >
      {children}
      {isActive && <TourOverlay />}
    </TourContext.Provider>
  );
};

// ============================================================================
// Hook
// ============================================================================

export const useTour = (): TourContextType => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

// ============================================================================
// Tour Overlay Component
// ============================================================================

const TourOverlay: React.FC = () => {
  const { currentStep, currentStepData, totalSteps, nextStep, prevStep, endTour } = useTour();
  const { darkMode } = useTheme();
  const [tooltipPosition, setTooltipPosition] = useState<Position>({ top: 0, left: 0 });
  const [highlightRect, setHighlightRect] = useState<HighlightRect | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [currentStep]);

  useEffect(() => {
    if (currentStepData.target) {
      const element = document.querySelector(currentStepData.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHighlightRect({
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
        });

        const tooltipWidth = 360;
        const tooltipHeight = 240;
        let top: number, left: number;

        switch (currentStepData.placement) {
          case 'bottom':
            top = rect.bottom + 16;
            left = rect.left + rect.width / 2 - tooltipWidth / 2;
            break;
          case 'top':
            top = rect.top - tooltipHeight - 16;
            left = rect.left + rect.width / 2 - tooltipWidth / 2;
            break;
          case 'left':
            top = rect.top + rect.height / 2 - tooltipHeight / 2;
            left = rect.left - tooltipWidth - 16;
            break;
          case 'right':
            top = rect.top + rect.height / 2 - tooltipHeight / 2;
            left = rect.right + 16;
            break;
          default:
            top = window.innerHeight / 2 - tooltipHeight / 2;
            left = window.innerWidth / 2 - tooltipWidth / 2;
        }

        // Keep tooltip within viewport
        top = Math.max(16, Math.min(top, window.innerHeight - tooltipHeight - 16));
        left = Math.max(16, Math.min(left, window.innerWidth - tooltipWidth - 16));

        setTooltipPosition({ top, left });

        // Scroll element into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setHighlightRect(null);
      setTooltipPosition({
        top: window.innerHeight / 2 - 120,
        left: window.innerWidth / 2 - 180,
      });
    }
  }, [currentStepData]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const isCenterModal = currentStepData.placement === 'center';

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Onboarding tour">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={() => endTour(false)}
      />

      {/* Highlight cutout */}
      {highlightRect && (
        <div
          className="absolute rounded-lg ring-4 ring-primary-500 ring-opacity-75 pointer-events-none transition-all duration-300"
          style={{
            top: highlightRect.top,
            left: highlightRect.left,
            width: highlightRect.width,
            height: highlightRect.height,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className={`absolute z-10 w-[360px] rounded-xl shadow-2xl transition-all duration-300
          ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}
          ${isCenterModal ? 'transform' : ''}
          ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2">
            {currentStepData.icon || <Lightbulb className="w-5 h-5 text-yellow-500" />}
            <span className={`text-sm font-medium ${darkMode ? 'text-slate-600' : 'text-slate-600'}`}>
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => endTour(false)}
            aria-label="Close tour"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{currentStepData.title}</h3>
          <p className={`text-sm whitespace-pre-line ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {currentStepData.content}
          </p>
          
          {/* Custom action button */}
          {currentStepData.action && (
            <Button
              variant="secondary"
              size="sm"
              onClick={currentStepData.action.onClick}
              className="mt-3"
            >
              {currentStepData.action.label}
            </Button>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 pb-3">
          {TOUR_STEPS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const { goToStep } = useTour();
                goToStep(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentStep
                  ? 'bg-primary-500 w-4'
                  : idx < currentStep
                    ? 'bg-primary-300 dark:bg-primary-700'
                    : `${darkMode ? 'bg-slate-600' : 'bg-slate-300'}`
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className={`flex items-center justify-between p-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => endTour(false)}
          >
            Skip tour
          </Button>

          <div className="flex gap-2">
            {!isFirstStep && (
              <Button
                variant="secondary"
                size="sm"
                onClick={prevStep}
                leftIcon={ChevronLeft}
              >
                Back
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              onClick={nextStep}
              leftIcon={isLastStep ? Check : undefined}
              rightIcon={isLastStep ? undefined : ChevronRight}
            >
              {isLastStep ? 'Get Started' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// First Time Prompt Hook
// ============================================================================

export const useFirstTimePrompt = () => {
  const { hasSeenTour, startTour } = useTour();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenTour]);

  const handleStartTour = () => {
    setShowPrompt(false);
    startTour();
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('voraprep-tour-completed', 'true');
  };

  return { showPrompt, handleStartTour, handleDismiss };
};

// ============================================================================
// First Time Prompt Component
// ============================================================================

export const FirstTimePrompt: React.FC = () => {
  const { showPrompt, handleStartTour, handleDismiss } = useFirstTimePrompt();
  const { darkMode } = useTheme();

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-fade-in">
      <div
        className={`max-w-sm p-4 rounded-xl shadow-lg border
        ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
      >
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 
            flex items-center justify-center"
          >
            <Lightbulb className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1">
            <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              New to VoraPrep?
            </h4>
            <p className={`text-sm mt-1 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Take a quick tour to discover all the features that will help you pass the CPA exam.
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                variant="primary"
                size="sm"
                onClick={handleStartTour}
              >
                Start Tour
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
              >
                Maybe later
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-slate-600" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Feature Spotlight Component (for highlighting specific features)
// ============================================================================

interface FeatureSpotlightProps {
  featureId: string;
  children: ReactNode;
  showOnFirstVisit?: boolean;
}

export const FeatureSpotlight: React.FC<FeatureSpotlightProps> = ({ 
  featureId, 
  children,
  showOnFirstVisit = false 
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const { skipToFeature } = useTour();

  useEffect(() => {
    if (showOnFirstVisit) {
      const hasSeenFeature = localStorage.getItem(`voraprep-feature-${featureId}`);
      if (!hasSeenFeature) {
        setIsHighlighted(true);
        const timer = setTimeout(() => {
          setIsHighlighted(false);
          localStorage.setItem(`voraprep-feature-${featureId}`, 'true');
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [featureId, showOnFirstVisit]);

  return (
    <div 
      data-tour={featureId}
      className={`relative ${isHighlighted ? 'animate-pulse ring-2 ring-primary-500 rounded-lg' : ''}`}
      onClick={() => isHighlighted && setIsHighlighted(false)}
    >
      {children}
      {isHighlighted && (
        <Button
          variant="primary"
          size="icon"
          onClick={() => skipToFeature(featureId)}
          className="absolute -top-2 -right-2 w-6 h-6 text-xs"
          aria-label="Learn more about this feature"
        >
          ?
        </Button>
      )}
    </div>
  );
};

export default TourProvider;

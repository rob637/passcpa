import { useState, useEffect, createContext, useContext } from 'react';
import { X, ChevronLeft, ChevronRight, Check, Lightbulb } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';

// Tour context for managing tour state
const TourContext = createContext(null);

/**
 * OnboardingTour - Interactive guided tour for new users
 * Shows step-by-step tooltips highlighting key features
 */

// Tour steps configuration
const TOUR_STEPS = [
  {
    id: 'welcome',
    target: null, // Full-screen welcome
    title: 'Welcome to PassCPA! 🎉',
    content: "Let's take a quick tour to help you get the most out of your CPA exam preparation.",
    placement: 'center',
  },
  {
    id: 'dashboard',
    target: '[data-tour="dashboard"]',
    title: 'Your Dashboard',
    content:
      'Track your progress, see upcoming study goals, and view your performance at a glance.',
    placement: 'bottom',
  },
  {
    id: 'practice',
    target: '[data-tour="practice"]',
    title: 'Practice Questions',
    content:
      'Access thousands of MCQs, TBS simulations, and written communication tasks organized by topic.',
    placement: 'bottom',
  },
  {
    id: 'study',
    target: '[data-tour="study"]',
    title: 'Study Materials',
    content:
      'Review comprehensive lessons, use flashcards, and take timed quizzes to reinforce your knowledge.',
    placement: 'bottom',
  },
  {
    id: 'ai-tutor',
    target: '[data-tour="ai-tutor"]',
    title: 'AI Tutor',
    content:
      'Get personalized help from our AI tutor. Ask questions about any CPA topic and get instant explanations.',
    placement: 'bottom',
  },
  {
    id: 'progress',
    target: '[data-tour="progress"]',
    title: 'Progress Tracking',
    content: 'Monitor your improvement over time with detailed analytics and performance insights.',
    placement: 'bottom',
  },
  {
    id: 'dark-mode',
    target: '[data-tour="dark-mode"]',
    title: 'Dark Mode',
    content:
      'Toggle dark mode for comfortable studying at night. Your preference is saved automatically.',
    placement: 'left',
  },
  {
    id: 'keyboard',
    target: null, // Info modal
    title: 'Keyboard Shortcuts',
    content:
      'Use keyboard shortcuts for faster navigation:\n• 1-4 to select answers\n• Enter to submit\n• N for next question\n• Space to toggle options',
    placement: 'center',
  },
  {
    id: 'complete',
    target: null, // Full-screen completion
    title: "You're All Set! 🚀",
    content:
      'Start with the Dashboard to see your recommended study plan, or jump straight into Practice mode.',
    placement: 'center',
  },
];

export const TourProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(() => {
    return localStorage.getItem('passcpa-tour-completed') === 'true';
  });

  const startTour = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  const endTour = (completed = false) => {
    setIsActive(false);
    if (completed) {
      localStorage.setItem('passcpa-tour-completed', 'true');
      setHasSeenTour(true);
    }
  };

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      endTour(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (stepIndex) => {
    if (stepIndex >= 0 && stepIndex < TOUR_STEPS.length) {
      setCurrentStep(stepIndex);
    }
  };

  const resetTour = () => {
    localStorage.removeItem('passcpa-tour-completed');
    setHasSeenTour(false);
  };

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
      }}
    >
      {children}
      {isActive && <TourOverlay />}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

// Tour overlay component
const TourOverlay = () => {
  const { currentStep, currentStepData, totalSteps, nextStep, prevStep, endTour } = useTour();
  const { darkMode } = useTheme();
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [highlightRect, setHighlightRect] = useState(null);

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

        // Calculate tooltip position based on placement
        const tooltipWidth = 320;
        const tooltipHeight = 200;
        let top, left;

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
        top: window.innerHeight / 2 - 100,
        left: window.innerWidth / 2 - 160,
      });
    }
  }, [currentStepData]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const isCenterModal = currentStepData.placement === 'center';

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={() => endTour(false)}
      />

      {/* Highlight cutout */}
      {highlightRect && (
        <div
          className="absolute rounded-lg ring-4 ring-blue-500 ring-opacity-75 pointer-events-none"
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
        className={`absolute z-10 w-80 rounded-xl shadow-2xl transition-all duration-300
          ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
          ${isCenterModal ? 'transform' : ''}`}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <button
            onClick={() => endTour(false)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{currentStepData.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
            {currentStepData.content}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1 pb-2">
          {TOUR_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentStep
                  ? 'bg-blue-500'
                  : idx < currentStep
                    ? 'bg-blue-300'
                    : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => endTour(false)}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Skip tour
          </button>

          <div className="flex gap-2">
            {!isFirstStep && (
              <button
                onClick={prevStep}
                className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg
                  bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}

            <button
              onClick={nextStep}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg
                bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              {isLastStep ? (
                <>
                  <Check className="w-4 h-4" />
                  Finish
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hook to prompt first-time users
export const useFirstTimePrompt = () => {
  const { hasSeenTour, startTour } = useTour();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Show prompt after a short delay for first-time users
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
    localStorage.setItem('passcpa-tour-completed', 'true');
  };

  return { showPrompt, handleStartTour, handleDismiss };
};

// First-time user prompt component
export const FirstTimePrompt = () => {
  const { showPrompt, handleStartTour, handleDismiss } = useFirstTimePrompt();
  const { darkMode } = useTheme();

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-fade-in">
      <div
        className={`max-w-sm p-4 rounded-xl shadow-lg border
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 
            flex items-center justify-center"
          >
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              New to PassCPA?
            </h4>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Take a quick tour to discover all the features that will help you pass the CPA exam.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleStartTour}
                className="px-3 py-1.5 text-sm font-medium rounded-lg
                  bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Start Tour
              </button>
              <button
                onClick={handleDismiss}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors
                  ${
                    darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                Maybe later
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className={`p-1 rounded-full transition-colors
              ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourProvider;

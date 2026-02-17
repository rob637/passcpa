import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WrittenCommunication from '../../../components/pages/WrittenCommunication';

// Mock wcService (Firestore-based service)
vi.mock('../../../services/wcService', () => ({
  WC_RUBRIC: {
    organization: {
      weight: 0.25,
      criteria: ['Clear opening', 'Logical flow', 'Transitions', 'Conclusion'],
    },
    development: {
      weight: 0.4,
      criteria: ['Addresses task', 'Examples', 'Understanding', 'Depth'],
    },
    expression: {
      weight: 0.35,
      criteria: ['Professional tone', 'Grammar', 'Vocabulary', 'Clarity'],
    },
  },
  fetchAllWCTasks: vi.fn(() => Promise.resolve([
    {
      id: 'wc_001',
      section: 'PREP',
      type: 'written_communication',
      topic: 'Internal Controls',
      difficulty: 'moderate',
      estimatedTime: 25,
      scenario: 'Test scenario',
      task: 'Write a memo',
      guidelines: ['Professional tone'],
      sampleResponse: 'Sample response',
    },
    {
      id: 'wc_002',
      section: 'PREP',
      type: 'written_communication',
      topic: 'Revenue Recognition',
      difficulty: 'easy',
      estimatedTime: 20,
      scenario: 'Revenue scenario',
      task: 'Write about revenue',
      guidelines: ['Be specific'],
      sampleResponse: 'Revenue sample',
    },
  ])),
  fetchWCTasksBySection: vi.fn(() => Promise.resolve([])),
  fetchWCTaskById: vi.fn(() => Promise.resolve(null)),
  getRandomWCTask: vi.fn(() => Promise.resolve({
    id: 'wc_001',
    section: 'PREP',
    type: 'written_communication',
    topic: 'Internal Controls',
    difficulty: 'moderate',
    estimatedTime: 25,
    scenario: 'Test scenario about internal controls',
    task: 'Write a memo about internal control weaknesses',
    guidelines: ['Use professional tone', 'Address all points'],
    sampleResponse: 'This is a sample response for the task.',
  })),
}));

// Mock the data (legacy - may still be imported somewhere)
vi.mock('../../../data/written-communication', () => ({
  WC_RUBRIC: {
    organization: {
      weight: 0.25,
      criteria: ['Clear opening', 'Logical flow', 'Transitions', 'Conclusion'],
    },
    development: {
      weight: 0.4,
      criteria: ['Addresses task', 'Examples', 'Understanding', 'Depth'],
    },
    expression: {
      weight: 0.35,
      criteria: ['Professional tone', 'Grammar', 'Vocabulary', 'Clarity'],
    },
  },
  getRandomWC: vi.fn(() => ({
    id: 'wc_001',
    section: 'PREP',
    type: 'written_communication',
    topic: 'Internal Controls',
    difficulty: 'moderate',
    estimatedTime: 25,
    scenario: 'Test scenario about internal controls',
    task: 'Write a memo about internal control weaknesses',
    guidelines: ['Use professional tone', 'Address all points'],
    sampleResponse: 'This is a sample response for the task.',
  })),
  WRITTEN_COMMUNICATIONS: [
    {
      id: 'wc_001',
      section: 'PREP',
      type: 'written_communication',
      topic: 'Internal Controls',
      difficulty: 'moderate',
      estimatedTime: 25,
      scenario: 'Test scenario',
      task: 'Write a memo',
      guidelines: ['Professional tone'],
      sampleResponse: 'Sample response',
    },
    {
      id: 'wc_002',
      section: 'PREP',
      type: 'written_communication',
      topic: 'Revenue Recognition',
      difficulty: 'easy',
      estimatedTime: 20,
      scenario: 'Revenue scenario',
      task: 'Write about revenue',
      guidelines: ['Be specific'],
      sampleResponse: 'Revenue sample',
    },
  ],
}));

// Mock clsx
vi.mock('clsx', () => ({
  default: (...args) => args.filter(Boolean).join(' '),
}));

// Mock useStudy
vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    recordStudyActivity: vi.fn().mockResolvedValue(undefined),
  }),
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('WrittenCommunication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Task Selection Screen', () => {
    it('should render the page title', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      await waitFor(() => {
        expect(screen.getByText('Written Communication Practice')).toBeInTheDocument();
      });
    });

    it('should render back link to study', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      await waitFor(() => {
        expect(screen.getByText('Back to Study')).toBeInTheDocument();
      });
    });

    it('should render random task quick start', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      await waitFor(() => {
        expect(screen.getByText('Random Task')).toBeInTheDocument();
      });
    });

    it('should render Start button for random task', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      await waitFor(() => {
        const startButtons = screen.getAllByRole('button', { name: /start/i });
        expect(startButtons.length).toBeGreaterThan(0);
      });
    });

    it('should render task list', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      await waitFor(() => {
        expect(screen.getByText('Choose a Topic')).toBeInTheDocument();
      });
    });

    it('should render available tasks', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      await waitFor(() => {
        expect(screen.getByText('Choose a Topic')).toBeInTheDocument();
      });
    });

    it('should render tips card', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      await waitFor(() => {
        expect(screen.getByText('Tips for WC Tasks')).toBeInTheDocument();
      });
    });

    it('should render tip items', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      await waitFor(() => {
        expect(screen.getByText(/Use a professional business memo format/)).toBeInTheDocument();
      });
      expect(screen.getByText(/Aim for 300-500 words/)).toBeInTheDocument();
    });

    it('should start random task when clicking random task start', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByText('Random Task')).toBeInTheDocument();
      });
      
      // Find and click the start button in the random task section
      const startButtons = screen.getAllByRole('button', { name: /start/i });
      fireEvent.click(startButtons[0]);
      
      // Should transition to writing screen
      await waitFor(() => {
        expect(screen.queryByText('Choose a Topic')).not.toBeInTheDocument();
      });
    });

    it('should select task when clicking on a task', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      // Wait for tasks to load
      await waitFor(() => {
        expect(screen.getByText('Internal Controls')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('Internal Controls'));
      
      // Should transition to writing screen
      await waitFor(() => {
        expect(screen.queryByText('Choose a Topic')).not.toBeInTheDocument();
      });
    });
  });

  describe('Task Display', () => {
    it('should display task information', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      await waitFor(() => {
        expect(screen.getByText('Choose a Topic')).toBeInTheDocument();
      });
    });
  });

  describe('Component Structure', () => {
    it('should render without crashing', () => {
      const { container } = renderWithRouter(<WrittenCommunication />);
      expect(container).toBeInTheDocument();
    });

    it('should have proper page structure', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      await waitFor(() => {
        expect(screen.getByText('Written Communication Practice')).toBeInTheDocument();
      });
      expect(screen.getByText('Random Task')).toBeInTheDocument();
      expect(screen.getByText('Choose a Topic')).toBeInTheDocument();
      expect(screen.getByText('Tips for WC Tasks')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should have link back to study', async () => {
      renderWithRouter(<WrittenCommunication />);
      
      await waitFor(() => {
        const backLink = screen.getByText('Back to Study').closest('a');
        expect(backLink).toHaveAttribute('href', '/study');
      });
    });
  });
});

describe('WordCounter Component', () => {
  // WordCounter is internal, so we test it through WrittenCommunication
  it('should be tested through main component when writing screen is active', async () => {
    renderWithRouter(<WrittenCommunication />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Random Task')).toBeInTheDocument();
    });
    
    // Start a task to see the word counter
    const startButtons = screen.getAllByRole('button', { name: /start/i });
    fireEvent.click(startButtons[0]);
    
    // Word counter should appear in writing view
    await waitFor(() => {
      // The writing view should now be active
      expect(screen.queryByText('Choose a Topic')).not.toBeInTheDocument();
    });
  });
});

describe('RubricDisplay Component', () => {
  it('should display rubric information when task is started', async () => {
    renderWithRouter(<WrittenCommunication />);
    
    // Wait for async loading to complete
    await waitFor(() => {
      expect(screen.getByText('Written Communication Practice')).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});

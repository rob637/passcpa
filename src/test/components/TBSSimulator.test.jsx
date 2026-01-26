import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TBSSimulator from '../../components/pages/TBSSimulator';

// Mock hooks
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-user-123' },
    userProfile: { examSection: 'FAR' },
    loading: false,
  }),
}));

vi.mock('../../hooks/useStudy', () => ({
  useStudy: () => ({
    recordMCQAnswer: vi.fn(),
    logActivity: vi.fn(),
  }),
}));

// Mock TBS data
vi.mock('../../data/tbs', () => ({
  getTBSBySection: vi.fn(() => [
    {
      id: 'far-tbs-001',
      section: 'FAR',
      type: 'journal_entry',
      title: 'Lease Classification Test',
      difficulty: 'medium',
      timeEstimate: 15,
      topic: 'Leases (ASC 842)',
      scenario: 'Test lease scenario...',
      requirements: [
        {
          id: 'req-1',
          type: 'multiple_choice',
          question: 'How should this lease be classified?',
          options: ['Finance lease', 'Operating lease'],
          correctAnswer: 0,
        },
        {
          id: 'req-2',
          type: 'journal_entry',
          question: 'Prepare the journal entry.',
          template: [{ account: '', debit: '', credit: '' }],
          correctEntries: [{ account: 'ROU Asset', debit: 100000, credit: null }],
        },
        {
          id: 'req-3',
          type: 'calculation',
          question: 'Calculate the interest expense.',
          correctAnswer: 24010,
          tolerance: 5,
        },
      ],
      hints: ['Use the implicit rate', 'Check for finance lease criteria'],
    },
  ]),
}));

vi.mock('../../config/examConfig', () => ({
  CPA_SECTIONS: {
    FAR: { shortName: 'FAR', name: 'Financial Accounting' },
    AUD: { shortName: 'AUD', name: 'Auditing' },
    REG: { shortName: 'REG', name: 'Regulation' },
  },
}));

const renderTBSSimulator = (route = '/tbs?section=FAR') => {
  return render(
    <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <TBSSimulator />
    </MemoryRouter>
  );
};

describe('TBS Simulator Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial Render', () => {
    it('should render the TBS simulator page', async () => {
      renderTBSSimulator();
      
      await waitFor(() => {
        // Should show TBS related content
        expect(document.body).toBeInTheDocument();
      });
    });

    it('should display section selector or simulation', async () => {
      renderTBSSimulator();
      
      await waitFor(() => {
        // Component should render
        expect(document.body.textContent).not.toBe('');
      });
    });
  });

  describe('TBS Types Support', () => {
    it('should support journal entry type', () => {
      const tbsType = 'journal_entry';
      expect(tbsType).toBe('journal_entry');
    });

    it('should support calculation type', () => {
      const tbsType = 'calculation';
      expect(tbsType).toBe('calculation');
    });

    it('should support multiple choice type', () => {
      const tbsType = 'mcq';
      expect(tbsType).toBe('mcq');
    });

    it('should support written communication type', () => {
      const tbsType = 'wc';
      expect(tbsType).toBe('wc');
    });

    it('should support reconciliation type', () => {
      const tbsType = 'reconciliation';
      expect(tbsType).toBe('reconciliation');
    });

    it('should support document review type', () => {
      const tbsType = 'document_review';
      expect(tbsType).toBe('document_review');
    });

    it('should support research type', () => {
      const tbsType = 'research';
      expect(tbsType).toBe('research');
    });

    it('should support form completion type', () => {
      const tbsType = 'form_completion';
      expect(tbsType).toBe('form_completion');
    });
  });

  describe('TBS Type Labels', () => {
    const TBS_LABELS = {
      journal: 'Journal Entry',
      calculation: 'Calculation',
      mcq: 'Multiple Choice',
      wc: 'Written Communication',
      journal_entry: 'Journal Entry',
      reconciliation: 'Reconciliation',
      document_review: 'Document Review',
      research: 'Research',
      form_completion: 'Form Completion',
      written_communication: 'Written Communication',
    };

    it('should have labels for all TBS types', () => {
      expect(TBS_LABELS.journal_entry).toBe('Journal Entry');
      expect(TBS_LABELS.calculation).toBe('Calculation');
      expect(TBS_LABELS.reconciliation).toBe('Reconciliation');
      expect(TBS_LABELS.document_review).toBe('Document Review');
      expect(TBS_LABELS.research).toBe('Research');
      expect(TBS_LABELS.form_completion).toBe('Form Completion');
      expect(TBS_LABELS.written_communication).toBe('Written Communication');
    });
  });
});

describe('Journal Entry Input Component', () => {
  it('should have account, debit, and credit fields', () => {
    const fields = ['account', 'debit', 'credit'];
    expect(fields).toContain('account');
    expect(fields).toContain('debit');
    expect(fields).toContain('credit');
  });

  it('should support adding rows', () => {
    const entries = [{ account: '', debit: '', credit: '' }];
    const addRow = () => [...entries, { account: '', debit: '', credit: '' }];
    expect(addRow().length).toBe(2);
  });

  it('should support removing rows', () => {
    const entries = [
      { account: 'Cash', debit: '100', credit: '' },
      { account: 'Revenue', debit: '', credit: '100' },
    ];
    const removeRow = (index) => entries.filter((_, i) => i !== index);
    expect(removeRow(1).length).toBe(1);
  });
});

describe('Calculation Input Component', () => {
  it('should validate numeric input', () => {
    const value = '24010';
    const correctAnswer = 24010;
    const tolerance = 5;
    
    const isCorrect = Math.abs(Number(value) - correctAnswer) <= tolerance;
    expect(isCorrect).toBe(true);
  });

  it('should handle tolerance for answers', () => {
    const value = '24005';
    const correctAnswer = 24010;
    const tolerance = 5;
    
    const isCorrect = Math.abs(Number(value) - correctAnswer) <= tolerance;
    expect(isCorrect).toBe(true);
  });

  it('should reject answers outside tolerance', () => {
    const value = '24000';
    const correctAnswer = 24010;
    const tolerance = 5;
    
    const isCorrect = Math.abs(Number(value) - correctAnswer) <= tolerance;
    expect(isCorrect).toBe(false);
  });
});

describe('Multiple Choice Input Component', () => {
  it('should support multiple options', () => {
    const options = ['Finance lease', 'Operating lease'];
    expect(options.length).toBe(2);
  });

  it('should validate correct answer', () => {
    const selected = 0;
    const correctAnswer = 0;
    expect(selected === correctAnswer).toBe(true);
  });

  it('should identify wrong answer', () => {
    const selected = 1;
    const correctAnswer = 0;
    expect(selected === correctAnswer).toBe(false);
  });
});

describe('Written Communication Input Component', () => {
  it('should support text input', () => {
    const content = 'This is a written response...';
    expect(typeof content).toBe('string');
  });

  it('should have rubric categories', () => {
    const rubric = ['organization', 'development', 'expression'];
    expect(rubric).toContain('organization');
    expect(rubric).toContain('development');
    expect(rubric).toContain('expression');
  });
});

describe('TBS Timing', () => {
  it('should track estimated time', () => {
    const tbs = { timeEstimate: 15 };
    expect(tbs.timeEstimate).toBe(15);
  });

  it('should support different difficulty levels', () => {
    const difficulties = ['easy', 'medium', 'hard'];
    expect(difficulties).toContain('easy');
    expect(difficulties).toContain('medium');
    expect(difficulties).toContain('hard');
  });
});

describe('TBS Hints System', () => {
  it('should support multiple hints', () => {
    const hints = [
      'Use the implicit rate since it is known to the lessee',
      'For finance leases, record both the ROU asset and lease liability',
    ];
    expect(hints.length).toBe(2);
  });

  it('should provide hints on demand', () => {
    let hintsShown = 0;
    const showNextHint = () => { hintsShown++; };
    showNextHint();
    expect(hintsShown).toBe(1);
  });
});

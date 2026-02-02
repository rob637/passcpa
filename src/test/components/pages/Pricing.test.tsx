import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock document title hook
vi.mock('../../../hooks/useDocumentTitle', () => ({
  useDocumentTitle: vi.fn(),
}));

import Pricing from '../../../components/pages/Pricing';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Pricing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the pricing page', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should render navigation with logo', () => {
      renderWithRouter(<Pricing />);
      const logos = screen.getAllByAltText('VoraPrep');
      expect(logos.length).toBeGreaterThan(0);
    });

    it('should have links to features and login', () => {
      renderWithRouter(<Pricing />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('beta messaging', () => {
    it('should display beta badge', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText(/BETA.*100% FREE/)).toBeInTheDocument();
    });

    it('should display $0 price', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText('$0')).toBeInTheDocument();
    });

    it('should show "Free During Beta" heading', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText('Free During Beta')).toBeInTheDocument();
    });

    it('should mention no credit card required', () => {
      renderWithRouter(<Pricing />);
      const noCardText = screen.getAllByText(/No credit card/i);
      expect(noCardText.length).toBeGreaterThan(0);
    });
  });

  describe('features display', () => {
    it('should display CPA exam features', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText(/All 6 CPA exam sections/)).toBeInTheDocument();
      expect(screen.getByText(/practice questions/i)).toBeInTheDocument();
    });

    it('should display AI tutor feature', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText(/AI tutor.*Vory/i)).toBeInTheDocument();
    });

    it('should display feature checkmarks', () => {
      renderWithRouter(<Pricing />);
      const checkmarks = document.querySelectorAll('svg');
      expect(checkmarks.length).toBeGreaterThan(0);
    });
  });

  describe('why free section', () => {
    it('should explain why VoraPrep is free', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText(/Why is VoraPrep free/)).toBeInTheDocument();
    });

    it('should mention beta users get to keep access', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText(/beta users keep their access/i)).toBeInTheDocument();
    });
  });

  describe('coming soon exams', () => {
    it('should display coming soon section', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText(/More Exams Coming Soon/)).toBeInTheDocument();
    });

    it('should list CMA exam', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText('CMA')).toBeInTheDocument();
      expect(screen.getByText(/Certified Management Accountant/)).toBeInTheDocument();
    });

    it('should list EA exam', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText('EA')).toBeInTheDocument();
      expect(screen.getByText(/Enrolled Agent/)).toBeInTheDocument();
    });

    it('should list CIA exam', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText('CIA')).toBeInTheDocument();
      expect(screen.getByText(/Certified Internal Auditor/)).toBeInTheDocument();
    });
  });

  describe('FAQ section', () => {
    it('should have FAQ section', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText('Questions?')).toBeInTheDocument();
    });

    it('should answer "Is it really free?"', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText(/Is it really free/)).toBeInTheDocument();
    });

    it('should compare to Becker', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText(/Becker costs/)).toBeInTheDocument();
    });
  });

  describe('contact section', () => {
    it('should display support email', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText('support@voraprep.com')).toBeInTheDocument();
    });
  });

  describe('CTA buttons', () => {
    it('should have Start Free Today button', () => {
      renderWithRouter(<Pricing />);
      expect(screen.getByText('Start Free Today')).toBeInTheDocument();
    });

    it('should link to register page', () => {
      renderWithRouter(<Pricing />);
      const registerLinks = screen.getAllByRole('link', { name: /Start Free/i });
      expect(registerLinks.length).toBeGreaterThan(0);
      expect(registerLinks[0]).toHaveAttribute('href', '/register');
    });
  });
});

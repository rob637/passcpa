import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Privacy from '../../../../components/pages/legal/Privacy';

const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('Privacy Page', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the privacy policy page', () => {
    renderWithRouter(<Privacy />);
    
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('should render last updated date', () => {
    renderWithRouter(<Privacy />);
    
    expect(screen.getByText(/Last updated/i)).toBeInTheDocument();
  });

  it('should render back button', () => {
    renderWithRouter(<Privacy />);
    
    // Has a back button (uses navigate(-1) instead of link)
    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeInTheDocument();
  });

  it('should render main content sections', () => {
    renderWithRouter(<Privacy />);
    
    // Should have various privacy policy sections
    expect(screen.getByText(/Information We Collect/i)).toBeInTheDocument();
  });

  it('should render without crashing', () => {
    const { container } = renderWithRouter(<Privacy />);
    expect(container).toBeInTheDocument();
  });
});

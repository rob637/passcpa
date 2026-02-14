import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Terms from '../../../../components/pages/legal/Terms';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Terms Page', () => {
  it('should render the terms of service page', () => {
    renderWithRouter(<Terms />);
    
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('should render last updated date', () => {
    renderWithRouter(<Terms />);
    
    expect(screen.getByText(/Last updated/i)).toBeInTheDocument();
  });

  it('should render back button', () => {
    renderWithRouter(<Terms />);
    
    // Has a back button (uses navigate(-1) instead of link)
    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeInTheDocument();
  });

  it('should render without crashing', () => {
    const { container } = renderWithRouter(<Terms />);
    expect(container).toBeInTheDocument();
  });
});
